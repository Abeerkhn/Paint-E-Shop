import orderModel from "../models/orderModel.js";

// Modify this controller for COD
export const codPaymentController = async (req, res) => {
    try {
      const { cart } = req.body;
  
      // Calculate the total amount from the items in the cart
      let total = 0;
      cart.forEach((item) => {
        total += item.price; 
      });
  
      // Create a new order with COD status
      const order = new orderModel({
        products: cart,
        payment: { method: 'COD' }, // Indicate that it's Cash on Delivery
        buyer: req.user._id,
        status: 'Not Process', // Set the initial status
      });
  
      await order.save();
  
      res.json({ ok: true });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };
  
  // Edit Order 
  export const editOrderController = async (req, res) => {
    try {
      const { orderId, modifications } = req.body;
  
      // Validate modifications (implement your validation logic)
  
      // Update the order with the modifications
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { $set: modifications },
        { new: true }
      );
  
      res.status(200).send({
        success: true,
        message: "Order updated successfully",
        order: updatedOrder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error updating order",
        error,
      });
    }
  };
  
  
  // cancel order
  export const cancelOrderController = async (req, res) => {
    try {
      const { orderId } = req.params;
  
      // Update the order status to "Cancelled"
      const cancelledOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { $set: { status: "Cancelled" } },
        { new: true }
      );
  
      res.status(200).send({
        success: true,
        message: "Order cancelled successfully",
        order: cancelledOrder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error cancelling order",
        error,
      });
    }
  };
  
  // viewOrderController
  
  export const viewOrderController = async (req, res) => {
    try {
      const { orderId } = req.params;
  
      // Retrieve detailed information about the order
      const order = await orderModel.findById(orderId);
  
      res.status(200).send({
        success: true,
        message: "Order details retrieved successfully",
        order,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error retrieving order details",
        error,
      });
    }
  };
  
  
  // listOrders
  
  export const listOrdersController = async (req, res) => {
    try {
      // Implement filtering options if needed
      const orders = await orderModel.find({});
  
      res.status(200).send({
        success: true,
        countTotal: orders.length,
        message: "All orders retrieved successfully",
        orders,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error retrieving orders",
        error,
      });
    }
  };
  
  // updateOrderStatus
  
  export const updateOrderStatusController = async (req, res) => {
    try {
      const { orderId, newStatus } = req.body;
  
      // Implement validation for allowed status transitions
  
      // Update the order status
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { $set: { status: newStatus } },
        { new: true }
      );
  
      res.status(200).send({
        success: true,
        message: "Order status updated successfully",
        order: updatedOrder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error updating order status",
        error,
      });
    }
  };
  
  
  // orderHistory
  
  export const orderHistoryController = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Retrieve the order history for the specific user
      const orderHistory = await orderModel.find({ buyer: userId });
  
      res.status(200).send({
        success: true,
        countTotal: orderHistory.length,
        message: "Order history retrieved successfully",
        orderHistory,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error retrieving order history",
        error,
      });
    }
  };
  