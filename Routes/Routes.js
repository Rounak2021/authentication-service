const express = require("express");
const { login, register } = require("../User Controller/Usercontroller");
const { itemRegistration, displayEachItem, displayAllItems } = require("../User Controller/StoreItems");
const { checkoutProduct, displayEachCitizenItems, displayAllCitizenItems } = require("../User Controller/CitizenStoreItems");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/product-registration", itemRegistration);
router.post("/get-product", displayEachItem);
router.post("/get-all-products", displayAllItems);
router.post("/checkout-citizen-item", checkoutProduct);
router.post("/display-citizen-item", displayEachCitizenItems);
router.post("/display-all-citizen-item", displayAllCitizenItems);

module.exports = router
