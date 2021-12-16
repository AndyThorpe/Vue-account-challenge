import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profiles: [
      {
        id: 1,
        name: "Albert Einstein",
        description: "E=mc2"
      },
      {
        id: 2,
        name: "Marie Curie",
        description: "Radioactivity research pioneer."
      },
      {
        id: 3,
        name: "Isaac Newton",
        description: "Mathematical genius."
      }
    ]
  },
  getters: {
    getProfiles: (state) => {
      return state.profiles;
    }
  },
  mutations: {
    ADD_PROFILE(state, profileData) {
      state.profiles.push(profileData);
    },
    DELETE_PROFILE(state, profileId) {
      const indexOfProfile = state.profiles.findIndex(
        (profile) => profile.id === profileId
      );
      state.profiles.splice(indexOfProfile, 1);
    }
  },
  actions: {
    addProfile({ commit }, profileData) {
      commit("ADD_PROFILE", profileData);
    },
    deleteProfile({ commit }, profileIndex) {
      commit("DELETE_PROFILE", profileIndex);
    }
  }
});
