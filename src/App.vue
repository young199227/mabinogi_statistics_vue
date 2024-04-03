<script setup>
import { ref } from "vue";
import axios from "axios";

getCookie();
function getCookie() {
  if (checkCookieExists()) {
    // console.log("'cookie' cookie 已存在");
    // console.log(getCookieValue());
    return;
  }
  axios
    .get(window.apiDns + "/token")
    .then((response) => {
      // console.log(response.data.data);

      const date = new Date();
      //時間為+5分鐘
      date.setTime(date.getTime() + 5 * 60 * 1000);
      const expires = "expires=" + date.toUTCString();
      document.cookie =
        "cookie=" + response.data.data.token + ";" + expires + ";path=/";
    })
    .catch((error) => {
      console.error(error);
    });
}
function checkCookieExists() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("cookie" + "=")) {
      return true;
    }
  }
  return false;
}
function getCookieValue() {
  const cookieName = 'cookie';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + '=')) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null;
}
</script>
<template>
  <div class="container">
    <!-- <router-link to="/">Home</router-link>
    <router-link to="/create">Create</router-link> -->
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>
