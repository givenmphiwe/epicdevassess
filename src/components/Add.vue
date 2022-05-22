<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="textInput.name "
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="surname">Surname</label>
        <input
          type="text"
          class="form-control"
          id="surname"
          required
          v-model="textInput.surname"
          name="surname"
        />
      </div>

      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          required
          v-model="textInput.username"
          name="username"
        />
      </div>

      <div class="form-group">
        <label for="password_uid">Password</label>
        <input
          type="text"
          class="form-control"
          id="password_uid"
          required
          v-model="textInput.password_uid"
          name="password"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          class="form-control"
          id="email"
          required
          v-model="textInput.email"
          name="email"
        />
      </div>

      <div class="form-group">
        <label for="homeNumber">Home Number</label>
        <input
          type="text"
          class="form-control"
          id="homeNumber"
          v-model="textInput.homeNumber"
          name="Number"
        />
      </div>

      <div class="form-group">
        <label for="cellNumber">Cell Number</label>
        <input
          type="text"
          class="form-control"
          id="cellNumber"
          required
          v-model="textInput.cellNumber"
          name="cellNumber"
        />
      </div>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="textInput.title"
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="textInput.description"
          name="description"
        />
      </div>
      <button @click="save" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newText">Add</button>
    </div>
  </div>
</template>
<script>
import DataService from "../services/DataServices";
export default {
  name: "add-tutorial",
  data() {
    return {
      textInput: {
        id: null,
        name: "",
        surname: "",
        username: "",
        password_uid: "",
        email: "",
        homeNumber: "",
        cellNumber: "",
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    save() {
      var data = {
        name: this.textInput.name,
        surname: this.textInput.surname,
        username: this.textInput.username,
        password_uid: this.textInput.password_uid,
        email: this.textInput.email,
        homeNumber: this.textInput.homeNumber,
        cellNumber: this.textInput.cellNumber,
        title: this.textInput.title,
        description: this.textInput.description
      };
      DataService.create(data)
        .then(response => {
          this.textInput.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newText() {
      this.submitted = false;
      this.textInput = {};
    }
  }
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>


