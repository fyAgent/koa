
const os = require('os');
const path = require('path');
const Koa = require('koa');
const fs = require('fs');
const koaBody = require('koa-body');
const serve =require('koa-static');
const route = require("koa-route");
const app = new Koa();

const home = serve(path.join(__dirname));
const mes=ctx=>{
    ctx.response.body={
        status:200,
        data:{
            mes:ctx.request
        }
    }
}
const main = async function (ctx) {//上传文件
    const tmpdir =path.resolve(__dirname,"./image");
    const filePaths = [];
    const files = ctx.request.body.files || {};
    //  console.log(ctx.request.body.files);
    for (let key in files) {
        const file = files[key];  
        const filePath = path.join(tmpdir, file.name);
        const reader = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(filePath);
        reader.pipe(writer);
        filePaths.push(filePath);
    }
    ctx.response.body = filePaths;
};
app.use(home);
app.use(koaBody({ multipart: true }));
app.use(route.post("/fileupload", main));
app.listen({
    port: 3000,
    hostname:""
});





