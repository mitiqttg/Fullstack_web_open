import 'dotenv/config'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { GraphQLError } from 'graphql'
import express from 'express'
import http from 'http'
import cors from 'cors'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/use/ws'

import { typeDefs } from './schema.js'
import resolvers from './resolvers.js'
import User from './models/user.js'

const JWT_SECRET = process.env.JWT_SECRET
const MONGODB_URI = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error.message))

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      }
    ],
  })

  await server.start()

  app.use(
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req.headers.authorization
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
          const token = auth.substring(7)
          try {
            const decodedToken = jwt.verify(token, JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
          } catch (error) {
            throw new GraphQLError('Invalid token', {
              extensions: { code: 'UNAUTHENTICATED' }
            })
          }
        }
        return {}
      }
    })
  )

  httpServer.listen({ port: 4000 }, () => {
    console.log('Server is running on http://localhost:4000')
  })
}

start()
