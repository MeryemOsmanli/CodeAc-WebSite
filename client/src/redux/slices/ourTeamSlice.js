import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast'
import axios from "axios";
export const getAllOurTeam = createAsyncThunk('getAllOurTeam', async () => {
    const response = await axios.get(`http://localhost:3030/ourTeam`)
    return response.data
})
export const postOurTeam = createAsyncThunk('postOurTeam', async (newData) => {
    const response = await axios.post(`http://localhost:3030/ourTeam`, newData)
    return response.data
})

export const getOneOurTeam = createAsyncThunk('getOneOurTeam', async (id) => {
    const response = await axios.get(`http://localhost:3030/ourTeam/${id}`)
    return response.data
})
export const deleteOurTeam = createAsyncThunk('deleteOurTeam', async (id) => {
    const response = await axios.delete(`http://localhost:3030/ourTeam/${id}`)
    return response.data
})

export const updateOurTeam = createAsyncThunk('updateOurTeam', async ({ id, newData }) => {
    const response = await axios.put(`http://localhost:3030/ourTeam/${id}`, newData)
    return response.data
})


const ourTeamSlice = createSlice({
    name: "ourTeam",
    initialState: {
        ourTeam: [],
        originalData: [],
        filteredData: [],
        oneOurTeam: {},
        ourTeamLoading: false,
        error: ""
    },
    reducers: {
        searchOurTeam: (state, action) => {
            const searchedOurTeam = action.payload.trim().toLowerCase()
            if (searchedOurTeam == '') {
                state.ourTeam = [...state.originalData]
            } else {
                const searching = state.filteredData.filter(item => item.title.trim().toLowerCase().includes(searchedOurTeam))
                state.ourTeam = [...searching]
            }
        },
        sortOurTeam: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.ourTeam = [...state.originalData];
            } else if (sorted === 'A-Z') {
                const sortAz = state.filteredData.sort((a, b) => a.title.localeCompare(b.title));
                state.ourTeam = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.filteredData.sort((a, b) => b.title.localeCompare(a.title));
                state.ourTeam = [...sortZa];
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllOurTeam.pending, (state, action) => {
            state.ourTeamLoading = true
        }).addCase(getAllOurTeam.fulfilled, (state, action) => {
            state.ourTeamLoading = false
            state.ourTeam = action.payload
            state.originalData = action.payload
            state.filteredData = action.payload
        }).addCase(getAllOurTeam.rejected, (state, action) => {
            state.ourTeamLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })


        builder.addCase(getOneOurTeam.pending, (state, action) => {
            state.ourTeamLoading = true
        }).addCase(getOneOurTeam.fulfilled, (state, action) => {
            state.ourTeamLoading = false
            state.oneOurTeam = action.payload
        }).addCase(getOneOurTeam.rejected, (state, action) => {
            state.ourTeamLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(deleteOurTeam.pending, (state, action) => {
            state.ourTeamLoading = true
        }).addCase(deleteOurTeam.fulfilled, (state, action) => {
            state.ourTeamLoading = false
            state.ourTeam = [...state.ourTeam.filter((item) => item._id != action.payload._id)]
            state.originalData = [...state.originalData.filter((item) => item._id != action.payload._id)]
            state.filteredData = [...state.filteredData.filter((item) => item._id != action.payload._id)]
            toast.success("Our Team Successfully Deleted")
        }).addCase(deleteOurTeam.rejected, (state, action) => {
            state.ourTeamLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(postOurTeam.pending, (state, action) => {
            state.ourTeamLoading = true
        }).addCase(postOurTeam.fulfilled, (state, action) => {
            state.ourTeamLoading = false
            state.ourTeam.push(action.payload)
            state.originalData.push(action.payload)
            state.filteredData.push(action.payload)
            toast.success("Our Team Successfully Added")
        }).addCase(postOurTeam.rejected, (state, action) => {
            state.ourTeamLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })



        builder.addCase(updateOurTeam.pending, (state, action) => {
            state.ourTeamLoading = true
        }).addCase(updateOurTeam.fulfilled, (state, action) => {
            state.ourTeamLoading = false
            state.ourTeam = [action.payload, ...state.ourTeam.filter(item => item._id != action.payload._id)]
            state.originalData = [action.payload, ...state.originalData.filter(item => item._id != action.payload._id)]
            state.filteredData = [action.payload, ...state.filteredData.filter(item => item._id != action.payload._id)]
            toast.success("Our Team Successfully Updated")
        }).addCase(updateOurTeam.rejected, (state, action) => {
            state.ourTeamLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })
    }
})
export const { searchOurTeam, sortOurTeam } = ourTeamSlice.actions
export default ourTeamSlice.reducer