const express = require("express");
const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv").config();

const app = express();

if (!process.env.VITE_BACKEND_URL) {
    console.error("VITE_BACKEND_URL is not set in .env file");
    process.exit(1);
}

app.use(express.static(path.join(__dirname, '../dist')));


app.get("/ping", (req, res) => {
    try {
        res.status(200).json({
            message: "ok from fontEnd!"
        });
    } catch (error) {
        console.error("Err when ping:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('*', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../dist', 'index.html'));
    } catch (error) {
        console.error("Error serving index.html:", error);
        res.status(500).send("Internal Server Error");
    }
});

setInterval(async () => {
    try {
        const response = await axios.get(process.env.VITE_BACKEND_URL + "/ping");
        console.log("backend response:", response.data);
    } catch (error) {
        console.error("Error fetching from backend:", error.message);
    }
}, Math.floor(Math.random() * 500000) + 100000);

app.listen(8080, () => {
    console.log("Server is running at http://localhost:8080");
});
