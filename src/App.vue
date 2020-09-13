<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.btn {
  cursor: pointer;
  font-size: 17px;
  border: none;
  width: 70px;
  height: 35px;
}
.btn-icon {
  width: 25px;
}
.btn-add{
  background-color: transparent;
  width: 25px;
  height: 25px;
  outline: none;
}
</style>
