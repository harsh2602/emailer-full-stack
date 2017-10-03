import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  // dispatch is a function
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res });
};
