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
};

module.exports = new init();