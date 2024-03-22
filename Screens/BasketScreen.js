import { View, Text, TouchableOpacity, Image} from 'react-native'
import React, { useState } from 'react'
import { styled } from 'nativewind';
import {  ChevronDownIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter';

const StyledView = styled(View);
const StyledText = styled(Text);

const BasketScreen = () => {

  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((results,item) => {
      (results[item.id] = results[item.id] || []).push(item);

      return results;
    },{});

    setGroupedItemsInBasket(groupedItems);

  }, [items]);


  return (
    <StyledView className="flex-1 mt-10 bg-gray-200 h-full rounded-t-3xl">
        <TouchableOpacity className="bg-white p-2 items-center border-b-2 border-gray-50"><ChevronDownIcon color={"gray"} opacity="0.2"/></TouchableOpacity>
        <StyledView className='items-center bg-white p-3'>
            <StyledText className='font-bold text-gray-600 text-xl'>Basket</StyledText>
            <StyledText className='text-gray-400'>{restaurant.title}</StyledText>
        </StyledView>

        <StyledView  className="bg-white my-6 p-4 flex-row justify-between items-center">
            <Image
              source={
                {uri: 'https://b.zmtcdn.com/data/o2_assets/c0bb85d3a6347b2ec070a8db694588261616149578.png'
              }}

              className='h-8 w-8 bg-yellow-300 p-4 rounded-full'
            />
          <StyledText className='font-bold px-4 flex-1 text-gray-600'>Deliver in 50-75 min</StyledText>
          <TouchableOpacity>
            <StyledText className='text-[#00ccbb]'>Change</StyledText>
          </TouchableOpacity>
        </StyledView>
        <ScrollView className="divide-y divide-gray-100">
              {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                <StyledView key={key}  className='flex-row bg-white items-center space-x-3 py-2 px-5'>
                  <StyledText className='text-gray-400'>{items.length} x</StyledText>
                  <Image
                    source={
                      {uri: urlFor(items[0]?.image).url(),
                    }}
    
                    className='h-12 w-12 bg-gray-300 p-4 rounded-full'
                  />
                  <StyledText className='flex-1'>{items[0]?.name}</StyledText>
                  <StyledText className='text-gray-400 font-bold'><Currency quantity={items[0]?.price} currency="INR"/></StyledText>
                  <TouchableOpacity
                    onPress={()=>{
                      dispatch(removeFromBasket({id: key}))
                    }}
                  >
                    <StyledText className='text-[#00ccbb] text-xs'>remove</StyledText>
                  </TouchableOpacity>
                </StyledView>
              ))}
        </ScrollView>

        <StyledView className='bg-white p-5 space-y-4'>

          <StyledView className='flex-row justify-between'>
            <StyledText className='text-gray-400 font-bold'>Subtotal</StyledText>
            <StyledText className='text-gray-400 font-bold'><Currency quantity={basketTotal} currency="INR"/></StyledText>
          </StyledView>

          <StyledView className='flex-row justify-between'>
            <StyledText className='text-gray-400 font-bold italic underline'>Delivery Fee</StyledText>
            <StyledText className='text-gray-400 font-bold'><Currency quantity={59} currency="INR"/></StyledText>
          </StyledView>

          <StyledView className='flex-row justify-between'>
            <StyledText className=''>Order Total</StyledText>
            <StyledText className='font-extrabold'><Currency quantity={basketTotal+59} currency="INR"/></StyledText>
          </StyledView>

          <TouchableOpacity
            onPress={()=>{navigation.navigate("PreparingOrder")}}
            className="items-center bg-[#00ccbb] p-4 rounded-lg"
          >
            <StyledText className='font-black text-lg text-white'>Place Order</StyledText>
          </TouchableOpacity>

        </StyledView>
    </StyledView>
  )
}

export default BasketScreen;