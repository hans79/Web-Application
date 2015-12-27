var inactiveTime = 300000;
var inactiveTimer;
var timer = setInterval(function(){ myTimer() }, 1000);
var count = 0;



var popupTimer;
var extraTime;

var total = 0;
var timeLeft = 299;

var products =  {
  'Box1' : {
    'price' : 10,
    'quantity' : 10
  },
  'Box2' : {
    'price' : 5,
    'quantity' : 10
  },
  'Clothes1' : {
    'price' : 20,
    'quantity' : 10
  },
  'Clothes2' : {
    'price' : 30,
    'quantity' : 10
  },
  'Jeans' : {
    'price' : 50,
    'quantity' : 10
  },
  'Keyboard' : {
    'price' : 20,
    'quantity' : 10
  },
  'KeyboardCombo' : {
    'price' : 40,
    'quantity' : 10
  },
  'Mice' : {
    'price' : 20,
    'quantity' : 10
  },
  'PC1' : {
    'price' : 350,
    'quantity' : 10
  },
  'PC2' : {
    'price' : 400,
    'quantity' : 10
  },
  'PC3' : {
    'price' : 300,
    'quantity' : 10
  },
  'Tent' : {
    'price' : 100,
    'quantity' : 10
  }
};;
var productws;

var productsOld = {
  'Box1' : {
    'price' : 10,
  },
  'Box2' : {
    'price' : 5,
  },
  'Clothes1' : {
    'price' : 20,
  },
  'Clothes2' : {
    'price' : 30,
  },
  'Jeans' : {
    'price' : 50,
  },
  'Keyboard' : {
    'price' : 20,
  },
  'KeyboardCombo' : {
    'price' : 40,
  },
  'Mice' : {
    'price' : 20,
  },
  'PC1' : {
    'price' : 350,
  },
  'PC2' : {
    'price' : 400,
  },
  'PC3' : {
    'price' : 300,
  },
  'Tent' : {
    'price' : 100,
  }
};


var check = 0;

var cart = {

};

var newfunc2 = function(){
	for(var property in products){
		if(products[property].price != productsOld[property].price){
			alert("Price of " + property + " changed. New price: " + products[property].price);
			productsOld[property].price = products[property].price;
		}
	}
};  



var parse = function(){
		if(count < 10){
			var	x = new	XMLHttpRequest();
			x.open("GET",	"http://localhost:3000/products");
			x.onload = function() {
				if (x.status==200) {
					alert("yay");	
					alert(x.responseText);	
				    productws = JSON.parse(x.responseText);
				    
				    alert(JSON.stringify(productws[0]));
				    newfunc3();	
					if(check == 1){
						check = 0;
						newfunc1();
						newfunc2();
					}
					count = 0;
				} else {	
					alert(" : Received error code : " + x.status);
					count = count + 1;
					parse();
				}
				
			};		
			x.ontimeout = function() {
				alert(" : Timed out after " + x.timeout + " ms");
				count = count + 1;
				parse();
				
			}
			x.onerror = function() {
				alert(" : Resulted in an error !");
				count = count + 1;
				parse();
			};  
			x.onabort = function() {
				alert(" : Aborted");
				count = count + 1;
				parse();
			};
			x.timeout = 5000;
			alert("sending request");
			x.send(null);
		}
		else{
			alert("try again after some time");
		}	
}





function StartTimer(){
	
	inactiveTimer = setTimeout(function(){ alert("Hey there! Are you still planning to buy something?"); ResetTimers();},inactiveTime);
}

function removeRemove(){
	var x = document.getElementsByClassName("remove");
	for(var i=0; i < x.length ; i++){
	x[i].style.visibility = "hidden";
	}
}

function ResetTimers() {
    clearTimeout(inactiveTimer);
    inactiveTime = 300000;
    StartTimer();
}

var addToCart = function(productName) {
	ResetTimers();
	timeLeft = 300;
	if(products[productName].quantity < 1){
		alert("sorry no more " + productName + " left");
	}
	else{
		document.getElementById(productName+"remove").style.visibility = "visible";
		if(cart.hasOwnProperty(productName)){
	   		cart[productName] = cart[productName] + 1; 
	   		//alert(cart[productName]); 
			products[productName].quantity = products[productName].quantity - 1;
			//alert(products[productName].quantity);
			
		}
		else{
			cart[productName] = 1;
			products[productName].quantity = products[productName].quantity - 1;
			//alert(cart[productName]);
			//alert(products[productName].quantity);
			
		}
	}
	
	document.getElementById("price").innerHTML = "Cart"+"($"+totalprice()+")";
	
	
};

