# stream2file

## usage


    const stream2file = require("stream2file");

    stream2file(fileStream, filePath, (err) => {
        if (err) {
            console.log("Error Saving Stream to File : ", err);
        }
    });


## async usage

    const {asynstream2file} = require("stream2file");
    
    try{
        await asyncStream2File(fileStream, filePath);
    } catch(e) {
        console.log("Error Saving Stream to File : ", err);
    }