const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const Razorpay = require('razorpay');
const PaymentDetail = require('../models/payment-detail');
const { nanoid } = require("nanoid");
console.log('router loaded');


router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/admin', require('./admin'));
router.use('/pages', require('./pages'));
// router.use('/api',require('./api'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));

// Create an instance of Razorpay
let razorPayInstance = new Razorpay({
	key_id: process.env.KEY_ID,
	key_secret: process.env.KEY_SECRET,
});

/**
 * Make Donation Page
 * 
 */
// router.get('/', function(req, res, next) {
// 	// Render form for accepting amount
// 	res.render('pages/payment/order', { 
// 		title: 'Donate for Animals'
// 	});
// });

/**
 * Checkout Page
 * 
 */
router.post('/order', function (req, res, next) {

	var foodAmount = req.body.food;
	// console.log(req.body.address);
	let orderAdress = req.body.address;
	
  let totalAmount = 0;
const arrOfNum = foodAmount.map(str => {
  return Number(str);
});

	for (let i = 0; i < arrOfNum.length; i++) {
		
		totalAmount = totalAmount + arrOfNum[i];

	}
    console.log(totalAmount);

	var options = {
		amount: totalAmount * 100,  // amount in the smallest currency unit
		currency: "INR",
		receipt: nanoid(),
		
	};
	razorPayInstance.orders.create(options)

		.then(async (response) => {
			console.log('at line 40');
			const razorpayKeyId = process.env.KEY_ID
			// Save orderId and other payment details
			// console.log("payment details" + response);
			const paymentDetail = new PaymentDetail({
				orderId: response.id,
				receiptId: response.receipt,
				amount: response.amount,
				currency: response.currency,
				createdAt: response.created_at,
				status: response.status,
				address : orderAdress

			})
			try {
				console.log("at line 51");
				// Render Order Confirmation page if saved succesfully
				await paymentDetail.save()
				res.render('pages/payment/checkout', {
					title: "Confirm Order",
					razorpayKeyId: razorpayKeyId,
					paymentDetail: paymentDetail
				})
			} catch (err) {
				// Throw err if failed to save
				if (err) throw err;
			}
		}).catch((err) => {
			// Throw err if failed to create order
			if (err) throw err;
		})
});

/**
 * Verify Payment
 * 
 */
router.post('/verify', async function (req, res, next) {
	body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
	let crypto = require("crypto");
	let expectedSignature = crypto.createHmac('sha256', process.env.KEY_SECRET)
		.update(body.toString())
		.digest('hex');

	// Compare the signatures
	if (expectedSignature === req.body.razorpay_signature) {
		// if same, then find the previosuly stored record using orderId,
		// and update paymentId and signature, and set status to paid.
		await PaymentDetail.findOneAndUpdate(
			{ orderId: req.body.razorpay_order_id },
			{
				paymentId: req.body.razorpay_payment_id,
				signature: req.body.razorpay_signature,
				status: "paid"
			},
			{ new: true },
			function (err, doc) {
				// Throw er if failed to save
				if (err) {
					throw err
				}
				// Render payment success page, if saved succeffully
				res.render('pages/payment/success', {
					title: "Payment verification successful",
					paymentDetail: doc
				})
			}
		);
	} else {
		res.render('pages/payment/fail', {
			title: "Payment verification failed",
		})
	}
});


module.exports = router;