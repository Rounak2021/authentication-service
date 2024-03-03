const express = require("express")
const item_store = require("../Database/ItemDatabase");


const itemRegistration = async (req, res) => {
    const { storeId, storeDesc, itemValidity, ItemSSICode } = req.body;
    try {
        const data = await item_store.query(`SELECT * FROM store_items WHERE store_id= $1;`, [storeId]); //Checking if user already exists
        const arr = data.rows;
        if (arr.length != 0) {
            return res.status(200).json({
                error: "Product already registred. No need to add to database.",
            });
        }
        else {
            const user = {
                storeId,
                storeDesc,
                itemValidity,
                ItemSSICode,
            };
            var flag = 1; //Declaring a flag

            //Inserting data into the database

            item_store
                .query(`INSERT INTO store_items (store_id, store_desc, item_validity, item_ssi_code) VALUES ($1,$2,$3,$4);`, [user.storeId, user.storeDesc, user.itemValidity, user.ItemSSICode], (err) => {

                    if (err) {
                        flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
                        console.error(err);
                        return res.status(500).json({
                            error: "Database error"
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

        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registring product!", //Database connection error
        });
    };
}


const displayEachItem = async (req, res) => {
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
const displayAllItems = async (req, res) => {
    // const { storeId } = req.body;
    try {
        const data = await item_store.query(`SELECT * FROM store_items;`) //Verifying if the user exists in the database
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

module.exports = { itemRegistration, displayEachItem, displayAllItems }