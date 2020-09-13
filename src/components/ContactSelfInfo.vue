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
          v-on:change="handleCurrentKeyChange"
          v-bind:value="key"
        />
        <input
          class="line-input"
          type="text"
          v-on:change="handleCurrentValueChange"
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
      <input class="input-new-line" v-model="addLineKey" type="text" placeholder="Key" />
      <input class="input-new-line" v-model="addLineValue" type="text" placeholder="Value" />
      <button class="btn-line" v-on:click="handleAddLine" type="submit">
        <img class="btn-icon" src="./../assets/more.svg" alt />
      </button>
    </form>
    <button class="btn-line btn-back-step" v-on:click="handleStepBack">
      <img class="btn-icon icon-back-step" src="./../assets/time-out.svg" alt />
    </button>

    <router-link to="/">
      <button class="btn-line btn-back">
        <img class="btn-icon" src="./../assets/return.svg" alt />
      </button>
    </router-link>
  </div>
</template>


<script>
export default {
  name: "ContactSelfInfo",
  data: function () {
    return {
      selectedLine: null,
      selectedInputValue: null,
      selectedInputKey: null,
      addLineKey: null,
      addLineValue: null,
      currentUser: this.$store.getters.getContactById(this.$route.params.id),
    };
  },

  methods: {
    handleAddLine: function (e) {
      e.preventDefault();
      if (this.isEditMode()) {
        return;
      }
      if (this.checkInputsForValid(this.addLineKey, this.addLineValue)) {
        alert(
          "Key and value must contain at least 4 characters and max 13 characters"
        );
        return;
      }
      this.$store.commit("contactAddNewLine", {
        uid: this.currentUser.id,
        newLine: [this.addLineKey, this.addLineValue],
      });
    },

    handleEditLine: function (key, value) {
      if (this.isEditMode()) {
        return;
      }

      this.selectedInputKey = key;
      this.selectedInputValue = value;
      this.selectedLine = key;
    },

    handleSaveLine: function (oldKey, oldValue) {
      if (
        this.checkInputsForValid(this.selectedInputKey, this.selectedInputValue)
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
          [this.selectedInputKey]: this.selectedInputValue,
        },
      });
      this.clearSelectedLine();
    },

    handleCancelEdit: function () {
      if (window.confirm("Are you sure? Cancel editing?")) {
        this.clearSelectedLine();
      }
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
    clearSelectedLine: function () {
      this.selectedLine = null;
      this.selectedInputValue = null;
      this.selectedInputKey = null;
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
    checkInputsForValid: function (inputKey, inputValue) {
      if (
        inputKey === null ||
        inputValue === null ||
        inputKey.length < 4 ||
        inputValue.length < 4 ||
        inputKey.length > 13 ||
        inputValue.length > 13
      ) {
        return true;
      }
      return false;
    },

    checkInputStatus: function () {
      if (this.inputStatus) {
        return true;
      }
      return false;
    },
    handleCurrentKeyChange: function (e) {
      this.selectedInputKey = e.target.value;
    },
    handleCurrentValueChange: function (e) {
      this.selectedInputValue = e.target.value;
    },
    isEditMode: function () {
      if (this.selectedLine !== null) {
        return true;
      }
      return false;
    },

    isReadOnly: function (key) {
      if (key === this.selectedLine) {
        return false;
      }
      return true;
    },
  },
};
</script>


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