import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import 'dotenv/config';

const app = express();
const port = 3000;

app.use(express.static('public'));

const config = {
  headers: { "x-access-token": process.env.OPEN_UV_ACCESS_TOKEN },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.render("home.ejs");
});

app.get('/cordi', async (req, res) => {
  res.render("index.ejs");
});

app.get('/auto', async (req, res) => {
  try {
    const responseLocation = await axios.get("https://api.ip2location.io/");
    const latitude = responseLocation.data.latitude;
    const longitude = responseLocation.data.longitude;
    const responseUvIndex = await axios.get(`https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}&alt=100`, config);
    const uvindex = responseUvIndex.data.result.uv;
    res.render("index.ejs", { uvindex: uvindex });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.post("/submit", async (req, res) => {
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  try {
    const responseUvIndex = await axios.get(`https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}&alt=100`, config);
    const uvindex = responseUvIndex.data.result.uv;
    res.render("index.ejs", { uvindex: uvindex });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});