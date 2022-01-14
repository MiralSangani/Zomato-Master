import express from "express";
import { FoodModel } from "../../../database/food";
import { ValidateRestaurantId, ValidateCategory } from "../../../validation/food";
const Router = express.Router();


/*
Route       /
Desc        Get all the foods based on particular restaurant
Params      _id
Access      Public
Method      GET
*/

Router.get("/:id", async (req, res) => {
    try {
        await ValidateRestaurantId(req.params);
        const { _id } = req.params;
        const foods = await FoodModel.find({ restaurant: _id })/*not findone bcz there is lot of food*/
        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
});

/*
Route       /r
Desc        Get all the foods based on particular category
Params      category
Access      Public
Method      GET
*/
Router.get("/r/:category", async (req, res) => {
    try {
        await ValidateCategory(req.params);
        const { category } = req.params;
        const foods = await FoodModel.find({
            //find category in our list using only keywords...any matching name keywords 
            category: { $regex: category, $options: "i" }/*i= insensitive letter like preeety flexible search finding certain things -lower upper case */
        });
        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
});
export default Router;