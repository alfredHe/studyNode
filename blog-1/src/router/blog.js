const { SuccessModel, ErrorModel } = require("../model/resModel");
const { getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog');

const handleBlogRouter = (req, res) => {
    const method = req.method;


    //获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list'){
        let author = req.query.author || '';
        let keyword = req.query.keyword || '';
        return getList(author, keyword).then(listData => {
            return new SuccessModel(listData);
        })
    }

    //获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail'){
        let id = req.query.id;
        // let dataDetail = getDetail(id);
        // return new SuccessModel(dataDetail);
        return getDetail(id).then(dataDetail => {
            return new SuccessModel(dataDetail);
        })
    }


    //新建一篇博客
    if(method === 'POST' && req.path === '/api/blog/new'){
        return newBlog(req.body).then(result => {
            return new SuccessModel(result) 
        })
    }

    //更新一篇博客
    if(method === 'POST' && req.path === '/api/blog/update'){

        return updateBlog(req.query.id, req.body).then(result => {
            if(result){
                return new SuccessModel()
            }else{
                return new ErrorModel("更新博客失败")
            }
        });
    }

    //删除一篇博客
    if(method === 'POST' && req.path === '/api/blog/delete'){
        let author = 'wangwu';
        return deleteBlog(req.query.id).then(result => {
            if(result){
                return new SuccessModel()
            }else{
                return new ErrorModel("删除博客失败")
            }
        });
    }
}

module.exports = handleBlogRouter;