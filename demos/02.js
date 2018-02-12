const path = require("path");
const url = require("url");
const fs = require("fs");
const {

    URL
} = require("url");
const qs = require('querystring');
const Koa = require("koa");
const App = new Koa();
const route = require("koa-route");
const compose = require("koa-compose");
const static = require("koa-static");
const koaBody = require("koa-body");
const server = static(path.join(__dirname, "www"), {
    defer: true
});

const logger = (ctx, next) => {
    if (ctx.request.url.slice(0, 6) == "/index") {
        ctx.response.type = 'html';
         ctx.response.body = fs.createReadStream('./www/index.html');
    }
    next();
}
const mes = (ctx, next) => {
    console.log("get");

    // const search = url.parse(ctx.request.url).search.slice(1);
    const query = url.parse(ctx.request.url, true).query;
    const message = ctx.request;
    console.log(message)
    // console.log(query);
    ctx.body = {
        request: ctx.request,
        query
    };

    next();
}
const post = (ctx, next) => {
    console.log(1111)
    const body = ctx.request.body;
    ctx.body =
        next();
}
const writeFile = async (ctx, next) => {

    const body = ctx.request.body;
    const filename = path.join(__dirname, "www/txt", body.name);
    const content = body.content;
    await fs.writeFileSync(filename, content);
    ctx.body = {
        mes: "success",
        status: 200
    }
}
const jsonP = async (ctx, next) => {
    var params = url.parse(ctx.request.url, true);
    console.log(params.query);

    if (params.query && params.query.callback) {
        var data = {
            mes: "success",
            status: 200,
            res: [params.query.name, params.query.content]
        }
        var str = `${params.query.callback}(${JSON.stringify(data)})`; //jsonp  
    }
    ctx.body = str
}
const middle = compose([
     server
]);
App.use(middle);
App.listen(8090,"192.168.11.100");