<template>
  <div id="app">
    <asteroids
      @remove="remove"
      :asteroids="asteroids"
      header="Near earth objects"
    />
  </div>
</template>

<script >
import Asteroids from "./components/Ateroids";
import axios from "axios"

export default {
  name: "App",
  components: {
    Asteroids,
  },
  data() {
    return {
      asteroids: [],
    };
  },
  created() {
    this.fetchAstereoids();
  },
  methods: {
    fetchAstereoids() {
      let apiKey = "UMQiCZXSffcfzANfzsZBxbliQrW5OVPQk6PKzD6a";
      let url = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`;

      axios.get(url).then(function(res) {
        // vm.asteroids.push(...res.data.near_earth_objects.slice(0, 30));
        this.asteroids = res.data.near_earth_objects.slice(0, 30);
      });
    },
    remove(index) {
      this.asteroids.splice(index, 1);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
