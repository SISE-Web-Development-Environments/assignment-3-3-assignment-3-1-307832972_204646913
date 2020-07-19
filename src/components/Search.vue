<template>
  <div class="text-center" align-v="center">
    <b-form @submit.prevent="onSearch" @reset.prevent="onReset">
      <b-container fluid="xl">
        <b-row>
          <b-col sm="6"
            ><b-form-group
              id="input-group-username"
              label-cols-sm="3"
              label-for="recipeSearch"
              label="Find a Recipe:"
            >
              <b-form-input
                id="recipeSearch"
                v-model="$v.form.recipeSearch.$model"
                type="text"
                :state="validateState('recipeSearch')"
                placeholder="please insert recipe name"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.recipeSearch.required">
                recipe is required
              </b-form-invalid-feedback>
            </b-form-group></b-col
          >
          <b-col sm="6"
            ><b-form-group
              id="input-group-Number"
              label-cols-sm="3"
              label="Number of results:"
              label-for="Number"
            >
              <b-form-select
                id="Number"
                v-model="$v.form.Number.$model"
                :options="numbers"
              ></b-form-select> </b-form-group
          ></b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <b-form-group
              id="input-group-cuisine"
              label-cols-sm="3"
              label="Cuisine:"
              label-for="Cuisine"
            >
              <b-form-select
                id="Cuisine"
                v-model="$v.form.Cuisine.$model"
                :options="cuisine"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group
              id="input-group-diet"
              label-cols-sm="3"
              label="Diet:"
              label-for="Diet"
            >
              <b-form-select
                id="Diet"
                v-model="$v.form.Diet.$model"
                :options="diet"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group
              id="input-group-intolerance"
              label-cols-sm="3"
              label="Intolerance:"
              label-for="Intolerance"
            >
              <b-form-select
                id="Intolerance"
                v-model="$v.form.Intolerance.$model"
                :options="intolerance"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="text-center" align-v="center">
          <b-col>
            <b-button type="submit" variant="primary" style="width:250px;"
              >Search</b-button
            >
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col sm="4">
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-col>
          <b-col sm="4">
            <b-button
              :disabled="disabled"
              v-on:click="sortByLikes"
              variant="success"
              >sort by likes</b-button
            >
          </b-col>
          <b-col sm="4">
            <b-button
              :disabled="disabled"
              v-on:click="sortByTime"
              variant="success"
              >sort by time</b-button
            >
          </b-col>
        </b-row>
      </b-container>
    </b-form>
    <br />
    <h1>{{ message }}</h1>
    <div>
      <b-row>
        <div v-for="r in recipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
        </div>
      </b-row>
    </div>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import cuisine from "../assets/cuisine";
import diet from "../assets/diet";
import intolerance from "../assets/intolerance";
import numbers from "../assets/numbers";

//import RecipePreviewList from "./RecipePreviewList";
import RecipePreview from "./RecipePreview";
//import countries from "../assets/countries";

import { required } from "vuelidate/lib/validators";

export default {
  name: "Search",
  components: {
    RecipePreview
  },
  data() {
    return {
      recipes: [],
      form: {
        recipeSearch: "",
        Cuisine: null,
        Diet: null,
        Intolerance: null,
        Number: 5
      },
      disabled: true,

      message: "",
      //countries: [{ value: null, text: "", disabled: true }],
      diet: [{ value: null, text: "", disabled: true }],
      cuisine: [{ value: null, text: "", disabled: true }],
      intolerance: [{ value: null, text: "", disabled: true }],
      numbers: [{ value: null, text: "", disabled: true }]
    };
  },
  validations: {
    form: {
      recipeSearch: {
        required
      },
      Cuisine: {},
      Diet: {},
      Intolerance: {},
      Number: {}
    }
  },
  async created() {
    this.searched = false;

    if (this.$root.store.username) {
      if (localStorage.getItem(this.$root.store.username)) {
        this.recipes = JSON.parse(
          localStorage.getItem(this.$root.store.username)
        );
        if (this.recipes.length > 0) {
          this.message =
            this.recipes.length + " results returned from your last search";
          this.disabled = false;
        } else {
          this.message = "no results from your last search";
          this.disabled = true;
        }
      } else {
        localStorage.setItem(
          this.$root.store.username,
          JSON.stringify(this.recipes)
        );
      }
    }
  },
  mounted() {
    this.cuisine.push(...cuisine);
    this.diet.push(...diet);
    this.intolerance.push(...intolerance);
    this.numbers.push(...numbers);

    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Search() {
      try {
        const response = await this.axios.get(
          this.$root.store.base_url +
            "/recipes/search/query/" +
            this.form.recipeSearch +
            "/amount/" +
            this.form.Number,
          {
            params: {
              cuisine: this.form.Cuisine,
              diet: this.form.Diet,
              intolerances: this.form.Intolerance
            }
          }
        );
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        if (this.$root.store.username) {
          localStorage.setItem(
            this.$root.store.username,
            JSON.stringify(this.recipes)
          );
        }
        if (recipes.length > 0) {
          this.message = recipes.length + " results returned from your search";

          this.disabled = false;
        } else {
          this.message = "no results from your search";
          this.disabled = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSearch() {
      this.form.submitError = undefined;

      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Search();
    },
    onReset() {
      this.form = {
        recipeSearch: "",
        Cuisine: null,
        Diet: null,
        Intolerance: null,
        Number: null
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    sortByLikes() {
      function compareLikes(a, b) {
        if (a.aggregateLikes < b.aggregateLikes) {
          return -1;
        }
        if (a.aggregateLikes > b.aggregateLikes) {
          return 1;
        }
        return 0;
      }
      return this.recipes.sort(compareLikes);
    },
    sortByTime() {
      function compareTime(a, b) {
        if (a.readyInMinutes < b.readyInMinutes) {
          return -1;
        }
        if (a.readyInMinutes > b.readyInMinutes) {
          return 1;
        }
        return 0;
      }
      return this.recipes.sort(compareTime);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
