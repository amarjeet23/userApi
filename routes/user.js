const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { check } = require("express-validator");
router.get("", userController.getUser);
router.post(
	"/signup",
	[
		check("name")
			.isLength({ min: 4 })
			.withMessage("firstname must be atleast 4 character long"),
		check("email").isEmail().withMessage("E-mail must be a valid email"),
		check("password")
			.isLength({ min: 5 })
			.withMessage("must be at least 5 chars long")
			.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
			.withMessage(
				"Password must include one lowercase,one uppercase,a number,and a special character."
			)
	],
	userController.userSignup
);
router.post(
	"/login",
	[
		check("email").isEmail().withMessage("E-mail must be a valid email"),
		check("password")
			.isLength({ min: 5 })
			.withMessage("must be at least 5 chars long")
	],
	userController.userLogin
);
module.exports = router;
