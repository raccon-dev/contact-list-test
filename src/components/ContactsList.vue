<template>
  <ul class="contacts-list">
    <li class="contact-item" v-for="contact in $store.getters.getContacts" :key="contact.id">
      <Contact :name="contact.name" :id="contact.id" :avatar="contact.avatar" />
         <hr class="line-medium">
    </li>
  </ul>
</template>

<script>
import Contact from "./Contact.vue";

export default {
  name: "ContactsList",
  components: {
    Contact,
  },
};
</script>

<style>
.form-contact-input {
  font-size: 17px;
  width: 300px;
  height: 30px;
}
.contact-item {
  list-style: none;
}
.contacts-list{
  padding: 0;
}

.line-medium{
  width: 250px;
  color: rgb(245, 245, 245);
}
</style>