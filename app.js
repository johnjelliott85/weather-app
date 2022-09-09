const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, res) {

    const query = req.body.zip;
    const apiKey = "c5522e0c9ddf27794b8166a80081ee73";
    const url = "https://api.openweathermap.org/data/2.5/weather?zip=" + query + ",US&appid=" + apiKey + " ";

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {


            const wheatherData = JSON.parse(data);
            const temp = wheatherData.main.temp;
            const description = wheatherData.weather[0].description;
            const icon = wheatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1>The wheather is currently, " + description + ".</h1>")
            res.write("<h1>The temperature is " + temp + " degrees.</h1>");
            res.write("<img src=" + imageURL + ">")
            res.send()

        });
    });


});



app.listen(3000, function () {
    console.log("Server is running onport 3000");
});