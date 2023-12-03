import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";
import productModel from "../models/productModel.js";

// Modify this controller for COD
export const codPaymentController = async (req, res) => {
  try {
    const { _id: userId } = JWT.decode(req.headers.authorization);
    console.log(userId)
    const { products } = req.body;

    // Calculate the total amount from the items in the cart
    // let total = 0;

    console.log(products);
    let totalPrice = 0

    products.forEach(element => {
      totalPrice += element.price
    });

    console.log(totalPrice)
    
    const productList = products.map((product) => {
      // return mongoose.Types.ObjectId(id);
      return {...product,productId: mongoose.Types.ObjectId(product.productId)};
    });

    console.log(productList);

    // Create a new order with COD status
    const order = new orderModel({
      products: productList,
      payment: { method: "COD" }, // Indicate that it's Cash on Delivery
      buyer: mongoose.Types.ObjectId(userId),
      status: "Not Process", // Set the initial status
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
    const { modifications } = req.body;
    const { orderId } = req.params;

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
    let orderList = [];

    console.log(order.products)

    
     const productsList =  await productModel.find({
        '_id': { "$in": order.products }
      })
    

    res.status(200).send({
      success: true,
      message: "Order details retrieved successfully",
      order,
      productsList
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
    const { newStatus } = req.body;
    const { orderId } = req.params;

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
    // const { userId } = req.params;
    const { _id: userId } = JWT.decode(req.headers.authorization);

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



export const cartController = async (req, res) => {
  try {
    // const { userId } = req.params;
    const { _id: userId } = JWT.decode(req.headers.authorization);

    // Retrieve the order history for the specific user
    const orderHistory = await orderModel.find({ buyer: userId,status:'Not Process'});

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
