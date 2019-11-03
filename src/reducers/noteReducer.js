const noteReducer = (state = {notes:[]}, action) => {
    switch(action.type) {
      case 'GET_NOTES':
      return state= {...state, notes: action.payload};
      case 'CREATE_NOTE':
        return state= {...state, posts: action.payload};
      case 'GET_NOTE':
        return state= {...state, notes: action.payload}
      case 'UPDATE_NOTE':
        return state= {...state, notes: action.payload};
      case 'DELETE_NOTE':
        return state= {...state, notes: action.payload};
        
        default:
        return state;
    }
  }
  export default noteReducer;