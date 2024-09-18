import { Snackbar, SnackbarProps } from "@mui/material";
import { createContext, useReducer, ReactElement, useContext } from "react";

interface Context {
  snackBarData: {
    open: boolean;
    children?: ReactElement;
    props?: SnackbarProps;
  };
}

// Initial state for the auth context
const initialState: Context = {
  snackBarData: {
    open: false,
  },
};

// Reducer function to handle authentication state updates
const storeReducer = (state: Context, action: any) => {
  switch (action.type) {
    case "TOGGLE_SNACKBAR_DATA":
      return {
        ...state,
        snackBarData: action.payload,
      };
    default:
      return state;
  }
};

// Create the context
export const StoreContext = createContext<any>(null);

export const StoreDispatchContext = createContext<any>(null);

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
      {state.snackBarData.open && (
        <Snackbar {...state.snackBarData.props} open={true}>
          {state.snackBarData.children}
        </Snackbar>
      )}
    </StoreContext.Provider>
  );
};
