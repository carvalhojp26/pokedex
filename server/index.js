    const express = require("express")
    const mongoose = require("mongoose")
    const cors = require("cors")
    const bodyParser = require("body-parser");

    const app = express()
    const PORT = 3001

    async function connectToMongoDB() {
        try {
            await mongoose.connect('mongodb://localhost:27017/pokedex', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('MongoDB connected');
        } catch (error) {
            console.error('Failed to connect to MongoDB', error);
        }
    }
    connectToMongoDB();

    app.use(cors())
    app.use(bodyParser.json())  

    const pokemonSchema = new mongoose.Schema({
        id:Number,
        name:String,
        height:Number,
        weight:Number,
        frontImage:String,
        backImage:String
    }, {collection: 'favorites'})

    const Pokemon = mongoose.model('pokemon', pokemonSchema)

    app.post("/addFavorite", async (req, res) => {
        console.log("Received data:", req.body);  // Log do corpo da requisição
        const newPokemon = new Pokemon(req.body);
        console.log("Pokemon to save:", newPokemon)
        try {
            const savedPokemon = await newPokemon.save();
            console.log("Pokemon saved:", savedPokemon);  // Log dos dados salvos
            res.status(201).json(savedPokemon);
        } catch (error) {
            console.error("Error saving pokemon:", error);
            res.status(400).json({ message: "Error adding to favorite", error: error.toString() });
        }
    });
    

    app.delete("/removeFavorite/:id", async (req, res) => {
        try {
            const result = await Pokemon.findOneAndDelete({id: req.params.id})
            if (result) {
                res.status(200).json({ message: "Removed from favorites succesfully"})
            } else {
                res.status(404).json({message: "Pokemon Not Found"})
            }
        } catch (error) {
            res.status(500).json({message: "Error removing from favorites", error:error.toString() })
        }   
    })

    app.get("/favorites/:id", async (req, res) => {
        const id = parseInt(req.params.id);    
        
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
    
        try {
            const pokemon = await Pokemon.findOne({ id: id });
            if (pokemon) {
                res.status(200).json({ isFavorite: true, pokemon });
            } else {
                res.status(404).json({ error: "Pokemon Not Found" });
            }
        } catch (error) {
            console.error("Error checking favorite status:", error);
            res.status(500).json({ message: "Error checking favorite status", error: error.toString() });
        }
    });
    
    app.listen(PORT, () => {    
        console.log(`Server listening on port: ${PORT}`)
    })