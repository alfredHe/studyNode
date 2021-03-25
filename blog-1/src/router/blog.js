const { SuccessModel, ErrorModel } = require("../model/resModel");
const { getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog');

const handleBlogRouter = (req, res) => {
    const method = req.method;


    //获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list'){
        let author = req.query.author || '';
        let keyword = req.query.keyword || '';
        let dataList = getList(author, keyword);
        console.log(dataList)
        return new SuccessModel(dataList);
    }

    //获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail'){
        let id = req.query.id;
        let dataDetail = getDetail(id);
        return new SuccessModel(dataDetail);
    }


    //新建一篇博客
    if(method === 'POST' && req.path === '/api/blog/new'){
        const data = newBlog(req.body);
        return new SuccessModel(data)
    }

    //更新一篇博客
    if(method === 'POST' && req.path === '/api/blog/update'){

        const result = updateBlog(req.query.id, req.body);
        if(result){
            return new SuccessModel()
        }else{
            return new ErrorModel("更新博客失败")
        }
    }

    //删除一篇博客
    if(method === 'POST' && req.path === '/api/blog/delete'){

        const result = deleteBlog(req.query.id);
        if(result){
            return new SuccessModel()
        }else{
            return new ErrorModel("更新博客失败")
        }
    }
}

module.exports = handleBlogRouter;