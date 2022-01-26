import axios from 'axios';

const state = {
};

const getters = {
};

const actions = {
  // Get the user Profile
  async saveRoulette({
                       commit
                     }, data) {

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    let res = await axios.post('/api/roulette/bet',
      data
    );
    console.log(res.data.user);
    commit('user_profile', res.data.user);
    return res;
  }
};

const mutations = {};

export default {
  state,
  actions,
  mutations,
  getters
};
