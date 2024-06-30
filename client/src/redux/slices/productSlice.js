import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast'
import axios from "axios";
export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
    const response = await axios.get(`http://localhost:3030/products`)
    return response.data
})
export const postProducts = createAsyncThunk('postProducts', async (newData) => {
    const response = await axios.post(`http://localhost:3030/products`, newData)
    return response.data
})

export const getOneProducts = createAsyncThunk('getOneProducts', async (id) => {
    const response = await axios.get(`http://localhost:3030/products/${id}`)
    return response.data
})
export const deleteProducts = createAsyncThunk('deleteProducts', async (id) => {
    const response = await axios.delete(`http://localhost:3030/products/${id}`)
    return response.data
})

export const updateProduct = createAsyncThunk('updateProduct', async ({ id, newData }) => {
    const response = await axios.put(`http://localhost:3030/products/${id}`, newData)
    return response.data
})


const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        originalData: [],
        filteredData: [],
        oneProduct: {},
        productsLoading: false,
        error: ""
    },
    reducers: {
        searchProducts: (state, action) => {
            const searchedQuestions = action.payload.trim().toLowerCase()
            if (searchedQuestions == '') {
                state.products = [...state.originalData]
            } else {
                const searching = state.filteredData.filter(item => item.title.trim().toLowerCase().includes(searchedQuestions))
                state.products = [...searching]
            }
        },
        sortProducts2: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.products = [...state.originalData];
            } else if (sorted === 'A-Z') {
                const sortAz = state.filteredData.sort((a, b) => a.title.localeCompare(b.title));
                state.products = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.filteredData.sort((a, b) => b.title.localeCompare(a.title));
                state.products = [...sortZa];
            } else if (sorted === '0-9') {
                const sort09 = state.filteredData.sort((a, b) => a.price - b.price);
                state.products = [...sort09];
            } else if (sorted === '9-0') {
                const sort90 = state.filteredData.sort((a, b) => b.price - a.price);
                state.products = [...sort90];
            } else if (sorted === 'Juice') {
                const sortJuice = state.filteredData.filter(x => x.type === 'Juice');
                state.products = [...sortJuice];
            } else if (sorted === 'Ice-cream') {
                const sortIceCream = state.filteredData.filter(x => x.type === 'Ice-cream');
                state.products = [...sortIceCream];
            }
        },
        sortProducts: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.products = [...state.originalData];
            } else if (sorted === 'A-Z') {
                const sortAz = state.filteredData.sort((a, b) => a.title.localeCompare(b.title));
                state.products = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.filteredData.sort((a, b) => b.title.localeCompare(a.title));
                state.products = [...sortZa];
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state, action) => {
            state.productsLoading = true
        }).addCase(getAllProducts.fulfilled, (state, action) => {
            state.productsLoading = false
            state.products = action.payload
            state.originalData = action.payload
            state.filteredData = action.payload
        }).addCase(getAllProducts.rejected, (state, action) => {
            state.productsLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })


        builder.addCase(getOneProducts.pending, (state, action) => {
            state.productsLoading = true
        }).addCase(getOneProducts.fulfilled, (state, action) => {
            state.productsLoading = false
            state.oneProduct = action.payload
        }).addCase(getOneProducts.rejected, (state, action) => {
            state.productsLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(deleteProducts.pending, (state, action) => {
            state.productsLoading = true
        }).addCase(deleteProducts.fulfilled, (state, action) => {
            state.productsLoading = false
            state.products = [...state.products.filter((item) => item._id != action.payload._id)]
            state.originalData = [...state.originalData.filter((item) => item._id != action.payload._id)]
            state.filteredData = [...state.filteredData.filter((item) => item._id != action.payload._id)]
            toast.success("Question Successfully Deleted")
        }).addCase(deleteProducts.rejected, (state, action) => {
            state.productsLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(postProducts.pending, (state, action) => {
            state.productsLoading = true
        }).addCase(postProducts.fulfilled, (state, action) => {
            state.productsLoading = false
            state.products.push(action.payload)
            state.originalData.push(action.payload)
            state.filteredData.push(action.payload)
            toast.success("Question Successfully Added")
        }).addCase(postProducts.rejected, (state, action) => {
            state.productsLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })



        builder.addCase(updateProduct.pending, (state, action) => {
            state.productsLoading = true
        }).addCase(updateProduct.fulfilled, (state, action) => {
            state.productsLoading = false
            state.products = [action.payload, ...state.products.filter(item => item._id != action.payload._id)]
            state.originalData = [action.payload, ...state.originalData.filter(item => item._id != action.payload._id)]
            state.filteredData = [action.payload, ...state.filteredData.filter(item => item._id != action.payload._id)]
            toast.success("Question Successfully Updated")
        }).addCase(updateProduct.rejected, (state, action) => {
            state.productsLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })
    }
})
export const { searchProducts, sortProducts, sortProducts2 } = productSlice.actions
export default productSlice.reducer