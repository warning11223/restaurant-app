import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {foodItem} from "../../models/types";


export interface CartState {
    showCart: boolean;
    cartItems: foodItem[];
    subTotal: number;
    status: 'pending' | 'fulfilled' | 'rejected';
}

const initialState: CartState = {
    showCart: false,
    cartItems: [],
    subTotal: 0,
    status: "pending",
}

const calcTotalPrice = (state: CartState) => {
    const calculated = state.cartItems.reduce((acc, item) => {
        return acc += +item.price * +item.qty;
    }, 0)
    return state.subTotal = calculated;
}



export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        showCart: (state) => {
            state.showCart = true;
        },
        hideCart: (state) => {
            state.showCart = false;
        },
        addToCart: (state, action: PayloadAction<foodItem>) => {
            const findItem = state.cartItems.find(item => item.id === action.payload.id);

            if(findItem) {
                findItem.qty++;
            } else {
                state.cartItems.push(action.payload)
            }

            calcTotalPrice(state);
        },
        increaseItems: (state, action: PayloadAction<string>) => {
            const findItem = state.cartItems.find(item => item.id === action.payload);

            if(findItem) {
                findItem.qty++;
                calcTotalPrice(state);
            }
        },
        decreaseItems: (state, action: PayloadAction<string>) => {
            const findItem = state.cartItems.find(item => item.id === action.payload);

            if(findItem) {
                findItem.qty && findItem.qty--;
                calcTotalPrice(state);
            }
        },
        deleteItems: (state) => {
            state.cartItems = [];
            calcTotalPrice(state);
        }
    },
    extraReducers: (builder) => {

    },
})


export const { showCart, hideCart, addToCart, increaseItems, decreaseItems, deleteItems } = cartSlice.actions

export default cartSlice.reducer