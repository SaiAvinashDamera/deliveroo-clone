// tailwind.config.js

module.exports = {
      content: [
                "./App.{js,jsx,ts,tsx}", 
                
                "./Screens/HomeScreen.{js,jsx,ts,tsx}", 
                "./Screens/RestaurantScreen.{js,jsx,ts,tsx}",
                "./Screens/BasketScreen.{js,jsx,ts,tsx}",
                "./Screens/PreparingOrderScreen.{js,jsx,ts,tsx}",
                "./Screens/DeliveryScreen.{js,jsx,ts,tsx}",

                "./components/Categories.{js,jsx,ts,tsx}", 
                "./components/CategoryCard.{js,jsx,ts,tsx}",
                "./components/FeaturedRow.{js,jsx,ts,tsx}",
                "./components/RestaurantCard.{js,jsx,ts,tsx}",
                "./components/DishRow.{js,jsx,ts,tsx}",
                "./components/BasketIcon.{js,jsx,ts,tsx}",
              ],
      theme: {
        extend: {},
      },
      plugins: [],
    }