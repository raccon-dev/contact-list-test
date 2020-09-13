<template>
  <section class="home">
    <form class="form-add-contact">
      <input
        v-model="contactName"
        class="form-contact-input"
        type="text"
        placeholder="Please type a name..."
      />
      <button v-on:click="handleAddContact" class="btn btn-add">
        <img class="btn-icon" src="./../assets/more.svg" alt />
      </button>
    </form>
    <ul class="error-section">
      <li class="error-self" v-for="error of errors" v-bind:key="error">{{error}}</li>
    </ul>
    <ContactsList />
  </section>
</template>

<script>
import ContactsList from "./ContactsList.vue";

export default {
  name: "Home",
  components: {
    ContactsList,
  },
  data: function () {
    return {
      contactName: null,
      errors: null,
    };
  },
  methods: {
    handleAddContact: function (event) {
      event.preventDefault();
      if (
        this.contactName === null ||
        this.contactName.length < 4 ||
        this.contactName.length > 8
      ) {
        this.errors = [
          "Name must:",
          "- Contain at least 4 characters",
          "- And max 8 characters",
        ];
        return;
      }
      this.errors = null;
      this.$store.commit("createContact", {
        contactName: this.contactName,
      });
    },
  },
};
</script>

<style>
.home {
  max-width: 400px;
  margin: 2rem auto;
  background-color: #f0eaea;
  border-radius: 30px;
  padding: 1rem;
  box-shadow: 0 0 15px rgb(170, 167, 167);
}
.form-contact-input {
  width: 230px;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 18px;
  border-bottom: 1px solid rgb(153, 147, 147);
}
.form-add-contact {
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.error-section {
  width: 300px;
  margin: 0 auto;
}
.error-self {
  list-style: none;
  text-align: start;
  font-size: 16px;
  font-weight: 600;
}
</style>