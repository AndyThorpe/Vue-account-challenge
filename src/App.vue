<template>
  <div id="app">
    <theme-button />
    <div class="section">
      <div class="flex-row">
        <label class="label" for="filter">Filter profiles:</label>
        <input class="input" v-model="filter" />
      </div>
      <div class="buttons">
        <button :disabled="sort === 'asc'" @click="sortProfiles('asc')">
          ▲
        </button>
        <button :disabled="sort === 'desc'" @click="sortProfiles('desc')">
          ▼
        </button>
      </div>
      <p class="header">Profiles:</p>
      <p class="results">
        {{ profileCount }} profiles found
        <a class="link" v-if="filter" @click="filter = ''"> - Remove Filter</a>
      </p>

      <transition-group name="list" tag="div">
        <ProfileCard
          v-for="profile in localData"
          :key="profile.id"
          :profile="profile"
          class="profile"
          @delete="deleteProfile"
        />
      </transition-group>
    </div>
    <div class="section profile-form">
      <p class="header">Add new profile:</p>
      <div class="form-container">
        <div class="flex-row">
          <label class="label">Name:</label>
          <input class="input" v-model="name" />
        </div>
        <div class="flex-row">
          <label class="label">Description:</label>
          <input class="input" v-model="description" />
        </div>
        <button @click="addProfile" :disabled="!name || !description">
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from "./components/ProfileCard";
import store from "./store";
import ThemeButton from "@/components/ThemeButton.vue";

export default {
  name: "App",
  components: {
    ProfileCard,
    ThemeButton,
  },
  data() {
    return {
      name: "",
      description: "",
      filter: "",
      sort: "asc",
      localData: store.getters.getProfiles,
      nextProfileId: store.getters.getProfiles.length,
    };
  },
  methods: {
    addProfile: function () {
      this.nextProfileId++;
      const newProfile = {
        id: this.nextProfileId,
        name: this.name,
        description: this.description,
      };

      store.dispatch("addProfile", newProfile);
      this.clearForms();
      this.sortProfiles(this.sort); // Ensure new profile is correctly sorted
    },

    deleteProfile: function (id) {
      store.dispatch("deleteProfile", id);
      if (this.filter) {
        // Retain filtered view even after deletion
        const indexOfProfile = this.localData.findIndex(
          (profile) => profile.id === id
        );
        this.localData.splice(indexOfProfile, 1);
      }
    },

    sortProfiles: function (direction) {
      this.sort = direction;
      this.localData.sort((a, b) => {
        return direction === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });
    },

    clearForms: function () {
      this.name = "";
      this.description = "";
      this.filter = "";
    },
  },
  computed: {
    profileCount: function () {
      return this.localData.length;
    },
  },
  watch: {
    filter: function () {
      if (this.filter) {
        const searchString = this.filter.toLowerCase();
        this.localData = store.getters.getProfiles.filter((profile) => {
          return (
            profile.name.toLowerCase().includes(searchString) ||
            profile.description.toLowerCase().includes(searchString)
          );
        });
      } else {
        // When filter is empty revert to data from store
        this.localData = store.getters.getProfiles;
      }
    },
  },
};
</script>

<style>
/* Theme variables assigned to root */
:root {
  --background-color-primary: #ffffff;
  --background-color-secondary: #e0e0e0;
  --accent-color-light: #ffffff;
  --accent-color-dark: #f5f5f5;
  --text-primary-color: #222;
  --element-size: 4rem;
  --interactive-color: #2196f3;
  --shadow-value: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
}

:root.dark-theme {
  --background-color-primary: #2c2c2c;
  --background-color-secondary: #979797;
  --accent-color-light: #ddd;
  --accent-color-dark: #3d3d3d;
  --text-primary-color: #e9e9e9;
  --interactive-color: #280078;
  --shadow-value: 0px 0px 10px 0px #a0a0a0, 0px 0px 10px 0px #e7e7e7;
}

body {
  background-color: var(--background-color-primary);
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-primary-color);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  font-size: 1.5em;
}

p {
  margin-bottom: 5px;
}

a {
  color: var(--interactive-color);
}

a:hover {
  cursor: pointer;
}

button {
  display: block;
  padding: 0.8em;
  width: 100%;
  background-color: var(--interactive-color);
  border: 1px solid var(--accent-color-dark);
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  font-size: 0.75em;
  font-weight: 600;
  transition: all ease 0.25s;
}

button:hover:enabled {
  filter: brightness(0.95);
  transition: filter ease 0.25s;
}

button:disabled {
  opacity: 0.5;
}

.content {
  display: flex;
}

.section {
  width: 90%;
  padding: 2em;
  margin-top: 60px;
  position: relative;
  border-radius: 50px;
  background-color: var(--background-color-secondary);
  box-shadow: var(--shadow-value);
  border: 1px solid var(--accent-color-light);
}
.section .description h1 {
  font-size: 20px;
  text-align: left;
}
.section .description {
  font-size: 16px;
  text-align: left;
}
.section.desc {
  padding-bottom: 2em;
}

.profile-form .header {
  margin-top: 0px;
}

.results {
  font-size: 14px;
  margin-top: 0px;
}

.form-container {
  margin-top: 1em;
}

.link {
  font-size: 13px;
  font-weight: 600;
  margin: 0px;
}

@media screen and (min-width: 400px) {
  .section {
    width: 60vw;
    max-width: 15em;
  }
}

@media screen and (max-width: 400px) {
  .section {
    padding: 1.2em;
  }
}

.header {
  color: var(--text-primary-color);
}

.flex-row {
  display: flex;
  margin-bottom: 1em;
}

.label {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 10px 0px 0px 10px;
  background: var(--accent-color-dark);
  color: var(--text-primary-color);
}

.input {
  width: 100%;
  flex: 1;
  padding: 1em;
  border: 0;
  color: var(--text-primary-color);
  background: var(--background-color-primary);
  font-size: 1rem;
  border-radius: 0px 10px 10px 0px;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
}

.buttons {
  display: flex;
  margin-top: 30px;
}

.profile {
  margin-top: 20px;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
}

.list-move {
  transition: transform 0.6s;
}
</style>
