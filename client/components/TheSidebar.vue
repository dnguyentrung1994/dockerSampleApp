<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <o-sidebar fullheight open>
        <section style="padding: 1em">
          <h5>Example 1</h5>
          <h5>Example 2</h5>
          <h5>Example 3</h5>
          <h5>Example 4</h5>
          <h5>Example 5</h5>
        </section>
      </o-sidebar>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  watch: {
    reduce() {
      console.log(this.reduce);
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
}
.sidebar-layout {
  display: flex;
  flex-direction: row;
  min-height: 100%;
}
</style>
