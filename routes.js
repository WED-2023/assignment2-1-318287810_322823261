import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login", // Define the login page route once
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/recipe/:id",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
<<<<<<< HEAD
    path: "/favorites",
    name: "favorites",
    component: () => import("./pages/FavoritesPage"),
=======
  path: "/favorites",
  name: "favorites",
  component: () => import("./pages/FavoritesPage"),
>>>>>>> 666adae821f8f65fa65df85945146e188ea38efb
  },
  {
    path: "/my-recipes",
    name: "my-recipes",
    component: () => import("./pages/MyRecipesPage"),
  },
  {
    path: "/family-recipes",
    name: "family-recipes",
    component: () => import("./pages/FamilyRecipesPage"),
  },
  {
    path: "/create-recipe",
    name: "create-recipe",
    component: () => import("./pages/CreateRecipePage"),
  },
  {
<<<<<<< HEAD
    path: "*", // This should always be the last route
=======
    path: "*",
>>>>>>> 666adae821f8f65fa65df85945146e188ea38efb
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
