
$(function() {initTouch();makeItemsDraggable();});function makeItemsDraggable () {var cart = $(".cart_placeholder"),
item = $(".catalog_placeholder .catalog_item"),droppedCount = 0;var ajax_items = new Array();item.draggable({cursor : 'pointer',opacity : 0.60,revert : true,containment : 'window'});
cart.droppable({drop : function(event, ui){ /*Remove the dragged icon*/ if(isPosibleToAdd(ui.draggable)){if($('.items > li').length > 0){/*If the element does not exists add it to the cart, if it does just sum*/if(!checkItemExistence(ui.draggable))
/*we add the new item to the cart*/addToCart(ui.draggable);}else{addToCart(ui.draggable);$('#cart_logo').attr('src', 'Resources/img/cart_full.png');}}increaseItemsInCart();}});/*end of cart.droppable function */}
$(document).on('click', '.add_to_cart', function () {var element = $(this).parent().parent().parent();if(isPosibleToAdd(element)){if($('.items > li').length > 0){if(!checkItemExistence(element))
addToCart(element);}else{addToCart(element);$('#cart_logo').attr('src', 'Resources/img/cart_full.png');}}increaseItemsInCart();});
$(document).on('click', '.cart_item #close', function(event){ eliminateItem(this);});function isPosibleToAdd (element) {var posible = false;var available = parseInt($('.lblAvailability', element).html());if(available > 0){(available == 1) ? element.remove() : null;--available;
$('.lblAvailability', element).html(available);posible = true;}return posible;}
function checkItemExistence (draggedElement) {var exists = false;/*Check each of the elements*/ $('.items > li').each(function(){if($('.item_id', this).html() == $('.item_id', draggedElement).html()){exists = true; $('.lblCount', this).html( parseInt($('.lblCount', this).html()) + 1 );
sumPrices(draggedElement, 'sum');}});return exists;}function increaseItemsInCart() {item_count = $("#item_count > label");droppedCount = parseInt(item_count.text());/*Update the count of the items in the cart*/item_count.text(++droppedCount);}
function eliminateItem (element) {var clicked_element = $(element).parent();if ($('.lblCount', clicked_element).html() > 1){var count = parseInt($('.lblCount', clicked_element).html());--count;
$('.lblCount', clicked_element).html(count);}else {$(clicked_element).remove(); }$("#item_count > label").text(parseInt($("#item_count > label").text()) - 1);sumPrices(clicked_element, 'substract');returnToItems(clicked_element);}
function returnToItems (deleted) {var existsInItems = false;var matching = null;$(".catalog_placeholder .catalog_item").each(function(){if($('.item_id', this).html() == $('.item_id', deleted).html()){
existsInItems = true; matching = this; return false;}}); if(existsInItems == true)$('.lblAvailability', matching).html(parseInt($('.lblAvailability', matching).html()) + 1);else addToItems(deleted);
makeItemsDraggable();}function addToItems (item) { $('.catalog_placeholder').append('<div class="catalog_item"><img class="item_image" src="'+$('.item_image', item).attr('src')+'" alt="Insert image here" /><ul><li>Name: <label class="lblName">'+
$('.lblName', item).html()+'</label></li><li class="lblDescription">'+ $('.lblDescription', item).html()+'</li><li>Availability: <label class="lblAvailability">1</label></li>   <li>Price: <label class="lblPrice">'+
$('.lblPrice', item).html()+'</label></li><li>Item ID: <label class="item_id">'+$('.item_id', item).html()+'</label></li><li><a class="add_to_cart" href="#">Add to Cart</a></li></ul></div>');}function addToCart (dragging) {
$('.items').append('<li><div class="cart_item"><img class="item_image" src="'+$('.item_image', dragging).attr('src')+'" alt="Insert image here" /><ul><li>Name: <label class="lblName">'+
$('.lblName', dragging).html()+'</label></li><li class="lblDescription">'+$('.lblDescription', dragging).html()+'</li><li>Price: <label class="lblPrice">'+$('.lblPrice', dragging).html()+
'</label></li><li>Item ID: <label class="item_id">'+ $('.item_id', dragging).html()+'</label></li><li>Cantidad: <label class="lblCount">1</label></li></ul><img id="close" src="Resources/img/close.png" /></div></li>');
sumPrices(dragging, 'sum');}function sumPrices (dragging, operation) {var totalPrice = $('.lblPrice', dragging).html();totalPrice = totalPrice.substring(2, totalPrice.length - 4);
var current = parseInt($('#cart_total > label').html());switch(operation){case 'sum':current += parseInt(totalPrice);break;case 'substract':current -= parseInt(totalPrice);break;}$('#cart_total > label').html(current+' ');}
function processCartToAJAX() {var ajaxArray = new Array();$('.items > li').each(function(){/*Create an array containing the info for the current item*/var current_item = new Array($('.item_image', this).attr('src'), $('.lblName', this).html(),
	$('.lblDescription', this).html(), $('.lblPrice', this).html(),$('.item_id', this).html(), $('.lblCount', this).html());ajaxArray.push(current_item);});return ajaxArray;}

$(document).on('click', '.ConfimCart', function(){var response = processCartToAJAX();});