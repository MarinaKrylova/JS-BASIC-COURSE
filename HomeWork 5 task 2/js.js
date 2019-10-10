"use strict";

var d = document,
    itemBox = d.querySelectorAll('.item_box'), 
		cartCont = d.getElementById('cart_content'); 

function addEvent(elem, type, handler){
  if(elem.addEventListener){
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on'+type, function(){ 
    	handler.call( elem); 
    });
  }
  return false;
}

function getCartData(){
	return JSON.parse(localStorage.getItem('cart'));
}

function setCartData(o){
	localStorage.setItem('cart', JSON.stringify(o));
	return false;
}

function addToCart(e){
	this.disabled = true; 
	var cartData = getCartData() || {},
			parentBox = this.parentNode, 
			itemId = this.getAttribute('data-id'), 
			itemTitle = parentBox.querySelector('.item_title').innerHTML, 
			itemPrice = parentBox.querySelector('.item_price').innerHTML; 
	if(cartData.hasOwnProperty(itemId)){ 
		cartData[itemId][2] += 1;
	} else { 
		cartData[itemId] = [itemTitle, itemPrice, 1];
	}
	
	if(!setCartData(cartData)){ 
		this.disabled = false;
		cartCont.innerHTML = 'Item add to Cart.';
		setTimeout(function(){
			cartCont.innerHTML = 'Continue shopping...';
		}, 1000);
	}
	return false;
}

for(var i = 0; i < itemBox.length; i++){
	addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);
}
function openCart(e){
	
	var cartData = getCartData(), 
			totalItems = '';
	console.log(JSON.stringify(cartData));
	
	if(cartData !== null){
		totalItems = '<table class="shopping_list"><tr><th>Title</th><th>Price</th><th>Quantity</th></tr>';
		for(var items in cartData){
			totalItems += '<tr>';
			for(var i = 0; i < cartData[items].length; i++){
				totalItems += '<td>' + cartData[items][i] + '</td>';
			}
			totalItems += '</tr>';
		}
		totalItems += '<table>';
		cartCont.innerHTML = totalItems;
	} else {
		cartCont.innerHTML = 'Empty Cart!';
	}
	return false;
}

addEvent(d.getElementById('checkout'), 'click', openCart);

addEvent(d.getElementById('clear_cart'), 'click', function(e){
	localStorage.removeItem('cart');
	cartCont.innerHTML = 'Cart cleared.';	
});