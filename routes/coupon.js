const express = require('express')
const couponController = require('../controllers/coupon')


const router = express.Router()

router.get('/', couponController.getCoupon)

router.post('/create', couponController.createCoupon)

router.post('/discount', couponController.getDiscount)

module.exports = router