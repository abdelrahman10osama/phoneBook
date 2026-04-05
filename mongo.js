const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

if (!password) {
  console.log("please provide password");
  process.exit(1);
}
const url = `mongodb+srv://a10osama:${password}@cluster0.xl5ojw3.mongodb.net/phonebookApp?retryWrites=true&w=majority`;
// connect
mongoose.set("strictQuery", false);
mongoose.connect(url);

// schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);


if (!name) {
  Person.find({}).then((persons) => {
    console.log("phonebook:");

    persons.forEach((p) => {
      console.log(`${p.name} ${p.number}`);
    });

    mongoose.connection.close();
  });
}


else {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);

    mongoose.connection.close();
  });
}