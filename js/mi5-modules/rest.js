/**
 *
 * @type {*|exports|module.exports}
 */
/** requires module: url-join */
var urljoin = require('url-join');
/** requires module: request */
var request = require('request');
/** requires module: bluebird */
var Promise = require('bluebird');
/** requires module: ./../../config.js */
var config = require('./../../config.js');

/**@function rest
 * @constructor
 */
function rest(){}

/** Prototype to check connection
 * @memberof rest
 * @function checkConnection
 */
rest.prototype.checkConnection = function(){
  var options = {
    url:  urljoin(config.rest.host, 'helloWorld'),
    rejectUnauthorized: false, // TODO certificate needs to be bundled correctly
    auth: config.auth
  };

  return new Promise(function(resolve, reject){
    request.get(options, function(err, res, body){
      if(err) reject(err);
      if(body == 'Hello World!'){
        resolve({status: 'ok'});
      }
    });
  });
};

/** Prototype to get orders by status
 * @memberof rest
 * @function getOrdersByStatus
 */
rest.prototype.getOrdersByStatus = function(status){
  var options = {
    url:  urljoin(config.rest.host, config.rest.getOrdersByStatus),
    rejectUnauthorized: false, // TODO certificate needs to be bundled correctly
    form: {status: status},
    auth: config.auth
  };

  return new Promise(function(resolve, reject){
    request.post(options, function(err, res, body){
      if(err) reject(err);
      try {
        body = JSON.parse(body);
        resolve(body);
      } catch (err){
        reject('could not perform getOrdersByStatus, maybe server is not reached, or body is not json');
      }
    });
  });
};

/** Prototype to get active orders
 * @memberof rest
 * @function getActiveOrders
 */
rest.prototype.getActiveOrders = function(status){
  var options = {
    url:  urljoin(config.rest.host, config.rest.getActiveOrders),
    rejectUnauthorized: false, // TODO certificate needs to be bundled correctly
    auth: config.auth
  };

  return new Promise(function(resolve, reject){
    request.post(options, function(err, res, body){
      if(err) reject(err);
      try {
        body = JSON.parse(body);
        resolve(body);
      } catch (err){
        reject('could not perform getOrdersByStatus, maybe server is not reached, or body is not json');
      }
    });
  });
};

/** Prototype to get Orders Updated since a Timestamp
 * @memberof rest
 * @function getOrdersUpdatedSince
 * @param timestamp
 */
rest.prototype.getOrdersUpdatedSince = function(timestamp){
  var options = {
    url:  urljoin(config.rest.host, 'getOrdersUpdatedSince'),
    rejectUnauthorized: false, // TODO certificate needs to be bundled correctly
    timestamp: timestamp,
    auth: config.auth
  };

  return new Promise(function(resolve, reject){
    request.post(options, function(err, res, body){
      if(err) reject(err);
      try {
        body = JSON.parse(body);
        resolve(body);
      } catch (err){
        reject('could not perform getOrdersByStatus, maybe server is not reached, or body is not json');
      }
    });
  });
};

/** Prototype to get Cocktail Data by OrderId
 * @memberof rest
 * @function getCocktailDataByOrderId
 * @param id
 */
rest.prototype.getCocktailDataByOrderId = function(id){
  var options = {
    url:  urljoin(config.rest.host, 'getCocktailDataByOrderId'),
    rejectUnauthorized: false, // TODO certificate needs to be bundled correctly
    form: {id: id},
    auth: config.auth
  };

  return new Promise(function(resolve, reject){
    request.post(options, function(err, res, body){
      if(err) reject(err);
      try {
        body = JSON.parse(body);
        resolve(body);
      } catch (err){
        reject(err);
      }
    });
  });
};

/** Prototype to get Irder by Id
 * @memberof rest
 * @function getOrderById
 * @param id
 */
rest.prototype.getOrderById = function(id){
  var options = {
    url:  urljoin(config.rest.host, 'getOrderById'),
    rejectUnauthorized: false, // TODO certificate needs to be bundled correctly
    form: {id: id},
    auth: config.auth
  };

  return new Promise(function(resolve, reject){
    request.post(options, function(err, res, body){
      if(err) reject(err);
      try {
        body = JSON.parse(body);
        resolve(body);
      } catch (err){
        reject('could not perform getOrdersByStatus, maybe server is not reached, or body is not json');
      }
    });
  });
};

/** Prototype to get Orders Filtered
 * @memberof rest
 * @function getOrdersFiltered
 * @param filter
 */
rest.prototype.getOrdersFiltered = function(filter){
  var options = {
    url:  urljoin(config.rest.host, 'getOrdersFiltered'),
    rejectUnauthorized: false, // TODO certificate needs to be bundled correctly
    form: filter,
    auth: config.auth
  };

  return new Promise(function(resolve, reject){
    request.post(options, function(err, res, body){
      if(err) reject(err);
      try {
        body = JSON.parse(body);
        resolve(body);
      } catch (err){
        reject('could not perform getOrdersByStatus, maybe server is not reached, or body is not json');
      }
    });
  });
};

/** Prototype to update Orders status
 * @memberof rest
 * @function updateOrderStatus
 * @param orderid
 * @param status
 */
rest.prototype.updateOrderStatus = function(orderid, status){
  var options = {
    url:  urljoin(config.rest.host, config.rest.updateOrderStatus),
    rejectUnauthorized: false, // TODO certificate needs to be bundled correctly
    form: {id: orderid, status: status},
    auth: config.auth
  };

  return new Promise(function(resolve, reject){
    request.post(options, function(err, res, body){
      if(err) reject(err);
      try {
        body = JSON.parse(body);
        resolve(body);
      } catch (err){
        reject('problems in JSON.parse, probably return is not JSON formatted');
      }
    });
  });
};

/** Prototype to perform Order
 * @memberof rest
 * @function performOrder
 */
rest.prototype.performOrder = function(){
  var options = {
    url:  urljoin(config.rest.host, config.rest.placeOrder),
    rejectUnauthorized: false, // TODO certificate needs to be bundled correctly
    form: {order: '{"recipeId":10010,"parameters":[],"marketPlaceId":"eu"}'},
    auth: config.auth
  };

  return new Promise(function(resolve, reject){
    request.post(options, function(err, res, body){
      if(err) reject(err);
      try {
        body = JSON.parse(body);
        resolve(body);
      } catch (err){
        reject('problems in JSON.parse, probably return is not JSON formatted');
      }
    });
  });
};

module.exports = new rest();