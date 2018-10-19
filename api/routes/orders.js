const express = require('express');
const router = express.Router(); // allows us to handle different routes etc
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

router.get('/', OrdersController.orders_get_all);

router.post('/', OrdersController.orders_create_order);

router.get('/:orderId', OrdersController.orders_get_order);

router.delete('/:orderId', OrdersController.orders_delete_order);

module.exports = router;
