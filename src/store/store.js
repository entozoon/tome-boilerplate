import { createStore } from "redux";

const reduxReducer = (state = { pageType: "index" }, action) => {
  // Keep here for future use but I don't believe pageType is needed for now
  // if (action.type === "SET_PAGE_TYPE") {
  //   // Avoid mutating state here..
  //   var newState = Object.assign({}, state);
  //   newState.pageType = action.payload;
  //   return newState;
  // }
  // return state;
  //
  // How one might go about dispatching this pageType change event:
  // componentDidMount(props) {
  //   if (store.getState().pageType !== "about") {
  //     store.dispatch({
  //       type: "SET_PAGE_TYPE",
  //       payload: "about"
  //     });
  //   }
  // }
  //
  // How one would get said pageType, anywhere in the app:
  // store.getState().pageType
};

let store = createStore(reduxReducer);

store.subscribe(() => {
  // console.log("Redux change:", store.getState());
});

export default store;
