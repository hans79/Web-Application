var express = require('express'),
products = require('./routes/products');

var bodyParser = require('body-parser');	
	
var app = express();

// parse application/x-www-form-urlencoded
/*app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());*/

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/products', products.findAll);
/*app.get('/products', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
	var productsw = products.findAll;
	
	
	  var productsq = {
      'KeyboardCombo' : {
        price : 10,
        quantity : 10,
        url : 'https://cpen400a.herokuapp.com/images/KeyboardCombo.png'
      },
      'Mice' : {
        price : 10,
        quantity : 10,
        url : 'https://cpen400a.herokuapp.com/images/Mice.png'
      },
      'PC1' : {
        price : 10,
        quantity : 10,
        url : 'https://cpen400a.herokuapp.com/images/PC1.png'
      },
      'PC2' : {
        price : 10,
        quantity : 10,
        url : 'https://cpen400a.herokuapp.com/images/PC2.png'
      },
      'PC3' : {
        price : 10,
        quantity : 10,
        url : 'https://cpen400a.herokuapp.com/images/PC3.png'
      },
      'Tent' : {
        price : 10,
        quantity : 10,
        url : 'https://cpen400a.herokuapp.com/images/Tent.png'
      },
      'Box1' : {
        price : 10,
        quantity : 10,
        url : 'https://cpen400a.herokuapp.com/images/Box1.png'
      },
      'Box2' : {
        price : 10,
        quantity : 10,
        url : 'https://cpen400a.herokuapp.com/images/Box2.png'
      },
      'Clothes1' : {
        price : 10,
        quantity : 10,
        url : 'https://cpen400a.herokuapp.com/images/Clothes1.png'
      },
      'Clothes2' : {
        price : 10,
        quantity :10,
        url : 'https://cpen400a.herokuapp.com/images/Clothes2.png'
      },
      'Jeans' : {
        price : 10,
        quantity : 10,
        url : 'https://cpen400a.herokuapp.com/images/Jeans.png'
      },
      'Keyboard' : {
        price : 10,
        quantity : 10,
        url : 'https://cpen400a.herokuapp.com/images/Keyboard.png'
      }};

    response.send(productsw);
});*/

app.post('/products', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log(request.body);
  response.send();
  
});
app.put('/products/:id', products.updateProduct);
app.delete('/products/:id', products.deleteProduct);

app.listen(3000);
console.log('Listening on port 3000...');


