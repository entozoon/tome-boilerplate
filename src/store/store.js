import { createStore } from "redux";

const reduxReducer = (state = { pageType: "index" }, action) => {
  if (action.type === "SET_PAGE_TYPE") {
    // Avoid mutating state here..
    var newState = Object.assign({}, state);
    newState.pageType = action.payload;
    return newState;
  }
  return state;
};

let store = createStore(reduxReducer);

store.subscribe(() => {
  // console.log("Redux change:", store.getState());
});

export default store;
