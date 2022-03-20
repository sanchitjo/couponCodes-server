const {Coupon} = require("../models/coupon")

async function getCoupon(req, res, next) {
    try {
        const couponList =  await Coupon.find() 
        res.json(couponList)
    } catch (error) {
        next(error)
        console.log(error)
    }
}

async function createCoupon(req, res, next) {
    
    try {
        const coupon = new Coupon({
            minAmount: req.body.minAmount,
            maxAmount: req.body.maxAmount,
            code: req.body.code,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            flatDiscount: req.body.flatDiscount,
            percentDiscount: req.body.percentDiscount
            
        })
        await coupon.save();
    
        res.json(coupon)
    } catch (error) {
        next(error)
        console.log(error)
    }
}

async function getDiscount(req, res, next) {
    
    try {
        const totalAmount = req.body.totalAmount;
        const couponCode = req.body.couponCode;
        console.log(couponCode, "couponCode")
        const coupon =  await Coupon.findOne({"code": couponCode}) 
        console.log(coupon, "coupon")
        if(!coupon){
            return (res.json({
                valid : false
            }))
        }
        const today = new Date()
        if(today < coupon.startDate || today > coupon.endDate){
            return (res.json({
                valid : false
            }))
        } 
        // let discount = 0;
        if(coupon.flatDiscount){
            // discount = totalAmount - coupon.flatDiscount
            
            return (res.json({
                valid: true,
                discount: coupon.flatDiscount
            }))
        }else{
            const percentDiscount = totalAmount * coupon.percentDiscount / 100
            if(percentDiscount > coupon.maxAmount){
                return(res.json({
                    valid: true,
                    discount: coupon.maxAmount
                }))
            }else{
                return(res.json({
                    valid: true,
                    discount: percentDiscount
                }))
            }
        }

    } catch (error) {
        next(error)
        console.log(error)
    }
}


module.exports = {
    getCoupon, 
    createCoupon, 
    getDiscount
}