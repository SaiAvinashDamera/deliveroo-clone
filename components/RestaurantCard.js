import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {MapPinIcon} from 'react-native-heroicons/outline';
import {StarIcon} from 'react-native-heroicons/solid';

import { styled } from 'nativewind';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';
const StyledView = styled(View);
const StyledText = styled(Text);

const RestaurantCard = ({
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
                    }) => {

const navigation = useNavigation();

  return (
    <StyledView>
        <TouchableOpacity
            onPress={()=>{
                navigation.navigate("Restaurant",{
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
                });
            }}
            className='bg-white mr-3  rounded-b-lg'
        >
            <Image
                source={{
                    uri: urlFor(imgUrl).url(),
                }}

                className="h-36 w-full rounded-t-lg"
            />
            <StyledView className='pb-4 px-3'>
                <StyledText className='font-bold text-lg pt-2'>{title}</StyledText>
                <StyledView className='flex-row items-center pb-1'>
                    <StarIcon color={"#11b44d"} size={20} opacity="0.5"/>
                    <StyledText className='px-2 text-gray-400 font-bold'>
                        <StyledText className='text-green-500 opacity-5 font-semibold'>{rating}</StyledText> . {genre}
                    </StyledText>
                </StyledView>

                <StyledView className='flex-row items-center'>
                    <MapPinIcon color={"gray"} size={20} opacity="0.5"/>
                    <StyledText className='px-2 text-gray-400 font-bold'>
                        <StyledText className='text-gray-400 opacity-5 font-semibold'>Nearby</StyledText> . {address}
                    </StyledText>
                </StyledView>

            </StyledView>

        </TouchableOpacity>
    </StyledView>
  )
}

export default RestaurantCard