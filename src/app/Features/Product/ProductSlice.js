import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../Utils/axiosErrorHandler";
import { sliderItems } from "../../Coponents/Data/data";

//fetch all proudcts from the api end point
export const getAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    try {
      // let { data } = await axios.get("https://fakestoreapi.com/products");
      let  data  = sliderItems;
      // console.log(data)
      console.log(data)
      return data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }
);
const productSlice = createSlice({
  name: "products",
  initialState: { isLoading: false, products: [], error: null },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.error = null;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
