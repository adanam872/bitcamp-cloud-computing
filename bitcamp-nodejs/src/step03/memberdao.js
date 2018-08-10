// 주제 : DAO 분리

var pool

exports.setConnectionPool = function(connectionPool) {
    pool = connectionPool;
};

exports.list = function(pageNo=1, pageSize=3, handler) {
    var startIndex = (pageNo-1)*pageSize;
    pool.query('select mid, email from pms2_member limit ?, ?', [startIndex, pageSize], function(err, results) {
        handler(err, results);
    });
};

exports.add = (data, handler) => {
    pool.query('insert into pms2_member(email,mid,pwd) values(?, ?, password(?))', [data.email, data.mid, data.pwd], function(err, result) {
        handler(err, result);
    });
};

exports.update = (data, handler) => {
    pool.query('update pms2_member set email = ? where mid=?', [data.email, data.mid], function(err, result) {
        handler(err, result);
    });
};

exports.remove = (data, handler) => {
    pool.query('delete from pms2_member where mid=?', [data.mid], function(err, result) {
        handler(err, result);
    });    
};