import { createStore } from "redux";

const reduxReducer = (state = [], action) => {
  if (action.type == "DO_A_THING") {
    // Avoid mutating state here..
    var newState = Object.assign({}, state);
    newState.foo = Math.random();
    return newState;
  }
  return state;
};

let store = createStore(reduxReducer);

store.subscribe(() => {
  console.log("Aww yeah, Redux!!");
  console.log(store.getState());
});

export default store;
