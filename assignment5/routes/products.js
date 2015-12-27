var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('productsdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'productsdb' database");
        db.collection('products', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The products collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});



exports.findAll = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    db.collection('products', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addProduct = function(req, res) {
    var product = req.body;
    console.log('Adding product: ' + JSON.stringify(product));
    db.collection('products', function(err, collection) {
        collection.insert(products, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateProduct = function(req, res) {
    var id = req.params.id;
    var product = req.body;
    console.log('Updating product: ' + id);
    console.log(JSON.stringify(product));
    db.collection('products', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, product, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating product: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(product);
            }
        });
    });
}

exports.deleteProduct = function(req, res) {
    var id = req.params.id;
    console.log('Deleting product: ' + id);
    db.collection('products', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var products =[
    {"KeyboardCombo":{"price":34,"quantity":5,"url":"https://cpen400a.herokuapp.com/images/KeyboardCombo.png"}},
	{"Mice":{"price":5,"quantity":1,"url":"https://cpen400a.herokuapp.com/images/Mice.png"}},
	{"PC1":{"price":315,"quantity":6,"url":"https://cpen400a.herokuapp.com/images/PC1.png"}},
	{"PC2":{"price":381,"quantity":1,"url":"https://cpen400a.herokuapp.com/images/PC2.png"}},
	{"PC3":{"price":330,"quantity":9,"url":"https://cpen400a.herokuapp.com/images/PC3.png"}},
	{"Tent":{"price":30,"quantity":7,"url":"https://cpen400a.herokuapp.com/images/Tent.png"}},
	{"Box1":{"price":5,"quantity":4,"url":"https://cpen400a.herokuapp.com/images/Box1.png"}},
	{"Box2":{"price":6,"quantity":0,"url":"https://cpen400a.herokuapp.com/images/Box2.png"}},
	{"Clothes1":{"price":29,"quantity":6,"url":"https://cpen400a.herokuapp.com/images/Clothes1.png"}},
	{"Clothes2":{"price":25,"quantity":3,"url":"https://cpen400a.herokuapp.com/images/Clothes2.png"}},
	{"Jeans":{"price":38,"quantity":0,"url":"https://cpen400a.herokuapp.com/images/Jeans.png"}},
	{"Keyboard":{"price":25,"quantity":5,"url":"https://cpen400a.herokuapp.com/images/Keyboard.png"}}
	];


    db.collection('products', function(err, collection) {
        collection.insert(products, {safe:true}, function(err, result) {});
    });

};





