<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <o-sidebar
        position="absolute"
        fullheight
        open
        :reduce="reduce"
        :mobile="mobile"
        :class="reduce ? classReduced : classFull"
      >
        <section class="flex pt-10">
          <div
            class="bg-inherit hover:bg-white text-black font-normal flex flex-row w-full transition-all h-[30px] pl-4"
          >
            <NuxtLink to="/" class="flex flex-row">
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span v-if="!reduce" class="pl-5">Home</span>
            </NuxtLink>
          </div>
        </section>
      </o-sidebar>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reduce: true,
      iconSizeStyle: "w-6 h-6",
      iconMargin: "mr-4",
      mobile: "reduced",
      classReduced: "max-w-[40px]",
      classFull: "max-w-[160px]",
    };
  },
  props: ["displaySidebar"],
  watch: {
    displaySidebar: function (value) {
      this.reduce = value;
    },
  },

  methods: {
    toggleSidebar() {
      this.reduce = !this.reduce;
    },
  },
};
</script>

<style>
.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  transition: 300ms;
}
.sidebar-layout {
  display: flex;
  flex-direction: row;
  min-height: 100%;
}
</style>
