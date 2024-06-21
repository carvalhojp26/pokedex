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
    frontImage:String,
    type:String
}, {collection: 'favorites'})

const Pokemon = mongoose.model('pokemon', pokemonSchema)

app.post("/addFavorite", async (req, res) => {
    const newPokemon = new Pokemon(req.body);

    try {
        const savedPokemon = await newPokemon.save();
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

app.get("/favorites", async (req, res) => {
    try{
        const allFavorites = await Pokemon.find()
        res.status(200).json(allFavorites)
    } catch (error) {
        res.status(500).json({message: "error retrieving favorites: ", error})
    }
})

app.listen(PORT, () => {    
    console.log(`Server listening on port: ${PORT}`)
})