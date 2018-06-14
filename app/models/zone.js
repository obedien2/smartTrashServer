let mongoose = require('mongoose');
var databaseConfig = require('../../config/database')

mongoose.connect(databaseConfig.url)
let schema = mongoose.Schema;

let zone = {
    "binId":[],
   // "zoneId":{type:mongoose.Types.ObjectId, ref:'zone'},
    "longitude":String, //same here
    "latitude":String , //latitudes may have (-) eg. -1.2588, Numbers will only accept positive numbers, with no negatives
    
   


}

module.exports = mongoose.model('Zone',zone);