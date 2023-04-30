


const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
})
app.post("/", function(req,res){
   

    const query = req.body.cityName;
    const apiKey =  "a4b1b040cf574d0498cf921e8468d8d1";
    const unit = "metric";



    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            
            const weatherDescription = weatherData.weather[0].description;
            const temps = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";




            res.write("<p>The weather is currently " + weatherDescription + " </p>");
            res.write("<h1>The temperature in "+query+" is " + temps + "</p>");
            res.write("<img src = " + imgURL + ">")
            res.send();

        })
    })
})







app.listen(5000, function () {
    console.log("server is running on port 5000");
})


// https://koyalmohadikar.github.io/rohini-project/
// https://koyalmohadikar.github.io/kit_01/

// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin git@github.com:Rohini1101/weather-project.git
// git push -u origin main