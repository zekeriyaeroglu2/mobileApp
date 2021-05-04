export function reducer(state, action) {
  switch (action.type) {
    case 'CUSTOMER_CODE':
      state.customerCode = action.customerCode;
      return {...state};
    case 'TOKEN':
      state.token = action.token;
      return {...state};

    default:
      return state;
  }
}
