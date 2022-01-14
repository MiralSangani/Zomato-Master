import express from "express";
import { RestaurantModel } from "../../../database/restaurant";
import { ValidateRestaurantId } from "../../../validation/food";

import { ValidateRestaurantCity, ValidateRestorantSearchSring } from "../../../validation/restaurant";
import { ValidateRestaurantId } from "../../../validation/food";
const Router = express.Router();


/*
Route       /
Desc        Get all the restaurant details
Params      none
Access      Public
Method      GET
*/

Router.get("/", async (req, res) => {
    try {
        await ValidateRestaurantCity(req.query);
        const { city } = req.query;
        const restaurants = await RestaurantModel.find({ city });/*not findone bcz there is lot of food*/
        return res.json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
});

/*
Route       /
Desc        get a particular restaurant details based on id
Params      /id
Access      Public
Method      GET
*/
Router.get("/:id", async (req, res) => {
    try {
        await ValidateRestaurantId(req.params);
        const { _id } = req.params;
        const restaurant = await RestaurantModel.findOne(_id);
        return res.json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
});
export default FoodModel;

/*
Route       /search
Desc        get a particular restaurant details based on id
Params      searchString
Access      Public
Method      GET
*/
Router.get("/search", async (req, res) => {
    try {
        await ValidateRestorantSearchSring(req.body)
        const { searchString } = req.body;
        const restaurant = await RestaurantModel.find({
            //find category in our list using only keywords...any matching name keywords 
            name: { $regex: searchString, $options: "i" }/*i= insensitive letter like preeety flexible search finding certain things -lower upper case */


        });
        return res.json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
});
export default Router;