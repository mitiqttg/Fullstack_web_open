const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name must have at least 3 characters, got "{VALUE}"'],
    required: [true, 'Name is required']
  },
  number: {
    type: String,
    minlength: [9, 'Number must have at least 8 numbers'],
    validate: {
      validator: function(v) {
        const firstPart = v.split('-')[0]
        const secondPart = v.split('-')[1]
        return (firstPart.length===2 || firstPart.length===3) && (!Number.isNaN(Number(firstPart))) && (!Number.isNaN(Number(secondPart))) && (v.match(new RegExp('-', 'g')) || []).length === 1
      },
      message: props => `${props.value} is not a valid phone number, it must be in the form (xx[x]-xx...x) and has at least 8 numbers`
    },
    required: [true, 'Number is required']
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)