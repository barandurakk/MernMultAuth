const JWT = require('jsonwebtoken');
const mongoose = require("mongoose");
const passport = require('passport');
const User = mongoose.model("users");
const keys = require("../util/keys");

signToken = user => {
    return JWT.sign({
        iss: "CommercaSD",
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate()+10) //10 days expiration
    }, keys.jwtSecret);
}

module.exports = {

    signUp: async (req,res,next) => {
        const {email, password, name} = req.body;
        
        if(!email || !password || !name) {
            return res.status(400).json({error: "You have to indicate email, password and name!"});
        }

        // Check if there is a user with the same email
        let foundUser = await User.findOne({ "local.email": email });
        if (foundUser) { 
        return res.status(403).json({ error: 'Email is already in use'});
        }


        // Is there a Google account with the same email?
        foundUser = await User.findOne({  
             "google.email": email   
        });
        if(foundUser){
            console.log("HERE!");
            //link account
            foundUser.methods.push("local");
            foundUser.local = {
                email: email,
                password: password
            }
            await foundUser.save();
            //create token
            const token = signToken(foundUser);
            //respond
            res.status(200).send(token);
        }

        //create new user
        const newUser = new User({
            methods: ["local"],
            local:{
                email: email,
                password: password,
            },
            name: name,
            dateRegister: Date.now(),
        });

        await newUser.save();
        //create token
        const token = signToken(newUser);
        //respond
        res.status(200).send(token);
    },

    signIn: async (req,res,next) => {
        //create token
        const token = signToken(req.user);
        //respond
        res.status(200).send(token);
    },

    googleOAuth: async (req,res,next) => {
        //create token
        const token = signToken(req.user);
         //respond
         res.status(200).send(token);
    },

    linkGoogle: async (req,res,next) => {
        res.status(200).send({message: "Successfully linked account with Google"})
    },

    unlinkGoogle: async (req,res, next) => {
       
        if(req.user.google){
            req.user.google = undefined;
        }

        const googleMethod = req.user.methods.indexOf("google");
        if(googleMethod >= 0){
            req.user.methods.splice(googleMethod, 1);
        }
        await req.user.save();

        //respond
        res.json({
            success:true,
            methods: req.user.methods,
            message: "Succesfully unlinked account from Google!"
        });

    },

    getUser: async (req,res,next) => {
        res.send(req.user);
    }


}