<template>
  <div class="container">
    <div v-if="recipe">
      <div class="text-center" align-v="center">
        <h1>{{ recipe.recipe_name }}</h1>
        <img :src="recipe.image" class="center" />
        <b-container class="bv-example-row">
          <b-row>
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
        <br />
        <br />
      </div>

      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>
                <h2>Ready in {{ recipe.readyInMinutes }} minutes</h2>
              </div>
              <span v-if="personal">
                <div>
                  <h2>Likes: {{ recipe.popularity }} likes</h2>
                </div>
                <div>
                  <h2>servings: {{ recipe.servings }}</h2>
                </div>
              </span>

              <span v-if="!personal">
                <div>
                  <h2>Owner: {{ recipe.recipe_owner }}</h2>
                </div>
                <div>
                  <h2>event: {{ recipe.recipe_event }}</h2>
                </div>
              </span>
            </div>
            <h2>Ingredients:</h2>
            <h3>
              <ul>
                <li
                  v-for="(r, index) in recipe.ingrediants"
                  :key="index + '_' + r.ingrediant_id"
                >
                  {{ r.ingrediant_name }}
                  {{ r.amount }}
                  {{ r.unit }}
                </li>
              </ul>
            </h3>
          </div>
          <div class="wrapped">
            <h2>Instructions:</h2>
            <h3>
              <ol>
                <li v-for="s in recipe.instructions" :key="s.instruction_id">
                  {{ s.description }}
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
      recipe: null,
      personal: true,
      glutenFree:
        "https://res.cloudinary.com/df6ppuehr/image/upload/v1594972994/gluten-free_b5cvvo.png",
      vegan:
        "https://res.cloudinary.com/df6ppuehr/image/upload/v1594973166/vegan_gmdmui.jpg",
      vegeterian:
        "https://res.cloudinary.com/df6ppuehr/image/upload/v1594973020/vegaterian_j4t6yu.jpg",
      watchedIcon:
        "https://res.cloudinary.com/df6ppuehr/image/upload/v1594977304/watching_iadtbv.png",
      notWatchedIcon:
        "https://res.cloudinary.com/df6ppuehr/image/upload/v1594977185/notWatched_gdlikc.png"
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;
      try {
        if (this.$route.params.family) {
          response = await this.axios.get(
            this.$root.store.base_url + "/users/myFamilyRecipes"
          );
          const recipies = response.data;
          console.log(recipies);
          if (recipies[0].recipe_id == this.$route.params.recipeId) {
            response.data = recipies[0];
          } else if (recipies[1].recipe_id == this.$route.params.recipeId) {
            response.data = recipies[1];
          } else {
            response.data = recipies[2];
          }

          // $each(response.data, function(key, value) {
          //   //if (value.recipe_id == this.$route.params.recipeId) {
          //   //console.log(value);
          //   //}
          // });

          //response=response.data[0][]
          this.personal = false;
        } else {
          response = await this.axios.get(
            this.$root.store.base_url +
              "/users/myPersonalFullRecipes/" +
              this.$route.params.recipeId
          );
          this.personal = true;
        }

        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        instructions,
        ingrediants,
        popularity,
        readyInMinutes,
        image,
        recipe_name,
        vegetarian,
        vegan,
        glutenFree,
        servings,
        recipe_owner,
        recipe_event
      } = response.data;

      let _recipe = {
        instructions,
        ingrediants,
        popularity,
        readyInMinutes,
        image,
        recipe_name,
        vegetarian,
        vegan,
        glutenFree,
        servings,
        recipe_owner,
        recipe_event
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
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
