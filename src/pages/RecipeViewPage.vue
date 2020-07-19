<template>
  <div class="container">
    <div v-if="recipe">
      <div class="text-center" align-v="center">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="img-thumbnail center" />
        <b-container class="bv-example-row">
          <b-row>
            <b-col>
              <b-button
                v-bind:disabled="saved"
                v-on:click="addToFavorite(recipe.id)"
                variant="success"
              >
                <img :src="favorite" style="width: 90px; height: 90px;" />
                Add To Favorite</b-button
              ></b-col
            >
            <b-col
              ><span v-if="recipe.vegetarian">
                <img
                  :src="vegeterian"
                  style="width: 100px; height: 100px;"
                /> </span
            ></b-col>
            <b-col
              ><span v-if="recipe.vegan">
                <img :src="vegan" style="width: 100px; height: 100px;" /> </span
            ></b-col>
            <b-col
              ><span v-if="recipe.glutenFree">
                <img
                  :src="glutenFree"
                  style="width: 100px; height: 100px;"
                /> </span
            ></b-col>
          </b-row>
        </b-container>
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>
                <h2>Ready in {{ recipe.readyInMinutes }} minutes</h2>
              </div>
              <div>
                <h2>Likes: {{ recipe.aggregateLikes }} likes</h2>
              </div>
              <div>
                <h2>servings: {{ recipe.servings }}</h2>
              </div>
            </div>
            <div>
              <h2>Ingredients:</h2>
              <h3>
                <ul>
                  <li
                    v-for="(r, index) in recipe.extendedIngredients"
                    :key="index + '_' + r.id"
                  >
                    {{ r.name }}
                    {{ r.amount }}
                    {{ r.unit }}
                  </li>
                </ul>
              </h3>
            </div>
          </div>
          <div class="wrapped">
            <h2>Instructions:</h2>
            <h3>
              <ol>
                <li v-for="s in recipe.instructions" :key="s.number">
                  {{ s.step }}
                </li>
              </ol>
            </h3>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      saved: false,
      recipe: null,
      glutenFree:
        "https://res.cloudinary.com/df6ppuehr/image/upload/v1594972994/gluten-free_b5cvvo.png",
      vegan:
        "https://res.cloudinary.com/df6ppuehr/image/upload/v1594973166/vegan_gmdmui.jpg",
      vegeterian:
        "https://res.cloudinary.com/df6ppuehr/image/upload/v1594973020/vegaterian_j4t6yu.jpg",
      favorite:
        "https://res.cloudinary.com/df6ppuehr/image/upload/v1595166655/favoritejpg_sgtgmg.jpg",
      showButton: false,
      disabled: false
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
        response = await this.axios.get(
          this.$root.store.base_url +
            "/recipes/fullRecipe/" +
            this.$route.params.recipeId
        );

        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        //analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegetarian,
        vegan,
        glutenFree,
        servings,
        id
      } = response.data;

      let _recipe = {
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegetarian,
        vegan,
        glutenFree,
        servings,
        id
      };

      this.recipe = _recipe;
      this.showButton = true;
    } catch (error) {
      console.log(error);
    }
    this.updateButton();
  },
  methods: {
    async addToFavorite(id) {
      try {
        const response = await this.axios.put(
          this.$root.store.base_url + "/users/addRecipeToFavorite/" + id
        );
        this.saved = true;
      } catch (error) {
        console.log(error);
      }
    },
    async updateButton() {
      try {
        if (this.$root.store.username) {
          const ids = [];
          ids.push(this.recipe.id);
          const response = await this.axios.get(
            this.$root.store.base_url +
              "/users/getUserInfoOnRecipes/[" +
              ids +
              "]"
          );
          if (response.data[0]) {
            this.saved = response.data[0][this.recipe.id].saved;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  background-image: url("https://res.cloudinary.com/df6ppuehr/image/upload/v1595070963/Web-Page-Background-Color_bxwjaj.jpg");
  background-size: 1200px 2000px;
}
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

/* .recipe-header{

} */
</style>
