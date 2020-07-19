<template>
  <div>
    <h1>{{ message }}</h1>
    <div v-if="recipes.length > 0">
      <RecipePreviewList title="my meal" :recipes="recipes" />
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      recipes: [],
      message: ""
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.base_url + "/users/showMyMeal"
        );

        //console.log(response);
        const recipes = response.data;
        if (recipes != "OK") {
          this.recipes = [];
          this.recipes.push(...recipes);
        }
        if (this.recipes.length < 1) {
          this.message = "this user don't have favorite recipies yet";
        }

        console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
