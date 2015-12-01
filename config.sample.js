/**
 * Sample Configuration
 */
var config = {};

config.auth = {}; // used with request - keep object properties user and password!
config.auth.user = 'foo';
config.auth.password = 'bar';
	
config.rest = {};
config.rest.host = 'https://mi5.itq.de';
config.rest.getTasks = 'getTasks';
config.rest.getOrdersByStatus = 'getOrdersByStatus';
config.rest.updateOrderStatus = 'updateOrderStatus';

config.order = {};
config.order.validStatus = ['pending', 'rejected', 'accepted', 'in progress', 'done', 'delivered', 'archived', 'aborted', 'failure']

module.exports = config;