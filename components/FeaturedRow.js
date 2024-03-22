import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import { styled } from 'nativewind';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';
import sanityClient from '../sanity'

const StyledView = styled(View);
const StyledText = styled(Text);

const FeaturedRow = ({id, title, description}) => {

    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        sanityClient
          .fetch( 
            `
            *[_type == "featured" && _id == $id] {
                ...,
                  restaurants[]->{
                    ...,
                    dishes[]->,
                        type->{
                            name
                        }
                  }
              }[0]
            `,{id}
          ).then(data => setRestaurants(data?.restaurants))
      }, [])

  return (
    <StyledView>
        <StyledView className='mt-4 px-4 flex-row justify-between items-center'>
            <StyledText className='font-bold text-lg'>{title}</StyledText>
            <ArrowRightIcon color='#00ccbb'/>
        </StyledView>
        <StyledText className='px-4 text-gray-600'>{description}</StyledText>

        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal:15,
            }}
            className="pt-4"
        >

            { restaurants?.map((restaurant) => (

                <RestaurantCard
                id={restaurant._id}
                title={restaurant.name}
                rating={restaurant.rating}
                imgUrl={restaurant.image}
                genre={restaurant.type?.name}
                address={restaurant.address}
                short_description={restaurant.short_description}
                dishes={restaurant.dishes}
                long={restaurant.long}
                lat={restaurant.lat}
                />
            ))}
        </ScrollView>
    </StyledView>
  )
}

export default FeaturedRow