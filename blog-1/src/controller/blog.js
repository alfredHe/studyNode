const {exec} = require("../db/mysql");


const getList = (author, keyword) => {
    let sql = 'select * from blogs where 1=1 ';
    if(author){
        sql += `and author='${author}' `;
    }
    if(keyword){
        sql += `and title like '%${keyword}%' `;
    }

    sql += `order by createtime desc;`;
    console.log(sql)

    return exec(sql)
}

const getDetail = (id) => {
    let sql = `select * from blogs where id=${id};`;
    console.log(sql)
    return exec(sql).then(rows => {
        return rows[0];
    })
}

const newBlog = (blogData = {}) => {
    //blogData 是一个博客对象， 包含 title content 属性
    const {title, content, author} = blogData;
    const createTime = Date.now();
    
    let sql = `insert into blogs(title, content, createtime, author) values ('${title}', '${content}', ${createTime}, '${author}');`

    console.log(sql);

    return exec(sql).then(insertData => {
        console.log(insertData)
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    const {title, content} = blogData;
    let sql = `update blogs set title='${title}', content='${content}' where id=${id};`
    return exec(sql).then(updateData => {
        console.log(updateData)
        if(updateData.affectedRows > 0){
            return true
        }
        return false
    })
    // return false
}

const deleteBlog = (id, author) => {
    let sql = `delete from blogs where id=${id}`;
    return exec(sql).then(deleteData => {
        if(deleteData.affectedRows > 0){
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}