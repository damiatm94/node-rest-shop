exports.orders_get_all = (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    })
};

exports.orders_create_order = (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Order was created',
        order: order
    })
};

exports.orders_get_order = (req, res, next) => {
    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId
    });
};

exports.orders_delete_order = (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted',
        orderId: req.params.orderId
    });
};