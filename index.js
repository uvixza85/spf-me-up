import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import 'dotenv/config'

const app = express()
const port = 3000

app.use(express.static('public'));

const config = {
  headers: { "x-access-token": process.env.OPEN_UV_ACCESS_TOKEN},
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.render("home.ejs");
})

app.get('/cordi', async (req, res) => {
    res.render("index.ejs");
})

app.get('/home', async (req, res) => {
    res.render("home.ejs");
})

app.get('/auto', async (req, res) => {
    try {
      const result1 = await axios.get("https://api.ip2location.io/");
      const Lati=result1.data.latitude ;
      const Longi  =result1.data.longitude ;
      //console.log(Lati);
      const result = await axios.get(`https://api.openuv.io/api/v1/uv?lat=${Lati}&lng=${Longi}&alt=100`, config);
      const uvindex = result.data.result.uv ;
      //console.log(uvindex);
      res.render("index.ejs", { uvindex: uvindex });
    } catch (error) {
      console.log(error);
      res.status(500)
    }
})

app.post("/submit", async (req, res) => {
    const Lati = req.body.Lati;
    const Longi = req.body.Longi;
    try{
    const result = await axios.get(`https://api.openuv.io/api/v1/uv?lat=${Lati}&lng=${Longi}&alt=100`, config);
    const uvindex = result.data.result.uv ;
    res.render("index.ejs", { uvindex: uvindex });
  } catch (error) {
    console.log(error);
    res.status(500)
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})