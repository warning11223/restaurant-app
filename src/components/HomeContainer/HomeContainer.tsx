import React from 'react';
import bike from "../../static/images/delivery.png";
import bg from '../../static/images/heroBg.png'
import {heroData} from "../../utils/data";

const HomeContainer = () => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
            <section className=' flex flex-col gap-6  lg:gap-20  w-full h-full'>
                <div className='bg-orange-300 w-[10.5rem] rounded-full px-2 py-1'>
                    <div className='flex items-center gap-2'>
                        <p className='text-orange-600 font-bold'>Bike delivery</p>
                        <img src={bike} alt="bike-img" className='w-10 h-10 bg-white rounded-full shadow-md'/>
                    </div>
                </div>
                <div>
                    <p className='font-bold text-4xl tracking-wide md:text-7xl'>The fastest delivery in <span className='text-orange-600 text-8xl'>your city</span></p>
                </div>
                <p className='text-textColor text-center md:text-left lg:text-xl'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda atque consequatur expedita explicabo necessitatibus quae, sapiente sequi sint tenetur voluptas! Aliquam dicta eveniet id officia optio quam repellendus sunt temporibus.</p>
                <a href='#fruits' type='button' className='bg-orange-500 md:w-[9rem] w-auto px-4 py-2 rounded-md hover:bg-orange-600 transition-all text-white text-xl'>Order now</a>
            </section>

            <section className='relative flex w-full h-full justify-center items-center '>
                <img src={bg} alt="bg-img" className='ml-auto w-full h-600 lg:h-700 lg:w-auto'/>

                <div className=' h-full min-w-[50%] lg:mt-32 absolute  grid grid-cols-2 gap-5 md:gap-10 md:grid-cols-1 md:ml-32 md:w-[100%] lg:grid-cols-2 lg:gap-7 sm:overflow-y-scroll lg:overflow-y-hidden scrollbar-none py-10 '>
                    {
                        heroData.map(item => {
                            return (
                                <div key={item.id}>
                                    <div className='max-w-[190px] p-2 bg-cardOverlay backdrop-blur-md rounded-3xl items-center justify-center text-center flex flex-col gap-3 shadow-md mb-10 lg:mb-0'>
                                        <img src={item.imageSrc} alt={item.name} className='w-40 h-40 -mt-10'/>
                                        <p className='font-bold text-headingColor text-xl'>{item.name}</p>
                                        <p className='font-bold text-textColor'>{item.desc}</p>
                                        <p className='font-bold text-textColor text-xl '><span className='text-red-600 font-bold'>$</span> {item.price}</p>
                                    </div>
                                </div>

                            )

                        })

                    }
                </div>

            </section>
        </div>
    );
};

export default HomeContainer;
