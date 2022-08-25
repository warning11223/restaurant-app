import React, {useState} from 'react';
import ItemFilter from "./ItemFilter";
import {categories, foodItemsStatic} from "../../utils/data";
import ScrollContainer from "../ScrollContainer/ScrollContainer";
import {useAppSelector} from "../../state";

const MenuContainer = () => {
    const [active, setActive] = useState('chicken');
    const { foodItems, status} = useAppSelector(state => state.foodItems)


    return (
        <section className='w-full my-12'>
            <div>
                <p className=' text-3xl text-headingColor capitalize before:content relative before:absolute before:w-24 before:h-1 before:rounded-lg before:bg-orange-400 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all duration-200 ease-in-out'>Our hot dishes</p>

                <div className='flex justify-center gap-8 my-10 overflow-x-scroll md:overflow-x-hidden scrollbar-none'>
                    {categories.map(item => {
                        return <ItemFilter key={item.id} paramName={item.urlParamName} active={active} setActive={setActive} />
                    })}
                </div>

                <ScrollContainer
                    status={status}
                    items={foodItems?.filter(item => item.category === active)}
                    flag
                />
            </div>
        </section>
    );
};

export default MenuContainer;
