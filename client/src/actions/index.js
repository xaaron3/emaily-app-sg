import axios from 'axios';
import { FETCH_USER } from './types';

// fetchUser = action creator
// redux thunk sees a function within, dispatches after the "async" returns
export const fetchUser = () => {
   return function(dispatch) {
      axios.get('/api/current_user').then((res) => dispatch({ type: FETCH_USER, payload: res }));
   };
};
