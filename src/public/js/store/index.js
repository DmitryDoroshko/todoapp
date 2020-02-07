import createReducers from "./reducers.js";
import Store from "./store.js";

export default new Store(createReducers());