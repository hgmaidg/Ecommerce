const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: "rzp_test_rMcjpafCZaMpP1",
  key_secret: "GwrzgFVvET3O9OuZ1wHvOJVn",
});

const checkout = async (req, res) => {
  const { amount } = req.body;
  const option = {
    amount: amount * 100,
    currency: "USD",
  };
  const order = await instance.orders.create(option);
  res.json({
    success: true,
    order,
  });
};

const paymentVerification = async (req, res) => {
  const { orderId, paymentId } = req.body;
  res.json({ orderId, paymentId });
};

module.exports = {
  checkout,
  paymentVerification,
};
