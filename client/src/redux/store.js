import { configureStore } from '@reduxjs/toolkit';
// import subscribersSlice from './slices/subscribersSlice';
import faqSlice from './slices/faqSlice';
// import orderSlice from './slices/orderSlice';
import userSlice from './slices/userSlice';
import productSlice from './slices/productSlice';
import blogSlice from './slices/blogSlice';

const store = configureStore({
    reducer: {
        // subscribers: subscribersSlice,
        questions: faqSlice,
        // orders: orderSlice,
        users: userSlice,
        products: productSlice,
        blogs: blogSlice

    }
})
export default store