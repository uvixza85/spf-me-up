import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express()
const port = 3000

const config = {
  headers: { "x-access-token":"openuv-3lxjgmrm9jzlt9i-io" },
};

app.get('/', async (req, res) => {
    try{
    const result = await axios.get("https://api.openuv.io/api/v1/uv?lat=13.13&lng=77.59&alt=100", config);
    res.render("index.ejs", { uvindex: result.data.result.uv });
    console.log(result.data.result.uv);
  } catch (error) {
    console.log(error);
    res.status(500)
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})