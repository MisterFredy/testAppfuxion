const initialState = {
    dataAddress:[]
  };
  
  const rootReducer = (state=initialState,action) => {
    switch (action.type){
      case 'ADD_ADDRESS':
      return { 
        ...state,
        dataAddress: [...state.dataAddress, action.newItem]
      };
  
      default:
        return state;
    }
    
  };

  export default rootReducer;