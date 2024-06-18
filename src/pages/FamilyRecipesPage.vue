<template>
  <div class="container">
    <h1 class="title">My Family Recipes</h1>
    <div v-for="recipe in recipes" :key="recipe.title" class="recipe-card">
      <h2>{{ recipe.title }}</h2>
      <h3>Origin: {{ recipe.origin }}</h3>
      <p><strong>Occasions:</strong> {{ recipe.occasions }}</p>
      <div class="ingredients">
        <h4>Ingredients:</h4>
        <ul>
          <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
        </ul>
      </div>
      <div class="instructions">
        <h4>Preparation:</h4>
        <ol>
          <li v-for="(step, index) in recipe.preparation" :key="index">{{ step }}</li>
        </ol>
      </div>
      <div class="photos">
        <h4>Photo:</h4>
        <img :src="recipe.photo.src" :alt="recipe.photo.alt" class="recipe-photo" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipes: [
        {
          title: "Grandma Osnat cinnamon Roll",
          origin: "This recipe has been passed down through generations in our family and is one of the most beloved dishes at any family gathering. Grandma Osnat prepares the cinnamon roll every time we gather for holidays and birthday celebrations, and it always steals the show with its wonderful taste and amazing aroma that fills the house.",
          occasions: "Passover, Rosh Hashanah, Shavuot, and family birthday celebrations",
          ingredients: [
            "70 grams (1/3 cup) sugar",
            "13 grams (1 heaping tablespoon) dry yeast",
            "180 ml (3/4 cup) milk",
            "500 grams (3 1/2 cups + 1 tablespoon) flour",
            "2 large eggs",
            "130 grams (4.6 oz) softened butter",
            "8 grams (1 heaping teaspoon) salt",
            "240 grams (8.5 oz) softened butter",
            "200 grams (3/4 cup) dark brown sugar",
            "20 grams (2 tablespoons) cinnamon",
            "5 grams (1 teaspoon) ground cardamom (optional)",
            "100 ml (1/3 cup + 2 tablespoons) hot water",
            "100 grams (1/2 cup) sugar",
            "1 egg yolk",
            "A little milk"
          ],
          preparation: [
            "In a mixer bowl, whisk together sugar, yeast, and milk with a hand whisk.",
            "Attach the dough hook, add flour and eggs, and knead on low speed for about ten minutes until a uniform dough is formed.",
            "Gradually add the butter while kneading until it is fully incorporated into the dough.",
            "Add salt and continue kneading for another four to five minutes until a soft dough that detaches from the sides of the bowl is formed.",
            "Transfer the dough to a greased bowl, cover with plastic wrap, and let it rise for about one to one and a half hours until doubled in size, or refrigerate overnight (the dough will be cold and easier to work with).",
            "In a mixer bowl with a paddle attachment, mix all the filling ingredients until a uniform mixture is formed. Keep at room temperature.",
            "In a saucepan, bring water and sugar to a boil and cook for another two minutes. Turn off the heat and set the syrup aside.",
            "Divide the dough into two equal parts and shape each part into a ball.",
            "Roll out the first ball into a rectangle about the width of a loaf pan.",
            "Spread half of the filling on the rectangle and roll it into a tight roll.",
            "Cut the roll lengthwise and create an X, with the open side facing up.",
            "Twist the ends on both sides into a spiral and transfer the cake to the pan.",
            "Repeat with the second dough ball and the remaining filling.",
            "Cover the pans and let rise at room temperature for about an hour until the dough almost doubles in size.",
            "Preheat the oven to 165°C (329°F).",
            "In a small bowl, whisk together the egg yolk and milk, brush the cakes, and bake for 25-30 minutes until nicely browned.",
            "Remove from the oven and generously brush with the sugar syrup."
          ],
          photo: { src: require('@/assets/cinnamonRoll.jpg'), alt: "Grandma Rachel's Yeast Roll" }
        },
        {
          title: "Tabbouleh Salad",
          origin: "This refreshing and healthy salad is a staple in our family, especially during the summer. My Aunt Miriam often makes this dish for our family picnics and barbecues, and it's always a hit.",
          occasions: "Family picnics, barbecues, and summer gatherings",
          ingredients: [
            "1/2 cup fine bulgur",
            "2 cups finely chopped parsley",
            "1/3 cup finely chopped mint",
            "3 tablespoons finely chopped onion",
            "5 tablespoons olive oil",
            "Juice of one lemon",
            "1/2 teaspoon salt"
          ],
          preparation: [
            "Rinse the bulgur and drain. Transfer to a bowl and add lukewarm water until the bulgur is covered by about 3 cm. Soak for an hour and drain. If you are short on time, soak the bulgur in boiling water in a 1:1 ratio (1/2 cup bulgur to 1/2 cup water). After 15-20 minutes, fluff with a fork, like couscous.",
            "Chop the herbs and squeeze well to remove excess liquid. Chop the onion.",
            "Mix the bulgur with the chopped herbs and onion. Add the olive oil, lemon juice, and salt, and mix well."
          ],
          variations: [
            "The tabbouleh can be served immediately after preparation, or made in advance and allowed to sit for a few hours to absorb the flavors. It can be stored in a sealed container in the refrigerator for two to three days.",
            "You can add diced tomato, chopped cucumber, green onion, pomegranate seeds, or a combination of these.",
            "A modern variation that has gained popularity: add a few tablespoons of cranberries. Enjoy!"
          ],
          photo: { src: require('@/assets/salad.jpg'), alt: "Aunt Miriam's Tabbouleh Salad" }
        },
        {
          title: "Pad Thai",
          origin: "This is not a traditional family recipe from our grandparents, but it's a dish we all love and enjoy making together. Pad Thai is a super easy and popular dish from Thai cuisine that is often prepared in five minutes on the street in Thailand.",
          occasions: "Family dinners and casual gatherings",
          ingredients: [
            "200 grams rice noodles (5 mm), soaked for 2 hours in water",
            "10 tablespoons soy sauce",
            "4 tablespoons brown sugar",
            "1 tablespoon fish sauce (optional)",
            "4 tablespoons oil",
            "4 eggs",
            "Handful of bean sprouts",
            "5 stalks of green onion, coarsely chopped",
            "Crushed peanuts",
            "Lemon or lime wedge for serving",
            "200 grams chicken breast, cut into small cubes, soaked in a bowl with half a cup of soy sauce",
            "4 tablespoons cornstarch",
            "Oil for frying"
          ],
          preparation: [
            "First, soak the chicken breast cubes in soy sauce for half an hour. Drain and coat well with cornstarch on all sides.",
            "In a pan with 3-4 tablespoons of oil, fry the chicken for half a minute on each side just to sear it. Remove the chicken pieces and set aside.",
            "In a wok or a large deep pan with 4 tablespoons of oil, scramble the eggs for half a minute.",
            "Add the pre-soaked noodles and stir-fry for another minute or two.",
            "Add the prepared chicken pieces.",
            "Add soy sauce, fish sauce, and sugar, and stir-fry for a minute.",
            "Add green onion and bean sprouts, and stir-fry for another minute.",
            "Transfer to a plate, sprinkle with crushed peanuts, and serve with a lime wedge. Enjoy!"
          ],
          photo: { src: require('@/assets/padThai.jpg'), alt: "Delicious Pad Thai" }
        }
      ]
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.recipe-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.recipe-card h2 {
  margin-top: 0;
}

.recipe-card h3 {
  margin-bottom: 10px;
}

.recipe-card p {
  margin-bottom: 10px;
}

.ingredients, .instructions, .photos {
  margin-bottom: 20px;
}

.recipe-photo {
  width: 100%;
  max-width: 300px;
  margin: 10px 0;
}
</style>
