<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Home List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(Assessment, index) in Assess"
          :key="index"
          @click="setActive(Assessment, index)"
        >
          {{ Assessment.title }}
        </li>
      </ul>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAll">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="current">
        <h4>Home</h4>
        <div>
          <label><strong>Title:</strong></label> {{ current.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ current.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ current.published ? "Published" : "Pending" }}
        </div>
        <router-link :to="'/Home/' + current.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a title/description...</p>
      </div>
    </div>
  </div>
</template>
<script>
import DataService from "../services/DataServices";
export default {
  name: "Home-list",
  data() {
    return {
      Assess: [],
      current: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveT() {
      DataService.getAll()
        .then(response => {
          this.Assess = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveT();
      this.current = null;
      this.currentIndex = -1;
    },
    setActive(Assessment, index) {
      this.current = Assessment;
      this.currentIndex = Assessment ? index : -1;
    },
    removeAll() {
      DataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      DataService.findByTitle(this.title)
        .then(response => {
          this.Assess = response.data;
          this.setActive(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveT();
  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>