/**
 * Created by sundeepnarang on 6/20/17.
 */

var fs = require("fs");
var _  = require("lodash");

module.exports = function (stream,filePath,options,done) {
    var opts = {};
    if(typeof options === "function"){
        done = options;
    } else{
        if(typeof options === "object") {
            opts = _.extend(opts, options)
        }
    }

    var wStream = fs.createWriteStream(filePath,opts);
    stream.on('error',function(err){
        console.log("Error reading stream : ", err);
        return done(err);
    });

    wStream.on('error',function(err){
        console.log("Error writing stream : ", err);
        return done(err);
    });

    wStream.on('close',function () {
        done(null,filePath)
    });

    stream.pipe(wStream);
};