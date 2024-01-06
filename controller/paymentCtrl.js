const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: "rzp_test_rMcjpafCZaMpP1",
  key_secret: "GwrzgFVvET3O9OuZ1wHvOJVn",
});

// TODO: move this else where later
function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

const numberSmallerTen = (theNumber) => {
  if (theNumber < 10) return "0" + theNumber;
  else return theNumber;
};

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

// TODO: move this to config file or others
const vnp_TmnCode = "D9IY2UFU";
const vnp_hashSecret = "HYMQTIAOKWLEOMPETRLNMSJHQBGBURUA";
const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

const vnpayPayment = async (req, res) => {
  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  // var config = require("config");
  // var dateFormat = require("dateformat");

  // instruction use dateformat lib instead of these code
  var date = new Date();
  var yyyy = date.getFullYear();
  var mm = date.getMonth() + 1;
  var dd = date.getDate();
  var HHmmss =
    "" +
    numberSmallerTen(date.getHours()) +
    numberSmallerTen(date.getMinutes()) +
    numberSmallerTen(date.getSeconds());
  var createDate =
    "" + yyyy + numberSmallerTen(mm) + numberSmallerTen(dd) + HHmmss;

  // var tmnCode = config.get("vnp_TmnCode");
  var tmnCode = vnp_TmnCode;
  // var secretKey = config.get("vnp_HashSecret");
  var secretKey = vnp_hashSecret;
  // var vnpUrl = config.get("vnp_Url");
  var vnpUrl = vnp_Url;
  // var returnUrl = config.get("vnp_ReturnUrl");
  var returnUrl = "http://localhost:3000/my-orders ";

  var orderId = req.body.orderId;
  var amount = req.body.amount;
  var bankCode = req.body.bankCode || "";

  var orderInfo = req.body.orderDescription;
  var orderType = req.body.orderType;
  var locale = req.body.language;
  if (!locale) {
    locale = "vn";
  }
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  return res.status(200).json({
    url: vnpUrl,
  });
};

const getVnpayIpn = async (req, res) => {
  var vnp_Params = req.query;
  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  var config = require("config");
  var secretKey = config.get("vnp_HashSecret");
  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    var orderId = vnp_Params["vnp_TxnRef"];
    var rspCode = vnp_Params["vnp_ResponseCode"];
    //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
    res.status(200).json({ RspCode: "00", Message: "success" });
  } else {
    res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
  }
};

const vnpayReturn = async (req, res) => {
  var vnp_Params = req.query;

  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  var config = require("config");
  var tmnCode = config.get("vnp_TmnCode");
  var secretKey = config.get("vnp_HashSecret");

  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

    res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
  } else {
    res.render("success", { code: "97" });
  }
};

module.exports = {
  checkout,
  paymentVerification,
  vnpayPayment,
  getVnpayIpn,
  vnpayReturn,
};
