import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useSelector } from 'react-redux'
import Currency from 'react-currency-formatter';

import { styled } from 'nativewind'
import { useNavigation } from '@react-navigation/native';


const StyledView = styled(View);
const StyledText = styled(Text);

const BasketIcon = () => {
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);

    const navigation = useNavigation();

    if(items.length==0) return null;

  return (
      <StyledView  className="absolute bottom-10 w-full z-50">
        {
                <TouchableOpacity 
                    onPress={()=>{navigation.navigate('Basket')}}
                    className="bg-[#00ccbb] p-3 mx-5 flex-row rounded-lg justify-between items-center"
                >
                    <StyledText className='text-white bg-[#00aa99] font-extrabold text-lg px-2.5 py-1.5'>{items.length}</StyledText>
                    <StyledText className='text-white font-extrabold text-lg'>View Basket</StyledText>
                    <StyledText className='text-white font-extrabold text-lg'><Currency quantity={basketTotal} currency="INR"/></StyledText>
                </TouchableOpacity>
        }
    </StyledView>
  )
}

export default BasketIcon