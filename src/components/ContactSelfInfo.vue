<template>
  <div class="self-contact-info">
    <div class="avatar-container">
      <img
        v-show="currentUser.avatar !== ''"
        class="self-avatar"
        v-bind:src="currentUser.avatar"
        alt="avatar"
      />
    </div>

    <h2>{{ currentUser.name }}</h2>
    <ul v-for="[key, value] of Object.entries(currentUser.userSelfInfo)" :key="key">
      <li>
        <input
          v-bind:readonly="isReadOnly(key)"
          class="line-input"
          type="text"
          v-on:change="handleKeyInputChange"
          v-bind:value="key"
        />
        <input
          class="line-input"
          type="text"
          v-on:change="handleValueInputChange"
          v-bind:readonly="isReadOnly(key)"
          v-bind:value="value"
        />

        <button
          class="btn-line"
          v-if="selectedLine !== key"
          v-on:click="handleEditLine(key, value)"
        >
          <img class="btn-icon" src="./../assets/pencil.svg" alt />
        </button>
        <button class="btn-line" v-if="selectedLine === key" v-on:click="handleSaveLine(key,value)">
          <img class="btn-icon" src="./../assets/save.svg" alt />
        </button>

        <button class="btn-line" v-if="selectedLine !== key" v-on:click="handleRemoveLine(key)">
          <img class="btn-icon" src="./../assets/delete.svg" alt />
        </button>
        <button class="btn-line" v-if="selectedLine === key" v-on:click="handleCancelEdit()">
          <img class="btn-icon" src="./../assets/cancel.svg" alt />
        </button>
        <hr class="line-medium" />
      </li>
    </ul>
    <form class="form-new-line">
      <input class="input-new-line" v-on:change="handleKeyChange" type="text" placeholder="Key" />
      <input class="input-new-line" v-on:change="handleValueChange" type="text" placeholder="Value" />
      <button class="btn-line" v-on:click="handleAddLine" type="submit">
        <img class="btn-icon" src="./../assets/more.svg" alt />
      </button>
    </form>
    <button class="btn-line btn-back-step" v-on:click="handleStepBack">
      <img class="btn-icon icon-back-step" src="./../assets/time-out.svg" alt />
    </button>

    <router-link to="/">
      <button class="btn-line btn-back" v-on:click="handlePageBack">
        <img class="btn-icon" src="./../assets/return.svg" alt />
      </button>
    </router-link>
  </div>
</template>

<style>
.self-contact-info {
  position: relative;
}
.icon-back-step {
  width: 40px;
}
.btn-back {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
}
.btn-back-step {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
.form-new-line {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}
.input-new-line {
  border: none;
  outline: none;
  border-bottom: 1px solid gray;
}
.self-contact-info .line-medium {
  width: 330px;
}
.btn-line {
  margin-right: 10px;
  background-color: transparent;
  border: none;
  outline: none;
}
ul {
  margin: 0;
  padding: 0;
}
.line-input,
.input-new-line {
  background-color: transparent;
  font-size: 17px;
  width: 120px;
  margin: 0 5px;
}
li {
  list-style: none;
}
.self-contact-info .avatar-container {
  width: 150px;
  height: 150px;
  border-radius: 100px;
  box-shadow: 0 0 10px gray;
  margin: 0 auto;
}
.self-avatar {
  width: 150px;
  height: 150px;
  border-radius: 100px;
  object-fit: cover;
}
.self-contact-info {
  margin: 2rem auto;

  max-width: 400px;
  background-color: #f0eaea;
  border-radius: 30px;
  padding: 1rem;
  box-shadow: 0 0 15px rgb(170, 167, 167);
}
.line-input {
  border: none;
  outline: none;
}
</style>

<script>
export default {
  name: "ContactSelfInfo",
  data: function () {
    return {
      selectedLine: null,
      autoFocusStatus: false,
      inputValue: null,
      inputKey: null,
      lineKey: null,
      lineValue: null,
      currentUser: this.$store.getters.getContactById(this.$route.params.id),
    };
  },

  methods: {
    handlePageBack: function () {
      console.log("asdasd");
    },
    handleStepBack: function () {
      if (this.isEditMode()) {
        return;
      }
      this.$store.commit("stepBack");
      this.currentUser = this.$store.getters.getContactById(
        this.$route.params.id
      );
      this.$store.commit("clearEditingCache", {});
    },
    handleAddLine: function (e) {
      e.preventDefault();
      if (this.isEditMode()) {
        return;
      }
      if (
        this.lineKey === null ||
        this.lineKey.length < 4 ||
        this.lineValue === null ||
        this.lineValue.length < 4 ||
        this.lineKey.length > 13 ||
        this.lineValue.length > 13
      ) {
        alert(
          "Key and value must contain at least 4 characters and max 13 characters"
        );
        return;
      }
      this.$store.commit("contactAddNewLine", {
        uid: this.currentUser.id,
        newLine: [this.lineKey, this.lineValue],
      });
    },
    handleValueChange: function (e) {
      this.lineValue = e.target.value;
    },
    handleKeyChange: function (e) {
      this.lineKey = e.target.value;
    },
    handleRemoveLine: function (key) {
      if (this.isEditMode()) {
        return;
      }
      if (window.confirm(`Are you sure? Delete line of ${key}`)) {
        this.$store.commit("contactRemoveLine", {
          uid: this.currentUser.id,
          key,
        });
      }
    },
    checkInputStatus: function () {
      if (this.inputStatus) {
        return true;
      }
      return false;
    },
    handleKeyInputChange: function (e) {
      this.inputKey = e.target.value;
    },
    handleValueInputChange: function (e) {
      this.inputValue = e.target.value;
    },
    isEditMode: function () {
      if (this.selectedLine !== null) {
        return true;
      }
      return false;
    },

    handleEditLine: function (key, value) {
      if (this.isEditMode()) {
        return;
      }
      this.inputKey = key;
      this.inputValue = value;

      this.selectedLine = key;
    },
    handleSaveLine: function (oldKey, oldValue) {
      if (
        this.inputKey === null ||
        this.inputValue === null ||
        this.inputKey.length < 4 ||
        this.inputValue.length < 4 ||
        this.inputKey.length > 13 ||
        this.inputValue.length > 13
      ) {
        alert("Please type correct new Values");
        return;
      }
      this.$store.commit("contactEditLine", {
        uid: this.currentUser.id,
        oldData: {
          [oldKey]: oldValue,
        },
        newData: {
          [this.inputKey]: this.inputValue,
        },
      });
      console.log("old data", oldKey, oldValue);
      console.log("new data", this.inputKey, this.inputValue);

      this.selectedLine = null;
      this.inputValue = null;
      this.inputKey = null;
    },
    isReadOnly: function (key) {
      if (key === this.selectedLine) {
        return false;
      }
      return true;
    },
    handleCancelEdit: function () {
      if (window.confirm("Are you sure? Cancel editing?")) {
        this.selectedLine = null;
        this.inputValue = null;
        this.inputKey = null;
      }
    },
  },
};
</script>

