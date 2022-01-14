import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    descript: { type: String, required: true },
    isVeg: { type: Boolean, required: true },
    isContainsEgg: { type: Boolean, required: true },
    category: { type: String, required: true },
    // refer to image ..in image schema there is image so not prepare the img schema for all soo thats y this photo....is there in partricular img schema so refering to the img schema
    photos: {
        type: mongoose.Types.ObjectId,
        ref: "Images"
    },

    price: { type: Number, default: 150, required: true },
    // extra thing which u want to add ...like app or website are shown instead of u buy pizzaa n all that this pestry is there if u want to buy n all...srlf prefrence..join in sql 
    addOns: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Foods"
        }
    ],
    // object id - bcz u hv a restaurant schema  so tht...
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: "Restaurants",
        required: true
    }
},
    // in idian std time ...us std time...showing order done time
    {
        timestamps: true
    });

export const FoodModel = mongoose.model("Foods", FoodSchema);