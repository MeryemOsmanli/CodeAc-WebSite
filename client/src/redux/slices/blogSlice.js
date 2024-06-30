import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast'
import axios from "axios";
export const getAllBlog = createAsyncThunk('getAllBlog', async () => {
    const response = await axios.get(`http://localhost:3030/blogs`)
    return response.data
})
export const postBlog = createAsyncThunk('postBlog', async (newData) => {
    const response = await axios.post(`http://localhost:3030/blogs`, newData)
    return response.data
})

export const getOneBlog = createAsyncThunk('getOneBlog', async (id) => {
    const response = await axios.get(`http://localhost:3030/blogs/${id}`)
    return response.data
})
export const deleteBlog = createAsyncThunk('deleteBlog', async (id) => {
    const response = await axios.delete(`http://localhost:3030/blogs/${id}`)
    return response.data
})

export const updateBlog = createAsyncThunk('updateBlog', async ({ id, newData }) => {
    const response = await axios.put(`http://localhost:3030/blogs/${id}`, newData)
    return response.data
})


const blogsSlice = createSlice({
    name: "blogs",
    initialState: {
        blogs: [],
        originalData: [],
        filteredData: [],
        oneBlog: {},
        blogsLoading: false,
        error: ""
    },
    reducers: {
        searchBlog: (state, action) => {
            const searchedBlogs = action.payload.trim().toLowerCase()
            if (searchedBlogs == '') {
                state.blogs = [...state.originalData]
            } else {
                const searching = state.filteredData.filter(item => item.title.trim().toLowerCase().includes(searchedBlogs))
                state.blogs = [...searching]
            }
        },
        sortBlogs: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.blogs = [...state.originalData];
            } else if (sorted === 'A-Z') {
                const sortAz = state.filteredData.sort((a, b) => a.title.localeCompare(b.title));
                state.blogs = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.filteredData.sort((a, b) => b.title.localeCompare(a.title));
                state.blogs = [...sortZa];
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllBlog.pending, (state, action) => {
            state.blogsLoading = true
        }).addCase(getAllBlog.fulfilled, (state, action) => {
            state.blogsLoading = false
            state.blogs = action.payload
            state.originalData = action.payload
            state.filteredData = action.payload
        }).addCase(getAllBlog.rejected, (state, action) => {
            state.blogsLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })


        builder.addCase(getOneBlog.pending, (state, action) => {
            state.blogsLoading = true
        }).addCase(getOneBlog.fulfilled, (state, action) => {
            state.blogsLoading = false
            state.oneBlog = action.payload
        }).addCase(getOneBlog.rejected, (state, action) => {
            state.blogsLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(deleteBlog.pending, (state, action) => {
            state.blogsLoading = true
        }).addCase(deleteBlog.fulfilled, (state, action) => {
            state.blogsLoading = false
            state.blogs = [...state.blogs.filter((item) => item._id != action.payload._id)]
            state.originalData = [...state.originalData.filter((item) => item._id != action.payload._id)]
            state.filteredData = [...state.filteredData.filter((item) => item._id != action.payload._id)]
            toast.success("Blog Successfully Deleted")
        }).addCase(deleteBlog.rejected, (state, action) => {
            state.blogsLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(postBlog.pending, (state, action) => {
            state.blogsLoading = true
        }).addCase(postBlog.fulfilled, (state, action) => {
            state.blogsLoading = false
            state.blogs.push(action.payload)
            state.originalData.push(action.payload)
            state.filteredData.push(action.payload)
            toast.success("Blog Successfully Added")
        }).addCase(postBlog.rejected, (state, action) => {
            console.log(action)
            state.blogsLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })



        builder.addCase(updateBlog.pending, (state, action) => {
            state.blogsLoading = true
        }).addCase(updateBlog.fulfilled, (state, action) => {
            state.blogsLoading = false
            state.blogs = [action.payload, ...state.blogs.filter(item => item._id != action.payload._id)]
            state.originalData = [action.payload, ...state.originalData.filter(item => item._id != action.payload._id)]
            state.filteredData = [action.payload, ...state.filteredData.filter(item => item._id != action.payload._id)]
            toast.success("Blog Successfully Updated")
        }).addCase(updateBlog.rejected, (state, action) => {
            state.blogsLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })
    }
})
export const { searchBlog, sortBlogs } = blogsSlice.actions
export default blogsSlice.reducer