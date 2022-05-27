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

      <button
        variant="primary"
        class="bg-black text-white font-normal py-2 px-4 rounded inline-flex items-center hover:bg-gray-600 transition-all"
      >
        <span>Login</span>
      </button>
    </div>
    <TheSidebar :displaySidebar="!displaySidebar" />
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      displaySidebar: false,
      buttonSizeReduced: "w-20",
      buttonSizeFull: "w-[260px]",
    };
  },
  watch: {
    displaySidebar() {
      console.log(this.displaySidebar);
    },
  },
  methods: {
    toggleSidebar() {
      this.displaySidebar = !this.displaySidebar;
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
