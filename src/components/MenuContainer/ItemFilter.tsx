import { motion } from 'framer-motion';
import React from 'react';
import {BiDish} from "react-icons/bi";

type PropsType = {
    paramName: string;
    active: string;
    setActive: (paramName: string) => void

}

const ItemFilter: React.FC<PropsType> = ({paramName, active, setActive}) => {

    return (
        <motion.div
            whileTap={{scale: 0.6}}
            className={`w-24 min-w-[94px] group rounded-lg  h-28  flex flex-col items-center justify-around hover:bg-red-600 transition-all cursor-pointer hover:text-white shadow-lg ${active === paramName ? ' bg-red-600 text-white' : 'bg-cardFilter text-headingColor'}`}
            onClick={() => setActive(paramName)}
        >
            <div className={`w-8 h-8 rounded-full flex justify-center items-center group-hover:bg-cardFilter transition-all ${active === paramName ? ' bg-cardFilter' : ' bg-red-600 '}` }>
                <BiDish className={`text-xl group-hover:text-headingColor ${active === paramName ? ' text-headingColor' : ' text-white'}`}/>
            </div>
            <p className='capitalize'>{paramName}</p>
        </motion.div>
    );
};

export default ItemFilter;
