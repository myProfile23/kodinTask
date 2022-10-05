import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import reducer from './reducer';

const initialState = {
  currentUser: null,
  openLogin: true,
  loading: false,
  alert: { open: false, severity: 'info', message: '' },
  profile: { open: false },
  users: [],
};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      dispatch({ type: 'UPDATE_USER', payload: currentUser });
    }
  }, []);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
