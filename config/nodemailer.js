const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const { realpath } = require('fs');
let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smpt.gmail.com',
    port : '587',
    secure : 'false',
    auth : {
        user : 'nikhilrajbhar135@gmail.com',
        pass : '#1727zeroiqnik;:|'
    }
});
let renderTemplate = (data, ralativePath ) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log("err in rendering mailer" + err);
                return;
            }
            mailHTML =template;
        }
    )
    return mailHTML;

}
module.exports ={
    transporter : transporter,
    renderTemplate : renderTemplate
}