var removeFromCart = function(productName) {
	ResetTimers();
	timeLeft = 300;
	
	if(!cart.hasOwnProperty(productName)){
		alert("This item is not in the cart"); 
	}
	else{
		cart[productName] = cart[productName]-1;
		//alert(cart[productName]);
		products[productName].quantity = products[productName].quantity + 1;
		//alert(products[productName].quantity);
		document.getElementById("price").innerHTML = "Cart"+"($"+totalminus(productName)+")";
		
	}
	
	if(cart[productName] == 0){
		delete cart[productName];
		document.getElementById(productName+"remove").style.visibility = "hidden";
	
	}
	
	if(!cart.hasOwnProperty(productName)){
			document.getElementById("Cart"+productName).innerHTML = "";
	} 
	
};

var showCart = function() {
	ResetTimers();
	timeLeft = 300;
	extraTime = 0;
	var x;
	for (var property in cart) {
		
        x = Timer(property);
    	
	}
	
}

function Timer(property){
	popupTimer = setTimeout(function(){alert(property + " = " + cart[property]);}, extraTime);
	extraTime = extraTime + 30000;
}

var totalprice = function(){
	total = 0;
	for(var property in cart){
		total = total + products[property].price * cart[property];
	}
	return total;
}
	
var totalminus = function(productName){

	total = total - products[productName].price;

	return total;
	}


function myTimer() {
	
    document.getElementById("timer").innerHTML = timeLeft + " seconds remaining";
    timeLeft = timeLeft - 1;
    if(timeLeft == 0){
		timeLeft = 300;
	}
}

function addFromModal(productName){
	addToCart(productName);
	modal();
}

function removeFromModal(productName){
	removeFromCart(productName);
	modal();
}	

function modal(){
	ResetTimers();
	timeLeft = 300;
	document.getElementById("fadeMe").style.visibility= "visible";
	document.getElementById("totalPrice").innerHTML = "Total Price: $" + totalprice();
	document.getElementById("price").innerHTML = "Cart"+"($"+totalprice()+")";
	for(var property in cart){
		if(property == "Box1"){
			document.getElementById("Cart"+property).innerHTML = property + ": " + cart[property] +  '<button onclick=addFromModal("Box1")>+</button>' + '<button onclick=removeFromModal("Box1")>-</button>';
		}
		else if(property == "Box2"){
			document.getElementById("Cart"+property).innerHTML = property + ": " + cart[property] +  '<button onclick=addFromModal("Box2")>+</button>' + '<button onclick=removeFromModal("Box2")>-</button>';
		}
		else if(property == "Clothes1"){
			document.getElementById("Cart"+property).innerHTML = property + ": " + cart[property] +  '<button onclick=addFromModal("Clothes1")>+</button>' + '<button onclick=removeFromModal("Clothes1")>-</button>';
		}
		else if(property == "Clothes2"){
			document.getElementById("Cart"+property).innerHTML = property + ": " + cart[property] +  '<button onclick=addFromModal("Clothes2")>+</button>' + '<button onclick=removeFromModal("Clothes2")>-</button>';
		}
		else if(property == "Jeans"){
			document.getElementById("Cart"+property).innerHTML = property + ": " + cart[property] +  '<button onclick=addFromModal("Jeans")>+</button>' + '<button onclick=removeFromModal("Jeans")>-</button>';
		}
		else if(property == "Keyboard"){
			document.getElementById("Cart"+property).innerHTML = property + ": " + cart[property] +  '<button onclick=addFromModal("Keyboard")>+</button>' + '<button onclick=removeFromModal("Keyboard")>-</button>';
		}
		else if(property == "KeyboardCombo"){
			document.getElementById("Cart"+property).innerHTML = property + ": " + cart[property] +  '<button onclick=addFromModal("KeyboardCombo")>+</button>' + '<button onclick=removeFromModal("KeyboardCombo")>-</button>';
		}
		else if(property == "Mice"){
			document.getElementById("Cart"+property).innerHTML = property + ": " + cart[property] +  '<button onclick=addFromModal("Mice")>+</button>' + '<button onclick=removeFromModal("Mice")>-</button>';
		}
		else if(property == "PC1"){
			document.getElementById("Cart"+property).innerHTML = property + ": " + cart[property] +  '<button onclick=addFromModal("PC1")>+</button>' + '<button onclick=removeFromModal("PC1")>-</button>';
		}
		else if(property == "PC2"){
			document.getElementById("Cart"+property).innerHTML = property + ": " + cart[property] +  '<button onclick=addFromModal("PC2")>+</button>' + '<button onclick=removeFromModal("PC2")>-</button>';
		}
		else if(property == "PC3"){
			document.getElementById("Cart"+property).innerHTML = property + ": " + cart[property] +  '<button onclick=addFromModal("PC3")>+</button>' + '<button onclick=removeFromModal("PC3")>-</button>';
		}
		else if(property == "Tent"){
			document.getElementById("Cart"+property).innerHTML = property + ": " + cart[property] +  '<button onclick=addFromModal("Tent")>+</button>' + '<button onclick=removeFromModal("Tent")>-</button>';
		}
	}
	
}

