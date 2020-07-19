import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage")
  },
  {
    path: "/myFamilyRecipe",
    name: "familyRecipe",
    component: () => import("./pages/myFamilyRecipe")
  },
  {
    path: "/favoriteRecipe",
    name: "favoriteRecipe",
    component: () => import("./pages/favoriteRecipe")
  },
  {
    path: "/personalRecipe",
    name: "personalRecipe",
    component: () => import("./pages/personalRecipe")
  },
  {
    path: "/MakeRecipePage",
    name: "MakeRecipePage",
    component: () => import("./pages/MakeRecipePage")
  },
  {
    path: "/specialRecipeViewPage",
    name: "specialRecipeViewPage",
    component: () => import("./pages/specialRecipeViewPage")
  },
  {
    path: "/AboutPage",
    name: "AboutPage",
    component: () => import("./pages/AboutPage")
  },
  {
    path: "/MealPage",
    name: "MealPage",
    component: () => import("./pages/MealPage")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
