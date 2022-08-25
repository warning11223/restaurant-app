import {motion} from 'framer-motion';
import React from 'react';
import {FaArrowLeft} from "react-icons/fa";
import {AiOutlineClear} from "react-icons/ai";
import {useAppDispatch, useAppSelector} from "../../state";
import {deleteItems, hideCart} from "../../state/slices/cartSlice";
import CartItem from "./CartItem";
import emptyCard from '../../static/images/emptyCart.svg'


const CartContainer = () => {
    const dispatch = useAppDispatch();
    const { showCart, subTotal, cartItems } = useAppSelector(state => state.cart);

    const deliveryPrice = 5;

    const onCloseHandler = () => {
        dispatch(hideCart());
    }

    const onDeleteHandler = () => {
        dispatch(deleteItems());
    }



    return (
       <>
           {
               showCart &&
               <motion.div
                   className='fixed w-full px-5 md:px-0 md:w-[475px] h-screen top-0 right-0 z-[101] drop-shadow-md backdrop-blur-md'
                   initial={{opacity: 0, x: 200}}
                   animate={{opacity: 1, x: 0}}
                   exit={{opacity: 0, x: 200}}
               >
                   <div className='p-5 h-auto flex justify-between'>
                       <motion.div
                           whileTap={{scale: 0.9}}
                       >
                           <FaArrowLeft
                               className='text-3xl cursor-pointer'
                               onClick={onCloseHandler}
                           />
                       </motion.div>
                       <div>
                           <p className='uppercase text-headingColor text-3xl'>Cart</p>
                       </div>
                       <motion.button
                           whileTap={{scale: 0.9}}
                           type='button'
                           className='py-2 px-4 -mt-1 bg-black text-white flex justify-center items-center rounded-lg'
                           onClick={onDeleteHandler}
                       ><AiOutlineClear className='text-3xl'/></motion.button>
                   </div>
                   {
                       cartItems.length > 0 ?
                           <>
                               <div className='h-[72%] lg:h-full bg-cartBg rounded-t-[2rem] '>
                                   <div className='flex flex-col justify-between h-full'>
                                       <div className='w-full flex flex-col justify-between overflow-x-scroll scrollbar-none gap-4  p-8'>

                                           {cartItems.map(item => {
                                               return <CartItem key={item.id} {...item}/>
                                           })}

                                       </div>

                                       <div className='h-auto md:mb-[80px] rounded-t-[2rem] bg-cartTotal w-full py-5 px-8'>
                                           <div className='flex flex-col gap-6'>
                                               <div className='flex justify-between text-cardOverlay text-2xl font-light'>
                                                   <p>Sub total:</p>
                                                   <p>$ <b>{subTotal}</b></p>
                                               </div>
                                               <div className='flex justify-between text-cardOverlay text-2xl font-light'>
                                                   <p>Delivery:</p>
                                                   <p>$ <b>{subTotal ? deliveryPrice : 0}</b></p>
                                               </div>
                                               <hr className='h-[1px] bg-cardOverlay border-none'/>
                                               <div className='flex justify-between text-primary text-2xl font-light   '>
                                                   <p>Total:</p>
                                                   <p>$ <b>{subTotal ? subTotal + deliveryPrice : 0}</b></p>
                                               </div>
                                               <div className='flex justify-between items-center text-center'>
                                                   <motion.button whileTap={{scale: 0.9}} className='w-full bg-orange-500 py-4 rounded-lg text-white text-2xl uppercase'>Order</motion.button>
                                               </div>
                                           </div>
                                       </div>
                                   </div>

                               </div>
                           </>
                           :
                           <div className='flex flex-col justify-center items-center  h-[72%]'>
                               <img src={emptyCard} alt="emptyCard" className='w-[400px]'/>
                               <p className=' mt-6 text-2xl '>Add some items to your cart</p>
                           </div>
                   }
               </motion.div>
           }
       </>
    );
};

export default CartContainer;
