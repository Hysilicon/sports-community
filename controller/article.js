const {exec, escape} = require('../database/mysql');

const createArticle = (author, title, content, createtime) => {
    author = escape(author);
    title = escape(title);
    content = escape(content);
    createtime = escape(createtime);


    const insertArticle = `
        insert into article(author, title, content, createtime) values (${author}, ${title}, ${content}, ${createtime})`
    return exec(insertArticle).then(rows => {
        return rows || {};
    });
}

const getnewestArticle = () => {

    //const selectAllArticle = "select author, title, content FROM article"
    const sort = `select * from article order by id DESC`

    return exec(sort).then(rows => {
        var i = 0;
        var data = new Array();
        for (i = 0; i < 5; i++) {
            if (i <= rows.length) {
                data[i] = rows[i];
            }
        }
        return data;
    });
}


const getOwnArticle = (author) => {

    author = escape(author);
    const selectOwn = `
    select * FROM article where author= ${author}`
    console.log(author);
    return exec(selectOwn).then(rows => {
        return rows || {};
    });

}

const deleteArticle = (id, author) => {
    id = escape(id);
    author = escape(author);

    const prequery = `
    SELECT * FROM article WHERE id= ${id} AND author= ${author}`
    return exec(prequery).then(rows => {

        const info = rows[0] || {};

        if (info.author) {
            const deleteSelectArticle = `
            DELETE FROM article WHERE id= ${id} AND author= ${author}`
            return exec(deleteSelectArticle).then(row => {
                return row[0] || {};

            });
        } else {
            //console.log(info.author);
            //console.log(author);
            // input wrong article id or article do not belong to the user
            return {
                error: 'wrong article id'
            }
        }
    })
}


const praiseArticle = (id) => {
    id = escape(id);

    const prequery = `
    SELECT praise FROM article WHERE id= ${id}`
    return exec(prequery).then(rows => {
        const info = rows[0] || {};
        const praise = info.praise + 1;
        const plusPraise = `
        UPDATE article SET praise= ${praise} WHERE id= ${id}`
        return exec(plusPraise).then(rows => {
            return rows[0] || {};
        })
    })
}


const getArticle = (id) => {

    const selectArticleById = `
    select * FROM article where id = '${id}'`
    return exec(selectArticleById).then(rows => {
        return rows[0] || {};
    });

}
module.exports = {
    createArticle,
    getnewestArticle,
    getArticle,
    getOwnArticle,
    deleteArticle,
    praiseArticle
}