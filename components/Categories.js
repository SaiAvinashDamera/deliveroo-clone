import { View, Text, ScrollView, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import CategoryCard from './CategoryCard';

//for nativewind css
import { styled } from 'nativewind';
const StyledView = styled(View);
const StyledText = styled(Text);

import sanityClient from '../sanity';

const Categories = () => {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    try{
        sanityClient
          .fetch( 
            `
              *[_type == "category"]
            `
          ).then(data => setCategories(data))
          }catch{
            console.log("error");
          }
  }, [])

  return (
    <ScrollView
        contentContainerStyle={{
            paddingHorizontal:15,
            paddingTop:10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
    >
    {/* Category card */}

        {categories?.map((category)=>(
          <CategoryCard 
            key={category._id}
            id={category._id}
            imgUrl={category.image}
            title={category.name}
          />
        ))}


      {/* <CategoryCard 
        imgUrl="https://b.zmtcdn.com/data/dish_images/d19a31d42d5913ff129cafd7cec772f81639737697.png" 
        title="Biryani"
        />
      
      <CategoryCard 
        imgUrl="https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png" 
        title="Pizza"
        />
      
      <CategoryCard 
        imgUrl="https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png" 
        title="Chicken"
        />

      <CategoryCard 
        imgUrl="https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png" 
        title="Burger"
        />
      
      <CategoryCard 
        imgUrl="https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png" 
        title="Rolls"
        />

      <CategoryCard 
        imgUrl="https://b.zmtcdn.com/data/dish_images/91c554bcbbab049353a8808fc970e3b31615960315.png" 
        title="Noodles"
        />
      
      <CategoryCard 
        imgUrl="https://b.zmtcdn.com/data/o2_assets/2f34540e0b12058f5f8b9390c3a3fb4a1648972281.png" 
        title="Shawarma"
        />
      
      <CategoryCard 
        imgUrl="https://b.zmtcdn.com/data/o2_assets/13bdf0d4c96d44e6ddb21fedde0fe4081632716661.png" 
        title="Fries"
        />
      
      <CategoryCard 
        imgUrl="https://b.zmtcdn.com/data/o2_assets/e444ade83eb22360b6ca79e6e777955f1632716661.png" 
        title="Fried Rice"
        />

      <CategoryCard 
        imgUrl="https://b.zmtcdn.com/data/o2_assets/fc641efbb73b10484257f295ef0b9b981634401116.png" 
        title="Sandwich"
        />
      
      <CategoryCard 
        imgUrl="https://b.zmtcdn.com/data/o2_assets/8dc39742916ddc369ebeb91928391b931632716660.png" 
        title="Dosa"
        />

      <CategoryCard 
        imgUrl="https://b.zmtcdn.com/data/o2_assets/2b5a5b533473aada22015966f668e30e1633434990.png" 
        title="Paratha"
        /> */}

    </ScrollView>
  )
}

export default Categories;