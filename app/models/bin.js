var mongoose = require('mongoose');

var databaseConfig = require('../../config/database');
var databaseConfig = require('../models/zone');

mongoose.connect(databaseConfig.url);


var databaseConfig = require('../../config/database')

mongoose.connect(databaseConfig.url)
var mongoSchema = mongoose.Schema;
var binSchema = {
    "binId":String,
    "zoneId":String,
    "longitude":String, //same here
    "latitude":String , //latitudes may have (-) eg. -1.2588, Numbers will only accept positive numbers, with no negatives
    //admin assigns bin to a zone"
    "zoneAssigned": {type:Boolean, default:false},
    "binLevel": String


}

module.exports = mongoose.model('bin',binSchema)