const getList = (author, keyword) => {
    return [
        {
            id:1,
            title: '博客A',
            content: '内容A',
            createTime: 1616572496753,
            author: 'zhangsan'
        },
        {
            id:2,
            title: '博客B',
            content: '内容B',
            createTime: 1616572545781,
            author: 'lisi'
        }
    ]
}

const getDetail = (id) => {
    return   {
        id:1,
        title: '博客A',
        content: '内容A',
        createTime: 1616572496753,
        author: 'zhangsan'
    }
}

const newBlog = (blogData = {}) => {
    //blogData 是一个博客对象， 包含 title content 属性
    return{
        id :3
    }
}

const updateBlog = (id, blogData = {}) => {
    return false
}

const deleteBlog = (id) => {
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}