import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
    menus: [
        {
            name: { type: String, required: true },
            // item stands for img only in food
            items: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "Foods"
                }
            ]
        }
    ],
    //comes from the food ..like this food is comes from this this restro...objectid..- refred to the other schema
    recommended: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Foods",
            unique: true
        }
    ]
},
    {
        timestamps: true
    });

export const MenuModel = mongoose.model("Menus", MenuSchema);