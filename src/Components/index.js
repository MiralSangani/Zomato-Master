import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GiScooter, GiKnifeFork } from "react-icons/gi";
import { IoBeerOutine } from "react-icons/io5"
const MobileTab = () => {

    const [allType, setAllType] = useState([
        {
            id: delivery,
            icon: <GiScooter />,
            name: Delivery,
            asActive: false
        },
        {
            id: night,
            icon: <IoBeerOutine />,
            name: "Night Life",
            asActive: false
        },
        {
            id: dining,
            icon: <GiKnifeFork />,
            name: "Dining Out",
            asActive: false
        }
    ]);
    const { type } = useParams();/*bcz return the entire obj switch the routes to be randered here we have the entire thing in one object format ,here we have to certain object we wnt  particular obj to be return ,it is basically return towards the prticlr obj relative to which yr try to randr out  */
    return (
        <>
            <div className="lg:hidden bg-white shadow-lg p-3 fixed bottom-0 z-10 w-full flex item-center justify-between text-gray-500 border ">
                {allType.map((items) => (
                    <Link to={`/${items.id}`}>/*rander it to which route - id base*/
                        <div className={
                            type === items.id
                                ? "flex-col items-center text-xl relative text-zomato-500"
                                : "flex-col items-center text-xl "
                        }>
                            /*this siv for txt clr ---- randering it for the prticulr condition - becomr a red if it matching to the items it otherwise blk clr  */

                            <div className={
                                type === items.id && "absolute -top-3 w-full h-2 border-zomato-500"/*no clss thn no ternary operation n there is && op.  */

                            }>{items.icon}/*2nd this div for top-border clr */
                                <h5 className="text-sm">{items.name}</h5>
                            </div>
                        </div>
                    </Link>
                ))
                }
            </div>
        </>
    );
};
const FoodTab = () => {
    return (
        <>
            <div>
                <MobileTab />
            </div>
        </>
    );
};
export default FoodTab;