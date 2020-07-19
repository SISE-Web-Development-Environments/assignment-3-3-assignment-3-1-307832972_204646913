<template>
  <div>
    <RecipePreviewList
      title="Explore these recipes"
      :recipes="recipes"
      :order="true"
    />
    <div class="text-center">
      <b-button pill v-on:click="updateRecipes" variant="outline-success"
        >Switch Random Recipies</b-button
      >
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "./RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.base_url + "/recipes/threeRandomRecipes"
        );

        //console.log(response);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
