var mongodb = require('mongodb'),
    users,
    db = new mongodb.Db('UserData', new mongodb.Server("127.0.0.1", 27017, {}, {}));

db.open(function (error, client) {
    users = new mongodb.Collection(client, "Users");
    users.remove({});
});
      

exports.insertIntoDB = function (username, information, func) {
    users.insert({name:username, info:information});
    func();
};

exports.getUsers = function (response, func) {
    var userArray = new Array();
    users.find({}).toArray(function(err, docs) {
        
        for (var i=0; i<docs.length; i++) {
            if (userArray.indexOf(docs[i].name)<0) {
                userArray.push(docs[i].name)
            }
        }
        
        func(response, userArray);
    });
};

exports.getInfo = function (user, response, func) {
    var informationArray = [];
    users.find({name:user}).toArray(function(err, docs) {
        
        for (var i=0; i<docs.length; i++) {
            informationArray.push(docs[i].info);
        }
        func(response, user, informationArray);
    });
};
    
