
const mongoose = require('mongoose')

//shcema design
const couponCodes = mongoose.Schema({
    minAmount: { type: Number, require: true },
    maxAmount: { type: Number, require: true },
    code: { type: String, require: true, unique: true },
    startDate: { type: Date, require: true },
    endDate: { type: Date, require: true },
    flatDiscount: { type: Number },
    percentDiscount: { type: Number }
})

exports.Coupon = mongoose.model("Coupons", couponCodes)
