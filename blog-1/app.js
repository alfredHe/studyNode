const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const querystring = require('querystring');

const getPostData = (req) => {
    const promise = new Promise((reslove, reject) => {
        if(req.method !== "POST"){
            reslove({});
            return
        }

        if(req.headers['content-type'] !== 'application/json'){
            reslove({});
            return
        }

        let postData = '';

        req.on('data', chunk => {
            postData += chunk;
        })

        req.on('end', () => {
            if(!postData){
                reslove({});
                return
            }
            reslove(JSON.parse(postData))
        })
    })

    return promise
}

const serverHandle = (req, res) => {
    //设置返回格式 JSon
    res.setHeader('Content-type', 'application/json');

    const url = req.url;
    req.path = url.split('?')[0];
    req.query = querystring.parse(url.split('?')[1]);
    console.log(req.url)

    getPostData(req).then((postData) => {
        req.body = postData;

        //处理blog路由
        const blogResult = handleBlogRouter(req, res);
        if(blogResult){
            blogResult.then(blogData => {
                if(blogData){
                    res.end(JSON.stringify(blogData));
                }
            })
            return
        }


        //处理user路由
        const userResult = handleUserRouter(req, res);
        if(userResult){
            userResult.then(userData => {
                res.end(JSON.stringify(userData));
            })
            return
        }

        //未命中路由，返回 404
        res.writeHead(404, {"Content-type": "text/plain"});
        res.write("404 Not Found\n");
        res.end();
    })
}

module.exports = serverHandle;