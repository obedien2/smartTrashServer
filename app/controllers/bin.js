var Bin = require('../models/bin');

exports.getBins = function(req,res,next){

    Bin.find(function (err, bins){

        if(err){
            res.send(err)
        }
        res.json(bins)
    })
}

exports.createBin = function(req, res, next){
    
    Bin.create({
        binId : req.body.binId,
        zoneId: req.body.zoneId,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        binLevel: req.body.binLevel
});
}

//admin assigns bin to a zone
