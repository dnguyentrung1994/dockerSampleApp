<template>
  <div>
    <div
      class="sticky flex top-0 min-w-full bg-black align-middle z-40 h-10 justify-between"
    >
      <button
        variant="primary"
        class="bg-black text-white font-normal py-2 px-4 rounded inline-flex items-center hover:bg-gray-600 transition-all"
        :class="displaySidebar ? buttonSizeFull : buttonSizeReduced"
        @click="toggleSidebar"
      >
        <svg
          class="w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <rect width="20px" height="3px" rx="1px" class="fill-white" />
          <rect y="8px" width="20px" height="3px" rx="1px" class="fill-white" />
          <rect
            y="16px"
            width="20px"
            height="3px"
            rx="1px"
            class="fill-white"
          />
        </svg>
        <span :hidden="!displaySidebar">Placeholder</span>
      </button>

      <o-field class="max-w-[500px] space-x-8">
        <o-input placeholder="Search..." expanded></o-input>
        <o-button variant="primary">Search</o-button>
      </o-field>

      <div class="flex flex-row">
        <button
          variant="primary"
          class="bg-black text-white font-normal py-2 px-4 inline-flex items-center hover:bg-gray-600 transition-all pr-4 border-r-[1px] border-solid border-white"
          @click="toggleLogin"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          <span>Login</span>
        </button>

        <button
          variant="primary"
          class="bg-black text-white font-normal py-2 px-4 inline-flex items-center hover:bg-gray-600 transition-all pl-4 border-r-2 border-solid border-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          <span>Register</span>
        </button>
      </div>
    </div>
    <TheSidebar :displaySidebar="!displaySidebar" />
    <the-login-form v-show="loginClicked" @closeLoginModal="toggleLogin" />
  </div>
</template>

<script>
import TheLoginForm from "./TheLoginForm.vue";
export default {
  components: { TheLoginForm },
  data: () => {
    return {
      displaySidebar: false,
      buttonSizeReduced: "w-20",
      buttonSizeFull: "w-[260px]",
      loginClicked: false,
    };
  },
  watch: {
    displaySidebar() {
      console.log(this.displaySidebar);
    },
    loginClicked() {
      console.log(this.loginClicked);
    },
  },
  methods: {
    toggleSidebar() {
      this.displaySidebar = !this.displaySidebar;
    },
    toggleLogin() {
      this.loginClicked = !this.loginClicked;
    },
  },
};
</script>

<style scoped>
.navbar-view {
  position: sticky;
  display: flex;
  top: 0;
  min-width: 100%;
  min-height: 40px;
  background-color: black;
  align-content: center;
  z-index: 40;
}
.navbar-item {
  display: flex;
}
</style>
>
