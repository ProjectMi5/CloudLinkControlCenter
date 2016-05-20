/**
 *
 * @type {*|exports|module.exports}
 */
/** requires module: ./../../config.js */
var config = require('./../../config.js');
var validStatus = config.order.validStatus;
/** requires module: ./rest */
var rest = require('./rest');
/** requires module: moment */
var moment = require('moment');
/** requires module: fs */
var fs = require('fs');
var update;
var selections = []

/**@function init
 * @constructor
 */
function init(){
	update = new Date();
}

/** Prototype to update Orders
 * @memberof init
 * @function update
 */
init.prototype.update = function(){
	rest.getOrdersFiltered({})
	.then(function(ret){
		update = new Date();
		fs.writeFile('./data/orders.json', JSON.stringify(ret));
		
	})
	.catch(function(err){
		console.log(err);
	});	
}

/** Prototype to initialize Fields (Bootstrap)
 * @memberof init
 * @function initFields
 */
init.prototype.initFields = function(){
	global.$('#CheckStatus').innerHTML = '';
	
	validStatus.forEach(function(item){
		var id = 'CheckStatus'+item.replace(/\s+/g, '');
		global.$('#CheckStatus').append('<input type="checkbox" id="'+id+'" checked>'+item+'</input>  ');

	});

	$('#chosableStatusesMulti').empty();
	validStatus.forEach(function(el){
		var input = '<li><a href="#" class="multipleSetOrderStatusBtn" >'+el+'</a></li>';
		console.log(input);
		$('#chosableStatusesMulti').prepend(input);
	});


	global.$('#orderTable').bootstrapTable({
		idField: 'orderId',
		clickToSelect: 'true',
		columns: [{
			field: 'state',
			checkbox: true,
			align: 'center',
			valign: 'middle'
		},
			{
			field: 'orderId',
			title: 'orderId',
			sortable: 'true',
			sortOrder: 'asc'
		},
		{
			field: 'recipeId',
			title: 'recipeId',
			sortable: 'true'
		},
		{
			field: 'marketPlaceId',
			title: 'origin',
			sortable: 'true'
		},
		{
			field: 'priority',
			title: 'priority',
			sortable: 'true',
			visible: 'false',
			cardVisible: 'false'
		},
		{
			field: 'status',
			title: 'status',
			sortable: 'true',
			cardVisible: 'true'
		},
		{
			field: 'estimatedTimeOfCompletion',
			title: 'remaining time',
			sortable: 'true'
		}],
		url: './../data/orders.json',
		responseHandler: responseHandler
	});
};
function responseHandler(res) {
	var selectedObjectIds = getSelectedIds()
	for(var i=0; i< res.length;i++){
		res[i].state = selectedObjectIds.indexOf(res[i].orderId) !== -1;
	}
	return res;
}

function getSelectedIds() {
	return $.map($('#orderTable').bootstrapTable('getSelections'), function (row) {
		return row.orderId
	});
}


/** Prototype to initialize Modal Table (Bootstrap)
 * @memberof init
 * @function initModal
 */
init.prototype.initModal = function(order){

	global.$('#orderModal').modal();
	global.$('#orderModalTitle').html("View Order "+order.orderId);//+ el.orderId;
	
	
	$('#orderModalTable').bootstrapTable({
		cardView: 'true',
		columns:[{
			field: 'orderId',
			title: 'orderId'
		},
		{
			field: 'customerName',
			title: 'customer name'
		},
		{
			field: 'marketPlaceId',
			title: 'origin'
		},
		{
			field: 'status',
			title: 'status'
		},
		{
			field: 'reviewed',
			title: 'reviewed'
		},
		{
			field: 'barcode',
			title: 'barcode'
		},
		{
			field: 'date',
			title: 'date'
		},
		{
			field: 'parameters',
			title: 'parameters'
		},
		{
			field: 'priority',
			title: 'priority'
		},
		{
			field: 'estimatedTimeOfCompletion',
			title: 'remaining time'
		}],
		data: [order]
	});
	$('#chosableStatuses').empty();
	validStatus.forEach(function(el){
		var input = '<li><a href="#" class="SetOrderStatusBtn" name="'+order.orderId+'">'+el+'</a></li>';
		console.log(input);
		$('#chosableStatuses').prepend(input);
	});





	
/* 	rest.getCocktailDataByOrderId(el.orderId)
		.then(function(ret){
			console.log(el);
			console.log(ret);
			//for (var attrname in el) {ret[attrname] = el[attrname];}
			
			$('#orderModalTable').bootstrapTable({
				cardView: 'true',
				columns:[{
					field: 'orderId',
					title: 'orderId'
				}],
				data: el
			});
			
			$('#orderModal').modal();
		})
		.catch(function(err){
			console.log(err);
		}); */
};

/*init.prototype.initUpdateListener = function(){
	while(true){
		setTimeout(this.update, 5000);		
	}
};

init.prototype.update = function(){
	console.log('fired update');
	rest.getOrdersUpdatedSince(update)
	.then(function(ret){
		ret.forEach(function(item){
			console.log(item);
			$('#orderTable').bootstrapTable('updateRow', {
				index: {orderId: item.orderId},
				row: item
			});
		});
	});
};*/

module.exports = new init();