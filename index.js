/**
 * Created by sundeepnarang on 6/20/17.
 */

const fs = require("fs");

module.exports = function (stream,filePath,options,done) {
    let opts = {};
    let errored = false;
    let doneCalled = false;
    let asyncErr = null;
    if(typeof options === "function"){
        done = options;
    } else{
        if (typeof options === "object") {
            opts = {...opts, ...options}
        }
    }

    const wStream = fs.createWriteStream(filePath,opts);
    stream.on('error',function(err){
        if(!err){
            err = new Error("Stream Error");
        }
        errored = true;
        doneCalled = true;
        asyncErr = err;
        console.log("Error reading stream : ", err);
        return done(err);
    });

    wStream.on('error',function(err){
        if(!err){
            err = new Error("Stream Error");
        }
        errored = true;
        doneCalled = true;
        asyncErr = err;
        console.log("Error writing stream : ", err);
        return done(err);
    });

    wStream.on('close',function () {
        if(errored){
            if (!doneCalled) {
                return done(asyncErr)
            }
            return;
        }
        done(null,filePath)
    });

    stream.pipe(wStream);
};

module.exports.asyncStream2File = function (stream,filePath,options) {
    return new Promise(async (resolve, reject) => {
        let opts = {};
        let errored = false;
        let resolved = false;
        let asyncErr = null;
        if (typeof options === "object") {
            opts = {...opts, ...options}
        }

        const wStream = fs.createWriteStream(filePath, opts);
        stream.on('error', function (err) {
            if (!err) {
                err = new Error("Stream Error");
            }
            errored = true;
            resolved = true;
            asyncErr = err;
            console.log("Error reading stream : ", err);
            return reject(err);
        });

        wStream.on('error', function (err) {
            if (!err) {
                err = new Error("Stream Error");
            }
            errored = true;
            resolved = true;
            asyncErr = err;
            console.log("Error writing stream : ", err);
            return reject(err);
        });

        wStream.on('close', function () {
            if (errored) {
                if (!resolved) {
                    return reject(asyncErr)
                }
                return;
            }
            resolve(null, filePath)
        });

        stream.pipe(wStream);
    })
};
