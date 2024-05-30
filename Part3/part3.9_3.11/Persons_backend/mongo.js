const mongoose = require('mongoose')

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack3:${password}@cluster0.k6ilt7k.mongodb.net/personApp?retryWrites=true&w=majority`
  // `mongodb+srv://fullstack3:<password>@cluster0.k6ilt7k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length==3) {
  Person.find({}).then(result => {
    console.log("Phonebook:")
    result ? (result.forEach(persons => {
      console.log(`${persons.name} ${persons.number}`)
    })) : console.log("Empty database")
    // Tenary not working
    mongoose.connection.close()
  })
} else if (process.argv.length==4) {
  console.log('Missing info of person')
  process.exit(1)
} else if (process.argv.length==5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(result => {
    console.log(`Added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}