<template>
  <b-navbar type="dark" variant="dark">
    <div class="title text-center">
      <img
        :src="pic"
        style="width: 60px; height: 60px;"
        class="d-inline-block align-top"
        alt=""
      />
    </div>
    <router-link tag="b-navbar-brand" :to="{ name: 'main' }"
      ><h4>Grandmother Recipies</h4></router-link
    >|
    <b-navbar-nav>
      <router-link tag="b-nav-item" :to="{ name: 'main' }">
        <b-button variant="info">Main</b-button></router-link
      >|
      <router-link tag="b-nav-item" :to="{ name: 'search' }">
        <b-button variant="info">Search</b-button></router-link
      >|
      <router-link tag="b-nav-item" :to="{ name: 'AboutPage' }">
        <b-button variant="info">About</b-button></router-link
      >|
      <b-dropdown
        class="m-2"
        variant="info"
        v-if="$root.store.username"
        text="Personal"
        right
      >
        <b-dropdown-item href="#">
          <router-link :to="{ name: 'favoriteRecipe' }"> Favorites</router-link>
        </b-dropdown-item>
        <b-dropdown-item href="#">
          <router-link :to="{ name: 'personalRecipe' }">Private</router-link>
        </b-dropdown-item>
        <b-dropdown-item>
          <router-link :to="{ name: 'familyRecipe' }">La Familia</router-link>
        </b-dropdown-item>
      </b-dropdown>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <span v-if="!$root.store.username">
        <span style="color:#f5f5f0; font-family:verdana;">Hello guest</span>
        <router-link :to="{ name: 'login' }">
          <b-button variant="info">Login</b-button> </router-link
        >|
        <router-link :to="{ name: 'register' }">
          <b-button variant="info">Register</b-button></router-link
        >|
      </span>
      <span v-else>
        <span style="color:#f5f5f0; font-family:verdana;"
          >Hello, {{ $root.store.username }}
        </span>
        <b-button @click="Logout" variant="danger">Logout</b-button>
      </span>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      pic:
        "https://res.cloudinary.com/df6ppuehr/image/upload/v1594991459/logo3_crmchq.png"
    };
  },

  methods: {
    async Logout() {
      try {
        const response = await this.axios.get(
          this.$root.store.base_url + "/logout"
        );

        console.log(this.$root.store.login);
        this.$root.store.logout();
        if (this.$router.name != "main") {
          this.$router.push("/").catch();
        }
        //this.$router.push("/").catch();
      } catch (err) {
        console.log(err.response);
      }
    }
  }
};
</script>

<style></style>
