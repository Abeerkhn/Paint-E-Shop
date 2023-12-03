import express from "express";
import {
  codPaymentController,
  editOrderController,
  cancelOrderController,
  viewOrderController,
  listOrdersController,
  updateOrderStatusController,
  orderHistoryController,
  cartController,
} from "../controllers/orderController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes for orders
router.post("/cod-payment", requireSignIn, codPaymentController);
router.put("/edit-order/:orderId", requireSignIn, isAdmin, editOrderController);
router.delete("/cancel-order/:orderId", requireSignIn, isAdmin, cancelOrderController);
router.get("/view-order/:orderId", requireSignIn, viewOrderController);
router.get("/list-orders", requireSignIn, isAdmin, listOrdersController);
router.put("/update-order-status/:orderId", requireSignIn, isAdmin, updateOrderStatusController);
router.get("/order-history", requireSignIn, orderHistoryController);
router.get("/cart", requireSignIn, cartController);

export default router;
