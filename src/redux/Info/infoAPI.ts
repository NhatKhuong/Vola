import { createAsyncThunk } from "@reduxjs/toolkit";

class infoAPI {
  updateInfo() {
    return createAsyncThunk(
      "info/update-data",
      async (data: any, thunkAPI) => {
        console.log(data);
        
       return data
      }
    );
  }
  
}
export default new infoAPI();
