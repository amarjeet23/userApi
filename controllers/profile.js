const Profile = require("../models/profile");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
var ObjectId = require('mongoose').Types.ObjectId;
const getprofileById = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array()[0].msg });
        }
        let Id = (req.params.id).trim();
        if (!ObjectId.isValid(`${Id}`)) {
            const error = new Error("please provide a valid id");
            error.status = 422;
            next(error);
        }

        // var id = mongoose.Types.ObjectId(Id);
        const profile = await Profile.findById(Id);
        if (!profile) {
            const error = new Error("No profile found");
            error.status = 404;
            next(error);
        }
        res.json(profile);
    } catch (err) {
        const error = new Error("Something went wrong..!");
        error.status = 500;
        next(error);
    }
};
const allProfile = async (req, res, next) => {
    try {
        const profile = await Profile.find({});
        return res.status(200).json({ profile });
    } catch (err) {
        const error = new Error("internal server error..");
        error.status = 500;
        next(error);
    }
};
const createProfile = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0].msg });
    }
    try {
        const { firstName, lastName, email } = req.body;
        const createdProfile = {
            firstName,
            lastName,
            email
        };
        const profileExist = await Profile.findOne({ email })
        if (profileExist) {
            const error = new Error("profile with this email already exist");
            error.status = 422;
            next(error);

        }
        const newProfile = await new Profile(createdProfile);
        await newProfile.save();
        res.status(201).json({ profile: newProfile });
    } catch (err) {
        const error = new Error("Something went wrong in creating profile");
        error.status = 500;
        next(error);
    }
};
const deleteProfile = async (req, res, next) => {
    try {
        let Id = (req.params.id).trim();
        if (!ObjectId.isValid(`${Id}`)) {
            const error = new Error("please provide a valid id");
            error.status = 422;
            next(error);
        }
        const profile = await Profile.findByIdAndDelete(Id);
        if (!profile) {
            const error = new Error("No profile exist to delete");
            error.status = 404;
            next(error);
        }
        res.json({ msg: "Profile Deleted Successfully" });
    } catch (err) {
        const error = new Error("Something went wrong in deleting profile");
        error.status = 500;
        next(error);
    }
};
const updateProfile = async (req, res, next) => {
    try {
        let id = (req.params.id).trim();
        if (!ObjectId.isValid(`${id}`)) {
            const error = new Error("please provide a valid id");
            error.status = 422;
            next(error);
        }
        const { firstName, lastName, email } = req.body;
        const profileToUpdate = await Profile.findByIdAndUpdate(
            id,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            },
            { new: true }
        );
        if (!profileToUpdate) {
            const error = new Error("No profile exist to update");
            error.status = 404;
            next(error);
        }
        res.json({ msg: "Profile updated successfully", data: profileToUpdate });
    } catch (err) {
        const error = new Error("Something went wrong");
        error.status = 500;
        next(error);
    }
};
module.exports = {
    getprofileById,
    createProfile,
    deleteProfile,
    updateProfile,
    allProfile
};
