<template>
  <b-container>
    <h1>
      {{ title }}:
      <slot></slot>
    </h1>
    <div v-if="order">
      <b-row v-for="r in recipes" :key="r.id">
        <b-col>
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-col>
      </b-row>
    </div>
    <div v-else>
      <div>
        <b-row>
          <div v-for="r in recipes" :key="r.id">
            <RecipePreview class="recipePreview" :recipe="r" />
          </div>
        </b-row>
      </div>
    </div>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  data() {
    return {
      three: [1, 2, 3]
    };
  },
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recipes: {
      type: Array,
      required: true
    },
    order: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
