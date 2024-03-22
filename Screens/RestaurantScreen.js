import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { styled } from 'nativewind';
import { useNavigation, useRoute } from '@react-navigation/native';
import { urlFor } from '../sanity';
import { StarIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { ArrowLeftIcon, ChevronRightIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';

const StyledView = styled(View);
const StyledText = styled(Text);

const RestaurantScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {params: {
      id,
      title,
      rating,
      genre,
      imgUrl,
      address,
      short_description,
      dishes,
      long,
      lat,
  }} = useRoute();

  useEffect(()=>{
    dispatch(setRestaurant({
      id,
      title,
      rating,
      genre,
      imgUrl,
      address,
      short_description,
      dishes,
      long,
      lat,
    }))
  },[dispatch])


  useLayoutEffect(()=>{
    navigation.setOptions({
      headerShown: false,
    });
  }, [])



  return (
    <>
    <BasketIcon/>
      <ScrollView>
        <StyledView className="bg-white">
          <StyledView>
            <Image
              source={{
                uri: urlFor(imgUrl).url(),
              }}

              className='h-56 w-full bg-gray-300 p-4'
            />
            <TouchableOpacity 
              className="absolute my-10 mx-5 bg-gray-100 rounded-full p-2"
              onPress={()=>navigation.goBack()}
            >
              <ArrowLeftIcon color={"#00ccbb"}/>
            </TouchableOpacity>
          </StyledView>
          
            <StyledView className='px-3 pt-3'>
              <StyledText className='font-bold text-3xl'>{title}</StyledText>
              <StyledView className='flex-row items-center pb-1'>
                        <StarIcon color={"#11b44d"} size={20} opacity="0.5"/>
                        <StyledText className='px-2 text-gray-400 font-bold'>
                            <StyledText className='text-green-500 opacity-5 font-semibold'>{rating}</StyledText> . {genre}
                        </StyledText>
                        <MapPinIcon color={"gray"} size={20} opacity="0.5"/>
                        <StyledText className='px-2 text-gray-400 font-bold'>
                            <StyledText className='text-gray-400 opacity-5 font-semibold'>Nearby</StyledText> . {address?.split(',')[1]}
                        </StyledText>
                    </StyledView>
                    <StyledText className='text-gray-400'>{short_description}</StyledText>
            </StyledView>
            
            <TouchableOpacity className="flex-row items-center px-2 py-4 mt-2 border-y-2 border-gray-100">
              <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
              <StyledText className='pl-2 flex-1 font-bold'>Have a food allergy</StyledText>
              <ChevronRightIcon color="#00ccbb"/>
            </TouchableOpacity>
          </StyledView>

          <StyledText className='font-bold pt-6 px-3 mb-3 text-xl' >Menu</StyledText>
          
          {/* dishes */}
          
          {dishes.map( dish => (
            <DishRow
              id={dish._id}
              name={dish.name}
              short_description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}

          
      </ScrollView>
    </>
  )
}

export default RestaurantScreen