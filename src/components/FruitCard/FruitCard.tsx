import React from 'react';
import {motion} from "framer-motion";
import {GiBasket} from "react-icons/gi";
import {foodItem} from "../../models/types";
import {useAppDispatch} from "../../state";
import {addToCart} from "../../state/slices/cartSlice";

type PropsType = {
    flag?: boolean

}

const FruitCard: React.FC<foodItem & PropsType> = ({calories, id, imageURL, qty, price, title, category, flag}) => {
    const dispatch = useAppDispatch();
    const onCartAddHandler = (id: string) => {
        const item = {
            calories,
            imageURL,
            title,
            price,
            qty,
            id,
            category
        }
        dispatch(addToCart(item));
    }

    return (
            <div
                className={`w-300 min-w-[300px] md:w-350 md:min-w-[340px] h-auto p-2 rounded-lg bg-white hover:bg-cardOverlay shadow-md hover:shadow-lg transition-all backdrop-blur-lg flex flex-col justify-between ${!flag ? ' my-12' : 'my-2'}`}
                onClick={() => onCartAddHandler(id)}
            >
                <div className='flex justify-between items-center '>
                    <motion.img
                        src={imageURL!} alt={title}
                        className='w-40 -mt-10 md:w-44 drop-shadow-2xl object-contain w-[200px] h-[250px]'
                        whileHover={{scale: 1.1}}
                    />
                    <motion.div
                        className='w-10 h-10 rounded-full bg-red-500 flex justify-center items-center text-white text-xl cursor-pointer hover:bg-red-400 transition-all ease-in duration-200'
                        whileTap={{scale: 0.6}}
                    >
                        <GiBasket />
                    </motion.div>
                </div>
                <div className='flex flex-col justify-center items-end gap-2'>
                    <p className='text-headingColor text-xl'>{title}</p>
                    <p className='text-textColor text-md'>{calories} Calories</p>
                    <p className='text-red-600 text-md'>$ <b className='text-gray-900'>{price}</b></p>
                </div>
            </div>
    );
};

export default FruitCard;
