import axios from 'axios';

const actions = {
  // Get the user Profile
  async charge({
                       commit
                     }, data) {

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    let res = await axios.post('/api/transactions/charge',
      data
    );
    console.log(res.data.user);
    commit('user_profile', res.data.user);
    return res;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
