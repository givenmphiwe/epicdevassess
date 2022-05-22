<template>
  <div v-if="current" class="edit-form">
    <h4>Assessment</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="current.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="current.description"
        />
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ current.published ? "Published" : "Pending" }}
      </div>
    </form>
    <button class="badge badge-primary mr-2"
      v-if="current.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>
    <button class="badge badge-danger mr-2"
      @click="deleteA"
    >
      Delete
    </button>
    <button type="submit" class="badge badge-success"
      @click="update"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a description/title...</p>
  </div>
</template>
<script>
import DataService from "../services/DataServices";
export default {
  name: "home-details",
  data() {
    return {
      current: null,
      message: ''
    };
  },
  methods: {
    get(id) {
      DataService.get(id)
        .then(response => {
          this.current = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updatePublished(status) {
      var data = {
        id: this.current.id,
        title: this.current.title,
        description: this.current.description,
        published: status
      };
      DataService.update(this.current.id, data)
        .then(response => {
          console.log(response.data);
          this.current.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    update() {
      DataService.update(this.current.id, this.current)
        .then(response => {
          console.log(response.data);
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteA() {
      DataService.delete(this.current.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getTutorial(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>