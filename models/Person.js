const mongoose = require("mongoose");

const Person = mongoose.model("Person", {
    name: String,
    salary: Number,
    approved: Boolean // Add a comma here
});

module.exports = Person;
