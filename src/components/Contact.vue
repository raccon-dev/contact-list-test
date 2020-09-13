<template>
  <div class="contact">
    <div class="avatar-container">
      <img
       v-show="avatar !== ''"
        class="avatar-image" 
        v-bind:src="avatar" 
      
        alt="avatar" />
    </div>
    <h3 class="title-name">{{name}}</h3>
    <button v-on:click="contactSelfInfo" class="btn btn-info"><img class="btn-icon" src="./../assets/information.svg" alt=""></button>
    <button v-on:click="deleteContact" class="btn btn-delete"><img class="btn-icon" src="./../assets/delete.svg" alt=""></button>
  </div>
</template>

<script>
export default {
  name: "Contact",
  props: {
    name: String,
    id: Number,
    avatar: String,
  },
  methods: {
    deleteContact: function () {
      if (window.confirm(`Are u sure? Delete ${this.name}?`)) {
        this.$store.commit("deleteContact", {
          id: this.id,
        });
      }
    },
    contactSelfInfo: function () {
      this.$router.push({ path: `/contact/${this.id}` });

      console.log("Info");
    },
  },
};
</script>

<style>
.contact {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-delete,
.btn-info {
  margin-left: 20px;
  background-color: transparent;
  width: 30px;
  outline: none;
}
.btn-icon{
  width: 30px;
}
.title-name{
  width: 100px;
}
.avatar-container, .avatar-image {
  width: 50px;
  height: 50px;
  margin-right: 20px;
  background-color: rgb(199, 193, 193);
  border-radius: 50px;
}
.avatar-image{
  object-fit: cover;
  box-shadow: 0 0 5px gray;
}
</style>