export const authInitialState = {
  isLoading: true,
  isSignOut: false,
  userToken: null,
};

export const authReducer = (prevState, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        userToken: action.token,
        isSignOut: false,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        userToken: null,
        isSignOut: true,
      };
  }
};
