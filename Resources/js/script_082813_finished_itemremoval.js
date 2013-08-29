

$(function() {

	initTouch();

	makeItemsDraggable();
});

function makeItemsDraggable () {

	var cart = $(".cart_placeholder"),
		item = $(".catalog_placeholder .catalog_item"),
		droppedCount = 0;

	var exists = false;

	var ajax_items = new Array();

	item.draggable({
		cursor : 'pointer',
		opacity : 0.60,
		revert : true,
		containment : 'window'
	});

	cart.droppable({
		drop : function(event, ui){	
			item_count = $("#item_count");
			droppedCount = parseInt(item_count.text());
			//Remove the dragged icon
			var available = parseInt($('.lblAvailability', ui.draggable).html());
			if(available > 0){
				(available == 1) ? ui.draggable.remove() : null;
				--available;
				$('.lblAvailability', ui.draggable).html(available);

				if($('.items > li').length > 0){
					//Check each of the elements
					$('.items > li').each(function(){
						if($('.item_id', this).html() == $('.item_id', ui.draggable).html()){
							exists = true;
							$('.lblCount', this).html( parseInt($('.lblCount', this).html()) + 1 );
							return false;
						}
					});
					/*If the element does not exists add it to the cart, if it does just sum*/
					if(!exists)/*we add the new item to the cart*/addToCart(ui.draggable);
					else exists = false;
				}else{
					addToCart(ui.draggable);
					$('#cart_logo').attr('src', 'Resources/img/cart_full.png');
				}
				//Update the count of the items in the cart
				item_count.text(++droppedCount);
			}
		}
	});
}

$(document).on('click', '.cart_item #close', function(event){
	eliminateItem(this);
});

function eliminateItem (element) {
	var clicked_element = $(element).parent();
	if ($('.lblCount', clicked_element).html() > 1){
		var count = parseInt($('.lblCount', clicked_element).html());
		--count;
		$('.lblCount', clicked_element).html(count);
	}
	else 
		$(clicked_element).remove();

	$("#item_count").text(parseInt($("#item_count").text()) - 1);

	returnToItems(clicked_element);

}

function returnToItems (deleted) {
	var existsInItems = false;
	var matching = null;
	$(".catalog_placeholder .catalog_item").each(function(){
		if($('.item_id', this).html() == $('.item_id', deleted).html()){
			existsInItems = true; matching = this;
			return false;
		}
	});

	if(existsInItems == true)
		$('.lblAvailability', matching).html(parseInt($('.lblAvailability', matching).html()) + 1);
	else
		addToItems(deleted);

	makeItemsDraggable();
}

function addToItems (item) {
	$('.catalog_placeholder').append('<div class="catalog_item"><img class="item_image" src="'+$('.item_image', item).attr('src')+
	'" alt="Insert image here" /><ul><li>Name: <label class="lblName">'+
	$('.lblName', item).html()+'</label></li><li class="lblDescription">'+
	$('.lblDescription', item).html()+'</li><li>Availability: <label class="lblAvailability">1</label></li>   <li>Price: <label class="lblPrice">'+
	$('.lblPrice', item).html()+'</label></li><li>Item ID: <label class="item_id">'+
	$('.item_id', item).html()+'</label></li>'+
	'</ul></div>');
}

function addToCart (dragging) {
	$('.items').append('<li><div class="cart_item"><img class="item_image" src="'+$('.item_image', dragging).attr('src')+
	'" alt="Insert image here" /><ul><li>Name: <label class="lblName">'+
	$('.lblName', dragging).html()+'</label></li><li class="lblDescription">'+
	$('.lblDescription', dragging).html()+'</li><li>Price: <label class="lblPrice">'+
	$('.lblPrice', dragging).html()+'</label></li><li>Item ID: <label class="item_id">'+
	$('.item_id', dragging).html()+'</label></li><li>Cantidad: <label class="lblCount">'+
	1+'</label></li></ul><img id="close" src="Resources/img/close.png" /></div></li>');
}

function processCartToAJAX() {

	$('.items').each(function(){
		//Create an array containing the info for the current item
		var current_item = new Array(
			$('.item_image', this).attr('src'), $('.lblName', this).html(),$('.lblDescription', this).html(), 
			$('.lblPrice', this).html(),$('.item_id', this).html(), $('.lblCount', this).html()
		);
	});
}
