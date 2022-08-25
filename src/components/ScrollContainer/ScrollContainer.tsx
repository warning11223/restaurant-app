import React, {useRef} from 'react';
import {motion} from "framer-motion";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import Loader from "../Loader/Loader";
import FruitCard from "../FruitCard/FruitCard";
import {foodItem} from "../../models/types";

type PropsType = {
    items?: foodItem[];
    status?: string;
    flag?: boolean;
}

const ScrollContainer: React.FC<PropsType> = ({items, status, flag}) => {

    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollHandler = (scrollValue: number) => {
        if(scrollRef.current) {

            scrollRef.current.scrollLeft += scrollValue;
        }

    }

    return (
        <section className=' w-full mt-16 '>
            <div className='flex justify-between items-center'>

                {!flag &&
                    <div className='w-full'>
                        <div className='flex justify-between items-center '>
                            <div className='w-full ' id='fruits'>
                                <p className=' text-3xl text-headingColor capitalize before:content relative before:absolute before:w-32 before:h-1 before:rounded-lg before:bg-orange-400 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all duration-200 ease-in-out'>Our fresh & healthy fruits</p>
                            </div>
                           <div className=' gap-4 hidden md:flex'>
                               <motion.div
                                   whileTap={{scale: 0.7}}
                                   className='w-8 h-8 rounded-lg bg-orange-400 hover:bg-orange-500 transition-all cursor-pointer hover:shadow-md flex justify-center items-center text-white text-xl'
                                   onClick={() => scrollHandler(-300)}
                               >
                                   <FiArrowLeft />
                               </motion.div>

                               <motion.div
                                   whileTap={{scale: 0.7}}
                                   className='w-8 h-8 rounded-lg bg-orange-400 hover:bg-orange-500 transition-all cursor-pointer hover:shadow-md flex justify-center items-center text-white text-xl'
                                   onClick={() => scrollHandler(300)}
                               >
                                   <FiArrowRight />
                               </motion.div>
                           </div>
                        </div>
                    </div>
                }
            </div>
            <div
                className={`w-full my-8 py-4 bg-rowBg flex gap-4 md:gap-8 overflow-y-scroll scroll-smooth ${!flag ? ' scrollbar-none overflow-y-scroll ' : 'flex justify-center flex-wrap'}`}
                ref={scrollRef}
            >
                {status === 'pending' ?
                    <div className='flex justify-center items-center w-full'><Loader /></div> :
                    items && items?.map((item: any) => {
                        return <FruitCard key={item.id} {...item} flag={flag}/>
                    })


                }
            </div>

        </section>
    );
};

export default ScrollContainer;
