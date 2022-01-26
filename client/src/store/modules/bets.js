import axios from 'axios';

const state = {
  /*token: localStorage.getItem('token') || '',
  user: {},
  status: '',
  error: null */
};

const getters = {
  /*isLoggedIn: state => !!state.token,
  authState: state => state.status,
  user: state => state.user,
  error: state => state.error */
};

const actions = {
  // Get the user Profile
  async saveBets({
                     commit
                   }, data) {

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      let res = await axios.post('/api/bets',
        data
      );
      console.log(res.data.user);
      commit('user_profile', res.data.user);
      return res;
      //console.log(JSON.stringify(err));
     // console.log("H");
      //return err;
      //commit('register_error', err);
      /*if(err.response.status === 401) {
        //router.push('/login');
        await localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      } */
    }
};

const mutations = {
  /*auth_request(state) {
    state.error = null
    state.status = 'loading'
  }, */
};

export default {
  state,
  actions,
  mutations,
  getters
};
