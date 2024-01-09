const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getMyOrders,
  updateOrderStatus,
  getAllOrders,
  removeProductFromCart,
  updateProductQuantityFromCart,
  getOrderByUserId,
  getMonthWiseOrderIncome,
  getMonthWiseOrderCount,
  getYearlyTotalOrders,
  getSingleOrder,
} = require("../controller/userCtrl");
const {
  paymentVerification,
  checkout,
  vnpayPayment,
  getVnpayIpn,
  vnpayReturn,
} = require("../controller/paymentCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);

router.put("/reset-password/:token", resetPassword);

router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/paymentVerification", authMiddleware, paymentVerification);
// router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", authMiddleware, createOrder);
router.get("/all-users", getallUser);
router.get("/getmyorders", authMiddleware, getMyOrders);
router.get("/orders", authMiddleware, isAdmin, getAllOrders);
router.get("/getorderbyuser/:id", getOrderByUserId);
router.get("/getOrder/:id", getSingleOrder);

router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);
router.get("/getMonthWiseOrderIncome", authMiddleware, getMonthWiseOrderIncome);
router.get("/getMonthWiseOrderCount", authMiddleware, getMonthWiseOrderCount);
router.get("/getYearlyOrders", authMiddleware, getYearlyTotalOrders);

router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  removeProductFromCart
);
router.put(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddleware,
  updateProductQuantityFromCart
);
router.delete("/empty", authMiddleware, emptyCart);
router.delete("/:id", deleteaUser);
// router.put(
//   "/order/update-order/:id",
//   authMiddleware,
//   isAdmin,
//   updateOrderStatus
// );
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.put("/orders/:id", authMiddleware, isAdmin, updateOrderStatus);

router.post("/create_payment_url", vnpayPayment);
// router.post("/create_payment_url", (req, res) => res.json({ success: true }));
router.get("/vnpay_ipn", getVnpayIpn);
router.get("/vnpay_return", vnpayReturn);

module.exports = router;
