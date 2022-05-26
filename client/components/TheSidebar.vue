<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <o-sidebar
        position="absolute"
        fullheight
        open
        :reduce.sync="reduce"
        :mobile="mobile"
      >
        <section class="flex pt-8">
          <div
            class="bg-inherit hover:bg-white text-black font-normal inline-flex"
          >
            <o-icon pack="fas" icon="home"> </o-icon>
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
