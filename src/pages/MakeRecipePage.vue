<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1 class="title text-center">{{ recipe.name }}</h1>
        <img :src="recipe2.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3"></div>
            <h3>steps:</h3>
            <ul>
              <li v-for="(r, index) in recipe.steps" :key="index + '_' + r.id">
                <strong> number:</strong> {{ r.number }} <br />
                <strong>discription:</strong> {{ r.step }} <br />

                <strong v-if="r.ingredients.length > 0">ingredients:</strong>

                <ul>
                  <li
                    v-for="(i, index) in r.ingredients"
                    :key="index + '_' + r.ingredients.id"
                  >
                    {{ getUnit(i) }}
                  </li>
                </ul>
                <strong v-if="r.equipment.length > 0">equipment:</strong>

                <ul>
                  <li
                    v-for="(i, index) in r.equipment"
                    :key="index + '_' + r.equipment.id"
                  >
                    {{ i.name }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
      recipe2: null
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

      let { extendedIngredients, image, servings } = response.data;

      let _recipe = {
        extendedIngredients,

        image,

        servings
      };

      this.recipe2 = _recipe;
    } catch (error) {
      console.log(error);
    }
    try {
      let response;
      // response = this.$route.params.response;
      console.log(this.$route.params);
      try {
        response = await this.axios.get(
          this.$root.store.base_url +
            "/recipes/makeRecipe/" +
            this.$route.params.recipeId
        );
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let { name, steps } = response.data[0];

      let _recipe = {
        name,
        steps
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    getUnit: function(ing) {
      console.log(ing.name);

      const extendedIngredients = this.recipe2.extendedIngredients;

      let i = 0;
      for (i = 0; i < this.recipe2.extendedIngredients.length; i++) {
        let currIng = this.recipe2.extendedIngredients[i]["name"];
        if (ing.name == currIng) {
          ing.amount = this.recipe2.extendedIngredients[i]["amount"];
          ing.unit = this.recipe2.extendedIngredients[i]["unit"];
          console.log(ing.name + " " + ing.amount + " " + ing.unit);
          return ing.name + " " + ing.amount + " " + ing.unit;
        }
      }
      return ing.name;
    }
  }
};
</script>

<style scoped>
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
