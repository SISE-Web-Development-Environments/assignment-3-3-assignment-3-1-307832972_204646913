<template>
  <b-container class="container">
    <b-row>
      <b-col>
        <div class="title text-center">
          <img :src="pic" style="width: 500px; height: 400px;" />
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <RandomRecipePreviewList
          title="Randome Recipes"
          class="RandomRecipes center"
        />
      </b-col>
      <b-col v-if="!$root.store.username">
        <LoginPage></LoginPage>
      </b-col>
      <b-col v-else>
        <LastWatchedRecipePreviewList></LastWatchedRecipePreviewList>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RandomRecipePreviewList from "../components/RandomRecipePreviewList";
import LastWatchedRecipePreviewList from "../components/LastWatchedRecipePreviewList";
import LoginPage from "../pages/LoginPage";
export default {
  data() {
    return {
      pic:
        "https://res.cloudinary.com/df6ppuehr/image/upload/v1594990708/logo_cda2cj.jpg"
    };
  },
  components: {
    RandomRecipePreviewList,
    LastWatchedRecipePreviewList,
    LoginPage
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
</style>
