require("dotenv").config();
const express = require("express")
const mysql = require("mysql2")
const http = require("http");
const session = require('express-session');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
var path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'style')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'html')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
con.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});


app.get("/api/cities", (req, res) => {
    con.query("SELECT * FROM Cities", (err, result, fields) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }
        return res.status(200).send(result);
    });
});


app.get("/api/budget", (req, res) => {
    con.query("SELECT * FROM Budget", (err, result, fields) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }
        return res.status(200).send(result);
    });

});
app.get("/api/continent", (req, res) => {
    con.query("SELECT * FROM Continent", (err, result, fields) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }
        return res.status(200).send(result);
    });

});
app.get("/api/season", (req, res) => {
    con.query("SELECT * FROM Season", (err, result, fields) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }
        return res.status(200).send(result);
    });
});

app.get("/api/vacationtype", (req, res) => {
    con.query("SELECT * FROM Vtype", (err, result, fields) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }
        return res.status(200).send(result);
    });
});

app.get("/api/cities/continent/:continent", (req, res) => {
    con.query(`SELECT * FROM cities WHERE continent = ${con.escape(req.params.continent)}`, (err, result, fields) => {
        if (err) return err;
        return res.status(200).send(result)
    })
})

app.post("/search", async function (req, res) {
    let continent = req.body.continent;
    let budget = req.body.budget;
    let vytpe = req.body.type;
    let season = req.body.season;
    let visaReq = req.body.visa;

    let url = `http://localhost:3000/api/cities/continent/${continent}`;

    http.get(url, function (response) {
        var responseData = "";

        response.on("data", function (dataChunk) {
            responseData += dataChunk;
        });

        response.on("end", function () {
            var citiesByContinent = JSON.parse(responseData);


            let citiesFiltered = citiesByContinent.filter(city => {
                return (!budget || city.budget_id == budget) &&
                    (!vytpe || city.type_id == vytpe) &&
                    (!season || city.season_id == season) &&
                    (!visaReq || city.visa_required == visaReq);
            });


            var cities = citiesFiltered.map(city => city.city_name);

            res.render('result', { cities: cities });
            console.log(cities);

            res.send();
            return res.status(200);
        });
    });
});

app.use(session({
    secret: 'secret key',
    resave: true,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});