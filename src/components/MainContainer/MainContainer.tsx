import React, {useEffect} from 'react';
import HomeContainer from "../HomeContainer/HomeContainer";
import {useAppDispatch, useAppSelector} from "../../state";
import {fetchFoodItems} from "../../state/slices/foodItemsSlice";
import MenuContainer from "../MenuContainer/MenuContainer";
import ScrollContainer from "../ScrollContainer/ScrollContainer";
import CartContainer from "../CartContainer/CartContainer";


const MainContainer = () => {
    const dispatch = useAppDispatch();
    const { foodItems, status } = useAppSelector(state => state.foodItems);

    useEffect(() => {
        dispatch(fetchFoodItems());
    }, []);




    return (
        <div>

            <HomeContainer />

            <ScrollContainer
                items={foodItems?.filter(item => item.category === 'fruits')}
                status={status}
            />

            <MenuContainer />

            <CartContainer />



        </div>
    );
};

export default MainContainer;
