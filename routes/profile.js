const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");
const authorization = require("../middleware/auth")
const { check } = require('express-validator');
router.get("", authorization, profileController.allProfile);
router.get("/:id" ,authorization,profileController.getprofileById);
router.post("/",
  [
    check('firstName').isLength({ min: 4 }).withMessage('firstname must be atleast 4 character long'),
    check('lastName').optional().isLength({ min: 2 }),
    check('email').isEmail().withMessage('E-mail must be a valid email'),

  ], authorization,
  profileController.createProfile);
router.delete("/:id", authorization, profileController.deleteProfile);
router.patch("/:id", authorization, profileController.updateProfile);
module.exports = router;
