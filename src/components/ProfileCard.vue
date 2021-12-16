<template>
  <div class="profile">
    <transition name="list">
      <div class="card" v-if="show">
        <UserIcon class="avatar" />
        <div class="data">
          <div class="profile-content">
            <div>
              <strong>{{ profile.name }}</strong>
            </div>
            <div class="description">{{ profile.description }}</div>
          </div>
        </div>
        <a class="delete-btn" @click="handleDelete">X</a>
      </div>
    </transition>
  </div>
</template>

<script>
import UserIcon from "./UserIcon";

export default {
  name: "ProfileCard",
  components: {
    UserIcon,
  },
  data() {
    return {
      show: true,
    };
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleDelete: function () {
      this.show = false; // Trigger animation on delete
      this.$emit("delete", this.profile.id);
    },
  },
};
</script>
<style scoped>
.card {
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
  color: rgb(82, 82, 82);
  border-radius: 50px;
  background: var(--accent-color-light);
}

.avatar {
  width: 28px;
  min-width: 28px;
  height: 28px;
  border-radius: 100%;
}

.data {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.profile-content {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 15px;
}

.email {
  margin-left: 15px;
}

.description {
  margin-top: 5px;
  margin-right: 10px;
}

.delete-btn {
  margin: 0vw 2vw 0vw auto;
  border-radius: 40px;
  background: #f9f9f9;
  min-width: 24px;
  height: 24px;
  font-weight: 600;
  font-size: 10px;
  color: #777777;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffffff;
  box-shadow: 0px 0px 3px -1px #464646;
  transition: all ease 0.25s;
}

.delete-btn:hover {
  background: #ffffff;
  cursor: pointer;
  transition: all ease 0.25s;
}

.list-enter-active,
.list-leave-active {
  right: 0px;
  transition: all 0.4s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  position: relative;
  right: 400px;
}
</style>