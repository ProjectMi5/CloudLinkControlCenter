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

/**@function listenerInit
 * @constructor
 */
function init(){

}

/** Prototype to define Listener
 * @memberof init
 * @function Listen
 */
init.prototype.Listen = function(){
	$("body").on('click', ".SetOrderStatusBtn", function(){
		var orderId = $(this).attr('name');
		var status = $(this).text();
		
		rest.updateOrderStatus(orderId, status)
			.then(function(ret){
				swal("status: "+ret.status, ret.description, "success");
			})
			.catch(function(err){
				console.log(err);
			});
		

		
		//.each(function(){
		//	console.log('Update Status of OrderId '+$(this).attr('name')+' to '+$(this).html());
		//});
			//$input.forEach(function(el){
			//	console.log('Update Status of OrderId '+el.attr('name')+' to '+el.html());
			//});
			//rest.updateOrderStatus(el.attr('name'), el.html())
			//.then(function(ret){
			//	alert(ret);
		
	});
	$("body").on('click', ".multipleSetOrderStatusBtn", function() {
		var status = $(this).text();
        var selectedOrders = $('#orderTable').bootstrapTable('getSelections');

        selectedOrders.forEach(function(order){
            console.log(order.status);
            console.log(order.orderId);
		    rest.updateOrderStatus(order.orderId, status)
			    .then(function (ret) {
				    swal("status: " + ret.status, ret.description, "success");
	    		})
		    	.catch(function (err) {
			    	console.log(err);
			});
        });

        //uncheck selected Orders
        $('#orderTable').bootstrapTable('uncheckAll');
	});	
};

module.exports = new init();