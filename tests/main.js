const assert = require('assert');
const should = require('should');
const stream2file = require("../index");
const {asyncStream2File} = require("../index");
const fs = require("fs");
const path = require("path");

describe('file', function() {
    let stream = null;
    let inFile = path.join(__dirname,"test.txt")
    let outFile = path.join(__dirname,"out.txt")

    before(function(done) {
        //create temp files to upload
        try {
            stream = fs.createReadStream(inFile);
        }catch (e){
            return done(e)
        }
        done()
        // runs before all tests in this block
    });

    describe('#writeFile()', function() {
        it('should write file without error', function(done) {
            this.timeout(10000);
            stream2file(stream, outFile,(err)=>{
                if(err){
                    return done(err)
                }
                console.log("Written Out File")
                const text = fs.readFileSync(outFile,{encoding: "utf-8"})
                console.log("Out File Text: ", text)
                text.should.eql("test file")
                done(null)
            })
        });
    });

    after(function (done){
        fs.unlinkSync(outFile)
        done()
    })
});

describe('fileAsync', function() {
    let stream = null;
    let inFile = path.join(__dirname,"test.txt")
    let outFile = path.join(__dirname,"out.txt")

    before(function(done) {
        //create temp files to upload
        try {
            stream = fs.createReadStream(inFile);
        }catch (e){
            return done(e)
        }
        done()
        // runs before all tests in this block
    });

    describe('#writeFile()', function() {
        it('should write file without error', async function() {
            this.timeout(10000);
            try{
                await asyncStream2File(stream, outFile)
                console.log("Written Out File")
                const text = fs.readFileSync(outFile,{encoding: "utf-8"})
                console.log("Out File Text: ", text)
                text.should.eql("test file")
            }  catch (e){
                throw e
            }
        });
    });

    after(function (done){
        fs.unlinkSync(outFile)
        done()
    })
});