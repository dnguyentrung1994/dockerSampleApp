<template>
  <div>
    <the-navbar />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const refreshToken = useCookie<string>("refresh_token");
console.log(refreshToken.value !== undefined);
</script>
