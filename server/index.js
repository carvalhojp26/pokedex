const express = require("express")
const axios = require("axios")

const app = express()
const PORT = 3000

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
        res.send(response.data)
    } catch (error) {
        res.status(500).send("error fetching data", error)
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})