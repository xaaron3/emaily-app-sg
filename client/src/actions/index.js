import axios from 'axios';
import { FETCH_USER } from './types';

// fetchUser = action creator
// redux thunk sees a function within, dispatches after the "async" returns
export const fetchUser = () => async dispatch => {
   const res = await axios.get('/api/current_user')

   dispatch({ type: FETCH_USER, payload: res.data })
};
