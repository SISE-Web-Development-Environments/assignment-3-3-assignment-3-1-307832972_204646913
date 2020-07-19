<template>
  <div>
    <div v-if="specialRecipe">
      <b-card
        :title="recipe.title"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <router-link
          :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
          class="recipe-preview"
        >
          <div v-b-hover="handleHover">
            <div v-if="isHovered" class="hovereffect">
              <b-card-img class="img-responsive" :src="recipe.image" alt="" />
              <div class="overlay">
                <h3 class="info">click here for full recipe</h3>
              </div>
            </div>
            <div v-else>
              <b-card-img :src="recipe.image" alt="" />
            </div>
          </div>
        </router-link>

        <b-card-text>
          <b-container class="bv-example-row">
            <b-row>
              <b-col>
                <li>
                  <strong>{{ recipe.readyInMinutes }} minutes</strong>
                </li>
                <li>
                  <strong>{{ recipe.aggregateLikes }} likes</strong>
                </li>
              </b-col>
              <b-col
                ><span v-if="watched">
                  <img :src="watchedIcon" style="width: 70px; height: 70px;" />
                </span>
                <span v-else>
                  <img
                    :src="notWatchedIcon"
                    style="width: 70px; height: 70px;"
                  /> </span
              ></b-col>
            </b-row>
          </b-container>
          <span v-if="$root.store.username">
            <br />

            <b-button
              v-bind:disabled="saved"
              v-on:click="addToFavorite(recipe.id)"
              variant="success"
              >Add To Favorite</b-button
            >
            <br />
          </span>
          <br />

          <b-container class="bv-example-row">
            <b-row>
              <b-col
                ><span v-if="recipe.vegetarian">
                  <img
                    :src="vegeterian"
                    style="width: 50px; height: 50px;"
                  /> </span
              ></b-col>
              <b-col
                ><span v-if="recipe.vegan">
                  <img :src="vegan" style="width: 50px; height: 50px;" /> </span
              ></b-col>
              <b-col
                ><span v-if="recipe.glutenFree">
                  <img
                    :src="glutenFree"
                    style="width: 50px; height: 50px;"
                  /> </span
              ></b-col>
            </b-row>
          </b-container>
        </b-card-text>
      </b-card>
    </div>
    <div v-else>
      <b-card
        :title="recipe.recipe_name"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <router-link
          :to="{
            name: 'specialRecipeViewPage',
            params: { recipeId: recipe.recipe_id, family: recipe.recipe_owner }
          }"
          class="recipe-preview"
        >
          <div v-b-hover="handleHover">
            <div v-if="isHovered" class="hovereffect">
              <b-card-img class="img-responsive" :src="recipe.image" alt="" />
              <div class="overlay">
                <h3 class="info">click here for full recipe</h3>
              </div>
            </div>
            <div v-else>
              <b-card-img :src="recipe.image" alt="" />
            </div>
          </div>
        </router-link>

        <b-card-text>
          <li>
            <strong>{{ recipe.readyInMinutes }} minutes</strong>
          </li>
          <li v-if="recipe.popularity">
            <strong>{{ recipe.popularity }} likes</strong>
          </li>
          <li v-if="recipe.recipe_owner">
            <strong>Owner: </strong>{{ recipe.recipe_owner }}
          </li>
          <li v-if="recipe.recipe_event">
            <strong>Event: </strong>{{ recipe.recipe_event }}
          </li>

          <br />

          <b-container class="bv-example-row">
            <b-row>
              <b-col
                ><span v-if="recipe.vegetarian">
                  <img
                    :src="vegeterian"
                    style="width: 50px; height: 50px;"
                  /> </span
              ></b-col>
              <b-col
                ><span v-if="recipe.vegan">
                  <img :src="vegan" style="width: 50px; height: 50px;" /> </span
              ></b-col>
              <b-col
                ><span v-if="recipe.glutenFree">
                  <img
                    :src="glutenFree"
                    style="width: 50px; height: 50px;"
                  /> </span
              ></b-col>
            </b-row>
          </b-container>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
//import image from "../assets/photos/src/veggie.jpg";
import {
  BootstrapVue,
  BIcon,
  BIconArrowUp,
  BIconArrowDown
} from "bootstrap-vue";
export default {
  data() {
    return {
      saved: false,
      watched: false,
      isHovered: false,
      specialRecipe: true,
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

      //image: image
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  created() {
    if (!this.recipe.title) {
      this.specialRecipe = false;
    }
    this.updateButton();
  },

  methods: {
    handleHover(hovered) {
      this.isHovered = hovered;
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
            this.watched = response.data[0][this.recipe.id].watched;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    async addToFavorite(id) {
      try {
        const response = await this.axios.put(
          this.$root.store.base_url + "/users/addRecipeToFavorite/" + id
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 50%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  /* padding: 5px 10px; */
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
.hovereffect {
  width: 100%;
  height: 100%;
  float: left;
  overflow: hidden;
  position: relative;
  text-align: center;
  cursor: default;
  background: -webkit-linear-gradient(45deg, #ff89e9 0%, #05abe0 100%);
  background: linear-gradient(45deg, #ff89e9 0%, #05abe0 100%);
}

.hovereffect .overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  padding: 3em;
  text-align: left;
}

.hovereffect img {
  display: block;
  position: relative;
  max-width: none;
  width: calc(100% + 60px);
  -webkit-transition: opacity 0.35s, -webkit-transform 0.45s;
  transition: opacity 0.35s, transform 0.45s;
  -webkit-transform: translate3d(-40px, 0, 0);
  transform: translate3d(-40px, 0, 0);
}

.hovereffect h3 {
  text-transform: uppercase;
  color: #fff;
  position: relative;
  font-size: 17px;
  background-color: transparent;
  padding: 15% 0 10px 0;
  text-align: left;
}

.hovereffect .overlay:before {
  position: absolute;
  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;
  border: 1px solid #fff;
  content: "";
  opacity: 0;
  filter: alpha(opacity=0);
  -webkit-transition: opacity 0.35s, -webkit-transform 0.45s;
  transition: opacity 0.35s, transform 0.45s;
  -webkit-transform: translate3d(-20px, 0, 0);
  transform: translate3d(-20px, 0, 0);
}

.hovereffect a,
.hovereffect p {
  color: #fff;
  opacity: 0;
  filter: alpha(opacity=0);
  -webkit-transition: opacity 0.35s, -webkit-transform 0.45s;
  transition: opacity 0.35s, transform 0.45s;
  -webkit-transform: translate3d(-10px, 0, 0);
  transform: translate3d(-10px, 0, 0);
}

.hovereffect:hover img {
  opacity: 0.6;
  filter: alpha(opacity=60);
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.hovereffect:hover .overlay:before,
.hovereffect:hover a,
.hovereffect:hover p {
  opacity: 1;
  filter: alpha(opacity=100);
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
</style>
