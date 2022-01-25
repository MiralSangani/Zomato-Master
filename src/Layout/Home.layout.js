import React from "react";
import Navbar from "../Components/Navbar/index";
import FoodTab from "../Components/FoodTab";

const HomeLayout = (props) => {

    return (
        <>
            <div>
                <Navbar />

                <div className="container mx-auto px-4 lg:px-20">
                    <FoodTab /></div>
            </div>



        </>
    )
};
export default HomeLayout;