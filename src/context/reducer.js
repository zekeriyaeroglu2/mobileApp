export function reducer(state, action) {
  switch (action.type) {
    case 'CUSTOMER_CODE':
      state.customerCode = action.customerCode;
      return {...state};
    case 'TOKEN':
      state.token = action.token;
      return {...state};
    case 'USER_EMAIL':
      state.userEmail = action.userEmail;
      return {...state};

    default:
      return state;
  }
}
