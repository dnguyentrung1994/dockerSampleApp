<template>
  <div class="navbar-view">
    <div class="navbar-item">
      <o-button variant="primary" @click="() => toggleSidebar()" inverted>
        <div class="block">
          <o-icon pack="fas" icon="list" size="large"></o-icon>
        </div>
      </o-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      displaySidebar: false,
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
  min-height: 20px;
  background-color: lightgray;
}
.navbar-item {
  display: block;
}
</style>
>
