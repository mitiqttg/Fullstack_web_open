import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'
import Author from './models/author.js'
import Book from './models/book.js'
import User from './models/user.js'
import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()
const JWT_SECRET = process.env.JWT_SECRET

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
        const filter = {}
        if (args.author) {
            const author = await Author.findOne({ name: args.author })
            if (!author) return []
            filter.author = author._id
        }
        if (args.genre) {
            filter.genres = { $in: [args.genre] }
        }
        return Book.find(filter).populate('author')
        },
        allAuthors: async () => await Author.find({}),
        me: (root, args, context) => context.currentUser,
    },

    Author: {
        bookCount: async (root) => Book.countDocuments({ author: root._id }),
    },

    Mutation: {
        createUser: async (root, args) => {
        const user = new User({ ...args })
        try {
            return await user.save()
        } catch (error) {
            throw new GraphQLError('User creation failed', {
            extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error: error.message,
            },
            })
        }
        },

        login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
        if (!user || !(args.password === 'secret')) {
            throw new GraphQLError('Invalid credentials', {
            extensions: { code: 'BAD_USER_INPUT' },
            })
        }
        const userForToken = {
            username: user.username,
            id: user._id,
        }
        return { value: jwt.sign(userForToken, JWT_SECRET, { expiresIn: '15m' }) }
        },

        addBook: async (root, args, context) => {
        if (!context.currentUser) {
            throw new GraphQLError('Authentication required', {
            extensions: { code: 'UNAUTHENTICATED' },
            })
        }

        let author = await Author.findOne({ name: args.author })
        if (!author) {
            author = new Author({ name: args.author })
            try {
            await author.save()
            } catch (error) {
            throw new GraphQLError('Author creation failed', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.author,
                    error: error.message,
                },
            })
            }
        }

        const book = new Book({ ...args, author: author._id })
        try {
            await book.save()
        } catch (error) {
            throw new GraphQLError('Book creation failed', {
            extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.title,
                error: error.message,
            },
            })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: await book.populate('author') })

        return book.populate('author')
        },

        editAuthor: async (root, args, context) => {
        if (!context.currentUser) {
            throw new GraphQLError('Authentication required', {
                extensions: { code: 'UNAUTHENTICATED' },
            })
        }
        const author = await Author.findOne({ name: args.name })
        if (!author) return null
        author.born = args.setBornTo
        try {
            await author.save()
        } catch (error) {
            throw new GraphQLError('Author update failed', {
            extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error: error.message,
            },
            })
        }
        return author
        },
    },

    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },
}

export default resolvers
