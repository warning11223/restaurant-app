import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {foodItem} from "../../models/types";
import {getItems} from "../../utils/firebaseFunction";

export interface FoodItems {
    foodItems: foodItem[];
    status: 'pending' | 'fulfilled' | 'rejected';
}

const initialState: FoodItems = {
    foodItems: [],
    status: "pending"
}

export const foodItemsSlice = createSlice({
    name: 'foodItems',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchFoodItems.fulfilled, (state, action: PayloadAction<foodItem[]>) => {
            state.foodItems = action.payload;
            state.status = 'fulfilled';
        });
        builder.addCase(fetchFoodItems.rejected, (state) => {
            state.status = 'rejected';
        });
        builder.addCase(fetchFoodItems.pending, (state) => {
            state.status = 'pending';
        });
    },
})

export const fetchFoodItems = createAsyncThunk(
    'foodItems/fetchFoodItems',
    async () => {
        const response = getItems();
        return response;
        /*return (await response.json()) as MyData*/
    }
)

export const {  } = foodItemsSlice.actions

export default foodItemsSlice.reducer