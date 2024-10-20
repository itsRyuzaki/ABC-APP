const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLoggedIn: false,
  allowedModulesAccess: [],
  userApiResolved: false,
};
const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {},
});