function exit(){
	document.getElementById("fadeMe").style.visibility = "hidden";
} 

function confirm(){
	alert("We are confirming the final total price and as well as availibility");
	check = 1;
	newfunc4();
	//parse();
	
}

var newfunc1 = function(){	
			for(var property in cart){
				if(cart[property] > products[property].quantity){
					alert("Sorry only " + products[property].quantity + " of " + property + " left. New price and quantity in cart shown");
					cart[property] = products[property].quantity;
				}
				products[property].quantity = products[property].quantity - cart[property];
				if(cart[property] == 0){
					delete cart[property];
					document.getElementById(property+"remove").style.visibility = "hidden";
					document.getElementById("Cart"+property).innerHTML = "";
				}
	
			}
			modal();
				
};

var newfunc3 = function(){
	//alert("yay");
	for(var i = 0; i < 12; i++){
		//alert("yay" + i);
		//alert(JSON.stringify(productws[i]._id));
		//alert(JSON.stringify(productws[i].KeyboardCombo.quantity));
		if(productws[i]._id == "5657bbee4a6122d4067030f1"){
			products["KeyboardCombo"].quantity = productws[i].KeyboardCombo.quauntity;
			products["KeyboardCombo"].price = productws[i].KeyboardCombo.price;
		}
		else if(productws[i]._id == "5657bbee4a6122d4067030f2"){
			products["Mice"].quantity = productws[i].Mice.quauntity;
			products["Mice"].price = productws[i].Mice.price;
		}
		else if(productws[i]._id == "5657bbee4a6122d4067030f3"){
			products["PC1"].quantity = productws[i].PC1.quauntity;
			products["PC1"].price = productws[i].PC1.price;
		}
		else if(productws[i]._id == "5657bbee4a6122d4067030f4"){
			products["PC2"].quantity = productws[i].PC2.quauntity;
			products["PC2"].price = productws[i].PC2.price;
		}
		else if(productws[i]._id == "5657bbee4a6122d4067030f5"){
			products["PC3"].quantity = productws[i].PC3.quauntity;
			products["PC3"].price = productws[i].PC3.price;
		}
		else if(productws[i]._id == "5657bbee4a6122d4067030f6"){
			products["Tent"].quantity = productws[i].Tent.quauntity;
			products["Tent"].price = productws[i].Tent.price;
		}
		else if(productws[i]._id == "5657bbee4a6122d4067030f8"){
			products["Box2"].quantity = productws[i].Box2.quauntity;
			products["Box2"].price = productws[i].Box2.price;
		}
		else if(productws[i]._id == "5657bbee4a6122d4067030f7"){
			products["Box1"].quantity = productws[i].Box1.quauntity;
			products["Box1"].price = productws[i].Box1.price;
		}
		else if(productws[i]._id == "5657bbee4a6122d4067030f9"){
			products["Clothes1"].quantity = productws[i].Clothes1.quauntity;
			products["Clothes1"].price = productws[i].Clothes1.price;
		}
		else if(productws[i]._id == "5657bbee4a6122d4067030fa"){
			products["Clothes2"].quantity = productws[i].Clothes2.quauntity;
			products["Clothes2"].price = productws[i].Clothes2.price;
		}
		else if(productws[i]._id == "5657bbee4a6122d4067030fb"){
			products["Jeans"].quantity = productws[i].Jeans.quauntity;
			products["Jeans"].price = productws[i].Jeans.price;
		}
		else if(productws[i]._id == "5657bbee4a6122d4067030fc"){
			products["Keyboard"].quantity = productws[i].Keyboard.quauntity;
			products["Keyboard"].price = productws[i].Keyboard.price;
		}
	}	

};

var newfunc4 = function(){

	if(count < 10){
			var	x = new	XMLHttpRequest();
			var cartJson = JSON.stringify(cart);
			x.open("POST",	"http://localhost:3000/products");
			x.setRequestHeader('Content-Type',  'application/x-www-form-urlencoded');
			x.onload = function() {
				if (x.status==200) {
					alert(cartJson);
					alert(x.responseText);	
					count = 0;
				} else {	
					alert(" : Received error code : " + x.status);
					count = count + 1;
					newfunc4();
				}
				
			};		
			x.ontimeout = function() {
				alert(" : Timed out after " + x.timeout + " ms");
				count = count + 1;
				newfunc4();
				
			}
			x.onerror = function() {
				alert(" : Resulted in an error !");
				count = count + 1;
				newfunc4();
			};  
			x.onabort = function() {
				alert(" : Aborted");
				count = count + 1;
				newfunc4();
			};
			x.timeout = 5000;
			alert("sending request");
			x.send(cartJson);
		}
		else{
			alert("try again after some time");
		}		


};




