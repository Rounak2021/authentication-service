const express = require("express")
const citizen_Store = require("../Database/ItemDatabase");


const checkoutProduct = async (req, res) => {
    const { cartCode, cartDesc, citizenId, citizenEmailId, quantity } = req.body;
    try {
        const data = await citizen_Store.query(`SELECT * FROM citizen_cart_items WHERE cart_code= $1;`, [cartCode]); //Checking if user already exists
        const arr = data.rows;
        // if (arr.length != 0) {
        //     return res.status(200).json({
        //         error: "Product already registred. No need to add to database.",
        //     });
        // }
        // else {
            const user = {
                cartCode, 
                cartDesc, 
                citizenId, 
                citizenEmailId, 
                quantity
            };
            var flag = 1; //Declaring a flag

            //Inserting data into the database

            citizen_Store
                .query(`INSERT INTO citizen_cart_items (cart_code, cart_desc, citizen_id, citizen_email_id, quantity) VALUES ($1,$2,$3,$4,$5);`, [user.cartCode, user.cartDesc, user.citizenId, user.citizenEmailId, user.quantity], (err) => {

                    if (err) {
                        flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
                        console.error(err, user);
                        return res.status(500).json({
                            error: "Database error",
                            data: user
                        })

                    }
                    else {
                        flag = 1;
                        // res.status(200).send({ message: 'Product Added to database' });
                        res.status(200).send({
                            status: "200",
                            data: "SUCCESS",
                            message: "Product Added to database"

                        });
                    }
                })

        // }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registring product!", //Database connection error
        });
    };
}


const displayEachCitizenItems = async (req, res) => {
    const { storeId } = req.body;
    try {
        const data = await item_store.query(`SELECT * FROM store_items WHERE store_id= $1;`, [storeId]) //Verifying if the user exists in the database
        const user = data.rows;
        if (user.length === 0) {
            res.status(200).json({
                error: "Product not found. Please add it to database to proceed",
            });
        }
        else {

            res.status(200).json({
                status: "200",
                message: "SUCCESS",
                responseObject: user,

            });

        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error occurred while signing in!", //Database connection error
        });
    };
}
const displayAllCitizenItems = async (req, res) => {
    // const { storeId } = req.body;
    try {
        const data = await item_store.query(`SELECT * FROM store_items;`) //Verifying if the user exists in the database
        const user = data.rows;
        if (user.length === 0) {
            res.status(200).json({
                status: "200",
                message: "SUCCESS",
                responseObject: user,
            });
        }
        else {

            res.status(200).json({
                status: "200",
                message: "SUCCESS",
                responseObject: user,

            });

        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error occurred while signing in!", //Database connection error
        });
    };
}

module.exports = { checkoutProduct, displayEachCitizenItems, displayAllCitizenItems }