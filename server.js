
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var methodOverride = require('method-override')

var databaseConfig = require('./config/database');
var router = require('./app/models/routes');
var bin = require("./app/models/bin")
var User = require("./app/models/user")
var router1 = express.Router();

mongoose.connect(databaseConfig.url);



app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); //Log requests to API using morgan
app.use(methodOverride());
app.use(cors());

router(app);

//bob added this code
router1.get('/heybob', (req, res, next) => {
    res.send('testing bob s')
});

router1.get("/", function (req, res) {
    //res.json({ "error": false, "message": "Fuck you!" })
    User.find({}, (err, data) => {
        if (err) {
            return next(err)
        }
        else {
            res.json(data)
        }
    })
})

//Find all users from database
// app.get("/allUsers",(req,res,next)=>{
//     res.json({ "error": false, "message": "Fuck you!" })

//     })
app.use('/', router1)


router1.route('/bins')
    .get(function (req, res) {
        var response = {};
        bin.find({}, function (err, data) {
            if (err) {
                response = { "error": true, "message": "error fetching data" }
            } else {
                response = data
            }
            res.json(response);
        })
    })

    .post(function (req, res) {
        var db = new bin();
        var response = {};

        db.binId = req.body.binId;
        db.zoneId = req.body.zoneId;
        db.latitude = req.body.latitude;
        db.longitude = req.body.longitude;

        db.save(function (err) {

            if (err) {
                response = { "error": true, "message": "Error fetching the data" }
            } else {
                response = { "error": false, "message": "Data added" }
            }

            res.json(response)
        })
    })



app.listen(process.env.PORT || 30001);
console.log("App listening on port 30001");
