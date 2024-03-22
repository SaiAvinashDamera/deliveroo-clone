import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
        UserIcon,
        ChevronDownIcon,
        MagnifyingGlassIcon,
        AdjustmentsVerticalIcon,
} from 'react-native-heroicons/outline';

import { styled } from 'nativewind';
import { SearchBar } from 'react-native-screens';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';

import sanityClient from '../sanity';

const StyledView = styled(View);
const StyledText = styled(Text);

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        })
  }, [])

  useEffect(() => {
    sanityClient
      .fetch( 
        `
        *[_type == "featured"] {
          ...,
        }
        `
      ).then(data => setFeaturedCategories(data))
  }, [])
  

  return (
    <SafeAreaView className='bg-white pt-4'>
      <StyledView>
        
        {/*Header*/}

        <StyledView className='flex-row pb-3 items-center mx-4 space-x-2'>
          <TouchableOpacity>
            <Image
              source={
                {uri: 'https://b.zmtcdn.com/data/o2_assets/c0bb85d3a6347b2ec070a8db694588261616149578.png'
              }}

              className='h-8 w-8 bg-yellow-300 p-4 rounded-full'
            />
          </TouchableOpacity>

          <StyledView className='flex-1'>
            <StyledText className='font-bold text-gray-400'>Deliver Now!</StyledText>
            <StyledText className='font-bold text-xl'>Current Location
              <ChevronDownIcon size={20} color='#00ccbb'/>
            </StyledText>
          </StyledView>
          <UserIcon size={33} color='#00ccbb'/>
        </StyledView>
          
          {/*Search box*/}
          <StyledView className='flex-row items-center space-x-2 pb-2 mx-4'>
            <StyledView className='flex-row items-center flex-1 space-x-2 bg-gray-100 p-3'>
              <MagnifyingGlassIcon color='gray' size={20}/>
              <TextInput
                placeholder='Restaurants and cuisines'
                keyboardType='default'
              />
            </StyledView>
            <AdjustmentsVerticalIcon color='#00ccbb'/>
          </StyledView>

          <ScrollView 
            className='bg-gray-100'
            contentContainerStyle={{
              paddingBottom:300,
            }}
            >
            {/*Categories*/}
            <Categories/>

            {/*Featured rows*/}
            {featuredCategories?.map((category) => (
              
              <View>
                <FeaturedRow
                  key={category._id}
                  id = {category._id}
                  title = {category.name}
                  description = {category.short_description}
                />
              </View>
            ))}
          </ScrollView>
          

        </StyledView>
    </SafeAreaView>
  )
}

export default HomeScreen