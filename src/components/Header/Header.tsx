import React, {useState} from 'react';

import logo from '../../static/images/logo.png'
import avatar from '../../static/images/avatar.png'
import {IoIosBasket} from "react-icons/io";
import {motion} from "framer-motion"
import {Link} from "react-router-dom";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {app} from "../../firebase.config";
import {useAppDispatch, useAppSelector} from "../../state";
import {clearConfig, userConfig} from "../../state/slices/userSlice";
import {MdLogout, MdOutlineAdd} from "react-icons/md";
import {showCart} from "../../state/slices/cartSlice";


const Header = () => {
    const [menuPopup, setMenuPopup] = useState(false);

    const dispatch = useAppDispatch();
    const { user, cart } = useAppSelector(state => state);
    const { userData } = user;
    const { cartItems } = cart;

    const amountItems = cartItems.reduce((acc, item) => {
        return acc += item.qty;
    }, 0)

    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const authHandler = async () => {
       if(!userData.accessToken) {
           try {
               const {user} = await signInWithPopup(auth, provider);
               dispatch(userConfig(user));
           } catch (e) {
               throw new Error();
           }
       } else {
           setMenuPopup(!menuPopup);
       }
    }

    const logoutHandler = () => {
        setMenuPopup(false);
        dispatch(clearConfig());
    }

    const showCartHandler = () => {
        dispatch(showCart());
    }

    return (
        <header className=' fixed z-50 w-screen backdrop-blur-md  '>
            {/*==============================desktop*======================================*/}
            <div className='hidden md:flex justify-between w-full h-full p-4 px-16'>
                <Link to='/' className='flex items-center gap-2'>
                    <img src={logo} alt="logo" className='w-10 object-cover'/>
                    <p className='text-2xl font-bold'>City</p>
                </Link>
                <div className='relative flex items-center'>
                    <motion.ul
                        initial={{opacity: 0, x: 200}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: 200}}
                        className='flex items-center gap-8 '
                    >
                        <li><a href="#" className='text-xl transition-all hover:text-headingColor duration-200 ease-out text-textColor'>Home</a></li>
                        <li><a href="#" className='text-xl transition-all hover:text-headingColor duration-200 ease-out text-textColor'>Menu</a></li>
                        <li><a href="#" className='text-xl transition-all hover:text-headingColor duration-200 ease-out text-textColor'>About</a></li>
                        <li><a href="#" className='text-xl transition-all hover:text-headingColor duration-200 ease-out text-textColor'>Service</a></li>
                    </motion.ul>
                    <div
                        className='relative right-0 flex justify-center items-center text-3xl ml-10 '
                        onClick={showCartHandler}
                    >
                        <IoIosBasket className='cursor-pointer text-textColor hover:text-headingColor transition-all' />
                        {cartItems.length > 0 &&
                            <motion.div
                                className='absolute -top-1 right-0.5 h-6 w-6 rounded-full bg-cartNumBg flex justify-center items-center cursor-pointer'
                                initial={{scale: 0.6}}
                                animate={{scale: 1}}
                            >
                                <motion.p
                                    className='font-bold text-sm text-primary '
                                    initial={{scale: 0.6}}
                                    animate={{scale: 1}}
                                >{amountItems}</motion.p>
                            </motion.div>
                        }
                    </div>
                    <motion.img
                        whileTap={{scale: 0.8}}
                        src={userData.photoURL ? userData.photoURL : avatar}
                        alt="avatar"
                        className='w-10 h-10 ml-10 min-w-[40px] min-h-[40px] rounded-full text-center items-center drop-shadow-xl cursor-pointer'
                        onClick={authHandler}
                    />
                    {
                        menuPopup &&
                        <motion.div
                            initial={{opacity: 0, scale: 0.6}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.6}}
                            className='absolute -right-10 top-14 rounded-md bg-gray-300 text-xl'
                        >
                            {
                                userData.email === 'warning11223@gmail.com' &&
                                <Link
                                    to='/create'
                                    className='px-6 py-3 flex items-center gap-2 hover:bg-gray-400 rounded-md cursor-pointer transition-all text-textColor duration-200 ease-in '
                                    onClick={() => setMenuPopup(false)}
                                ><MdOutlineAdd />Add item</Link>

                            }
                            <p
                                className='px-6 py-3 flex items-center gap-2 hover:bg-gray-400 rounded-md cursor-pointer transition-all text-textColor duration-200 ease-in '
                                onClick={logoutHandler}
                            ><MdLogout />Logout</p>
                        </motion.div>

                    }
                </div>
            </div>
            {/*===============================================mobile===============================================*/}
            <div className='flex justify-between md:hidden w-full h-full p-5'>
                <div
                    className='relative right-0 flex justify-center items-center text-3xl '
                    onClick={showCartHandler}
                >
                    <IoIosBasket className='cursor-pointer text-textColor hover:text-headingColor transition-all' />
                    {cartItems.length > 0 &&
                        <motion.div
                            className='absolute -top-1 right-0.5 h-6 w-6 rounded-full bg-cartNumBg flex justify-center items-center cursor-pointer'
                            initial={{scale: 0.6}}
                            animate={{scale: 1}}
                        >
                            <p className='font-bold text-sm text-primary '>{amountItems}</p>
                        </motion.div>
                    }
                </div>
                <Link to='/' className='flex items-center gap-2 '>
                    <img src={logo} alt="logo" className='w-10 object-cover'/>
                    <p className='text-2xl font-bold'>City</p>
                </Link>
                <motion.img
                    whileTap={{scale: 0.8}}
                    src={userData.photoURL ? userData.photoURL : avatar}
                    alt="avatar"
                    className='w-10 h-10 ml-10 min-w-[40px] min-h-[40px] rounded-full text-center items-center drop-shadow-xl cursor-pointer'
                    onClick={authHandler}
                />
                {
                    menuPopup &&
                    <motion.div
                        initial={{opacity: 0, scale: 0.6}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0.6}}
                        className='absolute right-5 top-16 rounded-md bg-white '
                    >
                        {
                            userData.email === 'warning11223@gmail.com' &&
                            <Link
                                to='/create'
                                className='px-4 py-2 flex items-center gap-2 hover:bg-gray-400 rounded-md cursor-pointer transition-all text-textColor duration-200 ease-in '
                                onClick={() => setMenuPopup(false)}
                            ><MdOutlineAdd />Add item</Link>

                        }
                        <ul
                            className='flex flex-col gap-1'
                        >
                            <li
                                className='hover:bg-gray-400 rounded-md cursor-pointer transition-all text-textColor duration-200 ease-in px-4 py-2'
                            ><a href="#" className='text-xl transition-all hover:text-headingColor duration-200 ease-out text-textColor '
                                onClick={() => setMenuPopup(false)}
                            >Home</a></li>
                            <li
                                className='hover:bg-gray-400 rounded-md cursor-pointer transition-all text-textColor duration-200 ease-in px-4 py-2'
                            ><a href="#" className='text-xl transition-all hover:text-headingColor duration-200 ease-out text-textColor'
                                onClick={() => setMenuPopup(false)}
                            >Menu</a></li>
                            <li
                                className='hover:bg-gray-400 rounded-md cursor-pointer transition-all text-textColor duration-200 ease-in px-4 py-2'
                            ><a href="#" className='text-xl transition-all hover:text-headingColor duration-200 ease-out text-textColor'
                                onClick={() => setMenuPopup(false)}
                            >About</a></li>
                            <li
                                className='hover:bg-gray-400 rounded-md cursor-pointer transition-all text-textColor duration-200 ease-in px-4 py-2'
                            ><a href="#" className='text-xl transition-all hover:text-headingColor duration-200 ease-out text-textColor'
                                onClick={() => setMenuPopup(false)}
                            >Service</a></li>
                        </ul>
                        <p
                            className='px-6 py-3 flex items-center gap-2 hover:bg-gray-400 rounded-xl cursor-pointer transition-all text-textColor duration-200 ease-in bg-gray-300 m-2 shadow-md'
                            onClick={logoutHandler}
                        ><MdLogout />Logout</p>
                    </motion.div>

                }



            </div>
        </header>
    );
};

export default Header;


