import React from 'react';
import img from "../../static/images/f1.png";
import {motion} from "framer-motion";
import {FiMinus, FiPlus} from "react-icons/fi";
import { foodItem} from "../../models/types";
import {useAppDispatch} from "../../state";
import {decreaseItems, increaseItems} from "../../state/slices/cartSlice";


const CartItem: React.FC<foodItem> = ({id, price, title, category, qty, imageURL, calories}) => {
     const dispatch = useAppDispatch();

     const onIncrease = () => {
        dispatch(increaseItems(id));
     }

     const onDecrease = () => {
        dispatch(decreaseItems(id));
     }

    return (
        <div className='rounded-lg bg-cartItem p-3 flex justify-between '>
            <div className=''>
                <img src={imageURL!} alt={title} className='w-28 h-28 object-contain'/>
            </div>
            <div className='text-white flex justify-center gap-2 items-start flex-col'>
                <p className='text-md '>{title}</p>
                <p>$ <b>{price}</b></p>
            </div>
            <div className='flex items-center justify-center gap-3 text-white text-2xl'>
                <motion.button
                    whileTap={{scale: 0.7}}
                    onClick={onDecrease}
                ><FiMinus /></motion.button>
                <p className='bg-cartBg py-1 px-2'>{qty}</p>
                <motion.button
                    whileTap={{scale: 0.7}}
                    onClick={onIncrease}
                ><FiPlus /></motion.button>
            </div>
        </div>
    );
};

export default CartItem;
