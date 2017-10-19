// const reducer = (
//   state,action
// ) =>{
//   return
// }

//state 초기화
const DEFAULT_STATE = {
  rootColor: [234, 34, 124],
  headerText: "change",
}
//set state
const reducer = (state = DEFAULT_STATE, action) => {
  //CHANGE_COLOR
  if (action.type === "CHANGE_COLOR") {
    return {
      ...state, //기존 state가 적용되서 덮어쓰기함
      rootColor: action.payload,
    }
  }
  //CHANGE_HEADER
  if (action.type === "CHANGE_HEADER") {
    return {
      ...state,
      headerText: action.payload,
    }
  }

  return {
    ...state, //아무 action이 안걸릴때
  }
} //state update

export default reducer
