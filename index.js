// Configuração inicial
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const Person = require("./models/Person");

// Middleware para parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Primeira rota
app.get('/', (req, res) => {
    res.json({ message: "RODOU haha" });
});

// Create
app.post("/person", async (req, res) => {
    const { name, salary, approved } = req.body;

    const person = {
        name,
        salary,
        approved,
    };

    try {
        await Person.create(person);
        res.status(201).json({ message: "Pessoa inserida no site com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read
app.get("/person", async (req, res) => {
    try {
        const people = await Person.find();
        res.status(200).json(people);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update
app.put("/person/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedPerson = await Person.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedPerson) {
            return res.status(404).json({ message: "Pessoa não encontrada" });
        }
        res.status(200).json(updatedPerson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete
app.delete("/person/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPerson = await Person.findByIdAndDelete(id);
        if (!deletedPerson) {
            return res.status(404).json({ message: "Pessoa não encontrada" });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Conexão com MongoDB
mongoose.connect("mongodb://localhost:27017").then(() => {
    console.log("Uhhuul, conectamos!");
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000");
    });
}).catch((err) => {
    console.log(err);
});
