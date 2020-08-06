const User=require('../models/user');
var CryptoJS = require("crypto-js");
const secretKey = '<SECRET-KEY>';
const request = require('request');

//user profile page
module.exports.profile=function(req,res){
    res.render('user_profile');
}

//render the sing Up page
module.exports.signUp=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up');
}

//render sign-in page
module.exports.signIn=function(req,res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    return res.render('user_sign_in');
}

//destroys the session when user clicks logout
module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','You have logged out');
    return res.redirect('/');
}

//create user
module.exports.create=async function(req,res){

    if(req.body.password!=req.body.confirm_password){
        req.flash('error','passwords dont match');
        console.log("Please enter again");
        return res.redirect('back');
    }
    const existingUser=await User.findOne({email: req.body.email});

    if(existingUser==null){
        //encrypting password before creating of the record
        let userObject={};
        userObject.username=req.body.username;
        userObject.password=CryptoJS.AES.encrypt(req.body.password, 'authentication').toString();
        userObject.email=req.body.email;
        const user=await User.create(userObject);
        return res.redirect('/users/sign-in');
    }
    else{
        console.log("User already present");
        res.redirect('back');
    }
}

//create session
module.exports.createSession=function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/users/profile');
}

//action for resetting password
module.exports.resetPassword=function(req,res){
    if(!req.isAuthenticated()){
        req.flash('error','Please sign in');
        return res.redirect('back');
     }
    return res.render('reset-password');
}

//updating password after user clicks reset password button in resetpassword form
module.exports.updatePassword=function(req,res){

    if(req.body.password!=req.body.confirm_password){
        req.flash('error','passwords do not match');
        return res.redirect('back');
    }

    //encrypting password before updating
    let user=User.findByIdAndUpdate(req.body.user_id, {password: CryptoJS.AES.encrypt(req.body.password, 'authentication').toString()}, function(err){
        if(err){
            console.log("Error in updating the password");
            return;
        }
    });
    req.flash('success','password upated succesffuly');
    return res.redirect('/users/profile');
}

module.exports.captcha=function(req,res){
    if(!req.body.captcha){
        console.log("err");
        return res.json({"success":false, "msg":"Capctha is not checked"});
       
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;

    request(verifyUrl,(err,response,body)=>{

        if(err){console.log(err); }

        body = JSON.parse(body);

        if(!body.success && body.success === undefined){
            return res.json({"success":false, "msg":"captcha verification failed"});
        }
        else if(body.score < 0.5){
            return res.json({"success":false, "msg":"not a human!", "score": body.score});
        }
        
            // return json message or continue with your function. Example: loading new page, ect
            return res.json({"success":true, "msg":"captcha verification passed", "score": body.score});

    })

}
