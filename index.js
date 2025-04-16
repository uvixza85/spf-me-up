import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express()
const port = 3000


app.get('/', async (req, res) => {
    res.send("HEllo world");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})