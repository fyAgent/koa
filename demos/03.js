const https = require("https");
const request = require("request")

const options = {
    host: "jgcv2.hbytapp.com",
    path: "/apiv2/index/index",
    method:"POST",
    protocol:"https:"
}
const req = https.request(options,res=>{
    var str=""
    res.on("data",d=>{
        process.stdout.write(d);
        str+=d
    })
    res.on("end",e=>{
        console.log(e)
        console.log(JSON.parse(str))
    })

})
req.end();