const paymentDetail = require('../models/payment-detail');

module.exports.payments =async function(req, res){
    const someVariable = "nik@gmail.com"
    try {
        const results = await paymentDetail.find({});
        
        return res.render('payments', {
            title: "Pheonix restaurant | Payments",
            paymentLogs : results,
            something : someVariable,
        })
      } catch (err) {
        throw err;
      }
   
    
}