import React from 'react';
import {Link} from "react-router-dom";

const Page404 = () => {
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <div className='text-5xl text-textColor'>
                Page 404 not found 😔
            </div>
            <Link to='/' type='button' className='bg-orange-500  mt-10 w-auto px-4 py-2 rounded-md hover:bg-orange-600 transition-all text-white text-xl cursor-pointer'>Back to main</Link>
        </div>
    );
};

export default Page404;
