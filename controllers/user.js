const User = require("../models/user");
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const getUser = async (req, res, next) => {
    try {
        const allUser = await User.find();
        res.status(200).json({ user: allUser });
    } catch (err) {
        const error = new Error("no user found");
        error.status = 404;
        next(error);
    }
};
const userSignup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0].msg });
    }
    try {
        const { name, email, password } = req.body;
        const newuser = {
            name, email, password
        }
        const userExist = await User.findOne({ email });
        if (userExist) {
            // return res.status(222).json({error:"user already exist"})
            const error = new Error("User already exist");
            error.status = 222;
            next(error);
        }
        // used to hashed password for encryption
        let hashedpassword = await bcrypt.hash(password, 12)
        // Store hash in your password DB.
        newuser.password = hashedpassword;
        const createdUser = await new User(newuser)
        await createdUser.save();
        let token = jwt.sign({ userId: createdUser.id, email: createdUser.email }, 'super-secet-text', { expiresIn: 60 * 60 });

        res.status(201).json({ id: createdUser.id, email: createdUser.email, token })
    }
    catch (err) {
        // console.log(err)
        const error = new Error("Something went wrong");
        error.status = 500;
        next(error);
    }
};
const userLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0].msg });
    }
    try {
        const { email, password } = req.body;
        const user = {
            email,
            password
        }
        const userExist = await User.findOne({ email })
        if (!userExist) {
            // return res.status(404).json({error:"No user Exist pls register"})
            const error = new Error("No user Exist pls register");
            error.status = 404;
            next(error);
        }
        let authorized = await bcrypt.compare(password, userExist.password)
        if (userExist && !authorized) {
            // return res.status(401).json({error:"invalid credentials"})
            const error = new Error("invalid credentials");
            error.status = 401;
            next(error);
        }
        let token = jwt.sign({ userId: userExist.id, email: userExist.email }, 'super-secet-text', { expiresIn: 60 * 60 });

        res.status(200).json({ id: userExist.id, email: userExist.email, token: token, expiresIn: (new Date().getTime()) })
    }
    catch (err) {
        console.log(err)
    }
};

module.exports = {
    getUser,
    userSignup,
    userLogin

}
