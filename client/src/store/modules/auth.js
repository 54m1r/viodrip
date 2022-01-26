import axios from 'axios';

const state = {
  token: localStorage.getItem('token') || '',
  user: {},
  status: '',
  error: null
};

const getters = {
  // isLoggedIn: function (state) {
  //     if (state.token != '') {
  //         return true
  //     } else {
  //         return false
  //     }
  // }
  isLoggedIn: state => !!state.token,
  authState: state => state.status,
  user: state => state.user,
  error: state => state.error
};

const actions = {
  // Login Action
  async login({
                commit
              }, user) {
    commit('auth_request');
    try {
      let res = await axios.post('/api/auth/login', user)
      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.user;
        // Store the token into the localstorage
        localStorage.setItem('token', token);
        // Set the axios defaults
        axios.defaults.headers.common['Authorization'] = token;
        commit('auth_success', token, user);
      }
      return res;
    } catch (err) {
      commit('auth_error', err);
    }
  },
  // Register User
  async register({
                   commit
                 }, userData) {
    try {
      commit('register_request');
      let res = await axios.post('/api/auth/register', userData);
      if (res.data.success !== undefined) {
        commit('register_success');
      }
      return res;
    } catch (err) {
      commit('register_error', err)
    }
  },
  // Get the user Profile
  async getProfile({
                     commit
                   }) {

    console.log("Update profile");

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    try {
      commit('profile_request');
      let res = await axios.get('/api/profile');
      if (res.data.user !== undefined) {
        console.log(res.data.user);
        commit('user_profile', res.data.user);
      }
      return res;
    } catch (err) {
      //commit('register_error', err);
      if(err.response.status === 401) {
        //router.push('/login');
        await localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      }
    }
  },
  // Logout the user
  async logout({
                 commit
               }) {
    await localStorage.removeItem('token');
    commit('logout');
    delete axios.defaults.headers.common['Authorization'];
  }
};

const mutations = {
  auth_request(state) {
    state.error = null
    state.status = 'loading'
  },
  auth_success(state, token, user) {
    state.token = token
    state.user = user
    state.status = 'success'
    state.error = null
  },
  auth_error(state, err) {
    state.error = err.response.data.msg
  },
  register_request(state) {
    state.error = null
    state.status = 'loading'
  },
  register_success(state) {
    state.error = null
    state.status = 'success'
  },
  register_error(state, err) {
    state.error = err.response.data.msg
  },
  logout(state) {
    state.error = null
    state.status = ''
    state.token = ''
    state.user = ''
  },
  profile_request(state) {
    state.status = 'loading'
  },
  user_profile(state, user) {
    console.log("angekommen");
    state.user = user
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
