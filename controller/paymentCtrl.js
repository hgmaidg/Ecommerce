const checkout = async (req, res) => {
  const option = {
    amount: amount * 1000,
    currency: "VND",
  };
  const order = await instance.orders.create(option);
  res.json({
    success: true,
    order,
  });
};

const paymentVerification = async (req, res) => {};

module.exports = {
  checkout,
  paymentVerification,
};
