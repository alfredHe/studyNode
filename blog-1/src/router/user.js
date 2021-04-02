const {loginCheck} = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];

    //登录
    if(method === 'POST' && req.path === '/api/user/login'){

        const {username, password} = req.body;

        return loginCheck(username, password).then(result => {
            if(result.username){
                return new SuccessModel("登录成功")
            }
            return new ErrorModel("登录失败");
        });
    }
}

module.exports = handleUserRouter;