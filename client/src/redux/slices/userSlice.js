import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  const response = await axios.get(`http://localhost:3030/users`);
  return response.data;
});

export const getOneUser = createAsyncThunk("getOneUser", async (id) => {
  const response = await axios.get(`http://localhost:3030/users/${id}`);
  return response.data;
});

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  const response = await axios.delete(`http://localhost:3030/users/${id}`);
  return response.data;
});

export const getUserToken = createAsyncThunk("getUserToken", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return {};
  }
  const response = await axios.get(`http://localhost:3030/users/getMe`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const loginUser = createAsyncThunk("loginUser", async (newData) => {
  const response = await axios.post(
    `http://localhost:3030/users/login`,
    newData
  );
  localStorage.setItem("token", response.data.token);
  return response.data;
});

export const registerUser = createAsyncThunk(
  "registerUser",
  async (newData) => {
    const response = await axios.post(
      `http://localhost:3030/users/register`,
      newData
    );
    return response.data;
  }
);

export const addToWishlist = createAsyncThunk(
  "addToWishlist",
  async ({ id, newData }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return {};
    }
    const response = await axios.put(
      `http://localhost:3030/users/addToWishlist/${id}`,
      newData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
  }
);
export const removeFromWishlist = createAsyncThunk(
  "removeFromWishlist",
  async ({ id, newData }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return {};
    }
    const response = await axios.put(
      `http://localhost:3030/users/removeFromWishlist/${id}`,
      newData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
  }
);

export const addToBasket = createAsyncThunk(
  "addToBasket",
  async ({ id, newData }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return {};
    }
    const response = await axios.put(
      `http://localhost:3030/users/addToBasket/${id}`,
      newData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
  }
);
export const decreaseBasketItem = createAsyncThunk(
  "decreaseBasketItem",
  async ({ id, newData }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return {};
    }
    const response = await axios.put(
      `http://localhost:3030/users/decreaseBasketItem/${id}`,
      newData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
  }
);
export const updateUserIsLogin = createAsyncThunk(
  "updateUserIsLogin",
  async ({ id, newData }) => {
    const response = await axios.put(
      `http://localhost:3030/users/updateIsLogin/${id}`,
      newData
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
  }
);

export const deleteFromBasket = createAsyncThunk(
  "deleteFromBasket",
  async ({ id, newData }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return {};
    }
    const response = await axios.put(
      `http://localhost:3030/users/deleteFromBasket/${id}`,
      newData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
  }
);
export const clearBasket = createAsyncThunk(
  "clearBasket",
  async ({ id, newData }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return {};
    }
    const response = await axios.put(
      `http://localhost:3030/users/clearBasket/${id}`,
      newData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    filterUser: [],
    originalUser: [],
    userToken: {},
    userToken2: {},
    userToken3: {},
    oneUser: {},
    userLoading: false,
    tokenLoading: false,
    userStatus: false,
    userError: "",
  },
  reducers: {
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.userToken = {};
      state.userStatus = false;
    },
    searchUser: (state, action) => {
      const searchedUser = action.payload.trim().toLowerCase();
      if (searchedUser == "") {
        state.users = [...state.originalUser];
      } else {
        const searching = state.filterUser.filter((item) =>
          item.fullName.trim().toLowerCase().includes(searchedUser)
        );
        state.users = [...searching];
      }
    },
    sortUser: (state, action) => {
      const sorted = action.payload;
      if (sorted === "df") {
        state.users = [...state.originalUser];
      } else if (sorted === "A-Z") {
        const sortAz = state.filterUser.sort((a, b) =>
          a.fullName.localeCompare(b.fullName)
        );
        state.users = [...sortAz];
      } else if (sorted === "Z-A") {
        const sortZa = state.filterUser.sort((a, b) =>
          b.fullName.localeCompare(a.fullName)
        );
        state.users = [...sortZa];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users = action.payload;
        state.originalUser = action.payload;
        state.filterUser = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
        toast.error("Something Went Wrong,Please Try Again");
      });

    builder
      .addCase(getOneUser.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(getOneUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.oneUser = action.payload;
      })
      .addCase(getOneUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
        toast.error("Something Went Wrong,Please Try Again");
      });

    builder
      .addCase(deleteUser.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users = [
          ...state.users.filter((item) => item._id != action.payload._id),
        ];
        state.originalUser = [
          ...state.originalUser.filter(
            (item) => item._id != action.payload._id
          ),
        ];
        state.filterUser = [
          ...state.filterUser.filter((item) => item._id != action.payload._id),
        ];
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
        toast.error("Something Went Wrong,Please Try Again");
      });

    builder
      .addCase(addToBasket.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(addToBasket.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users = [
          action.payload,
          ...state.users.filter((item) => item._id != action.payload._id),
        ];
        state.originalUser = [
          action.payload,
          ...state.originalUser.filter(
            (item) => item._id != action.payload._id
          ),
        ];
        state.filterUser = [
          action.payload,
          ...state.filterUser.filter((item) => item._id != action.payload._id),
        ];

        const token = localStorage.getItem("token");

        if (token) {
          const decode = jwtDecode(token);
          state.userToken = decode;
          state.userToken2 = decode;
          state.userToken3 = decode;
        }
      })
      .addCase(addToBasket.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      });

    builder
      .addCase(decreaseBasketItem.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(decreaseBasketItem.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users = [
          action.payload,
          ...state.users.filter((item) => item._id != action.payload._id),
        ];
        state.originalUser = [
          action.payload,
          ...state.originalUser.filter(
            (item) => item._id != action.payload._id
          ),
        ];
        state.filterUser = [
          action.payload,
          ...state.filterUser.filter((item) => item._id != action.payload._id),
        ];

        const token = localStorage.getItem("token");

        if (token) {
          const decode = jwtDecode(token);
          state.userToken = decode;
          state.userToken2 = decode;
          state.userToken3 = decode;
        }
      })
      .addCase(decreaseBasketItem.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      });

    builder
      .addCase(registerUser.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users.push(action.payload);
        state.originalUser.push(action.payload);
        state.filterUser.push(action.payload);
        toast.success("Successfully registered! Welcome to our platform.");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
        toast.error("Something Went Wrong,Please Try Again");
      });

    builder
      .addCase(addToWishlist.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users = [
          action.payload,
          ...state.users.filter((item) => item._id != action.payload._id),
        ];
        state.originalUser = [
          action.payload,
          ...state.originalUser.filter(
            (item) => item._id != action.payload._id
          ),
        ];
        state.filterUser = [
          action.payload,
          ...state.filterUser.filter((item) => item._id != action.payload._id),
        ];

        const token = localStorage.getItem("token");

        if (token) {
          const decode = jwtDecode(token);
          state.userToken = decode;
          state.userToken2 = decode;
          state.userToken3 = decode;
        }
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      });

    builder
      .addCase(updateUserIsLogin.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(updateUserIsLogin.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users = [
          action.payload,
          ...state.users.filter((item) => item._id != action.payload._id),
        ];
        state.originalUser = [
          action.payload,
          ...state.originalUser.filter(
            (item) => item._id != action.payload._id
          ),
        ];
        state.filterUser = [
          action.payload,
          ...state.filterUser.filter((item) => item._id != action.payload._id),
        ];

        const token = localStorage.getItem("token");

        if (token) {
          const decode = jwtDecode(token);
          state.userToken = decode;
          state.userToken2 = decode;
          state.userToken3 = decode;
        }
      })
      .addCase(updateUserIsLogin.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      });

    builder
      .addCase(getUserToken.pending, (state, action) => {
        state.tokenLoading = true;
      })
      .addCase(getUserToken.fulfilled, (state, action) => {
        state.tokenLoading = false;
        const token = localStorage.getItem("token");

        if (token) {
          const decode = jwtDecode(token);
          state.userToken = decode;
          state.userToken2 = decode;
          state.userToken3 = decode;
        }
      })
      .addCase(getUserToken.rejected, (state, action) => {
        state.tokenLoading = false;
        state.userError = action.payload;
        toast.error("Something Went Wrong,Please Try Again");
      });

    builder
      .addCase(removeFromWishlist.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users = [
          action.payload,
          ...state.users.filter((item) => item._id != action.payload._id),
        ];
        state.originalUser = [
          action.payload,
          ...state.originalUser.filter(
            (item) => item._id != action.payload._id
          ),
        ];
        state.filterUser = [
          action.payload,
          ...state.filterUser.filter((item) => item._id != action.payload._id),
        ];

        const token = localStorage.getItem("token");

        if (token) {
          const decode = jwtDecode(token);
          state.userToken = decode;
          state.userToken2 = decode;
          state.userToken3 = decode;
        }
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      });

    builder
      .addCase(loginUser.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userStatus = true;
        const token = localStorage.getItem("token");
        if (token) {
          const decode = jwtDecode(token);
          state.userToken = decode;
          state.userToken2 = decode;
          state.userToken3 = decode;
        }
        state.userError = "";
        toast.success("Login successful! Welcome back.");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userStatus = false;
        state.userError = action.error.message;
      });

    builder
      .addCase(deleteFromBasket.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(deleteFromBasket.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users = [
          action.payload,
          ...state.users.filter((item) => item._id != action.payload._id),
        ];
        state.originalUser = [
          action.payload,
          ...state.originalUser.filter(
            (item) => item._id != action.payload._id
          ),
        ];
        state.filterUser = [
          action.payload,
          ...state.filterUser.filter((item) => item._id != action.payload._id),
        ];

        const token = localStorage.getItem("token");

        if (token) {
          const decode = jwtDecode(token);
          state.userToken = decode;
          state.userToken2 = decode;
          state.userToken3 = decode;
        }
      })
      .addCase(deleteFromBasket.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      });

    builder
      .addCase(clearBasket.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(clearBasket.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users = [
          action.payload,
          ...state.users.filter((item) => item._id != action.payload._id),
        ];
        state.originalUser = [
          action.payload,
          ...state.originalUser.filter(
            (item) => item._id != action.payload._id
          ),
        ];
        state.filterUser = [
          action.payload,
          ...state.filterUser.filter((item) => item._id != action.payload._id),
        ];

        const token = localStorage.getItem("token");

        if (token) {
          const decode = jwtDecode(token);
          state.userToken = decode;
          state.userToken2 = decode;
          state.userToken3 = decode;
        }
      })
      .addCase(clearBasket.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      });
  },
});

export const { logOut, searchUser, sortUser } = userSlice.actions;
export default userSlice.reducer;
