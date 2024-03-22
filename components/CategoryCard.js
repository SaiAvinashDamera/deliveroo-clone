import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { styled } from 'nativewind';
import { urlFor } from '../sanity';
const StyledView = styled(View);
const StyledText = styled(Text);

const CategoryCard = ({imgUrl, title}) => {
  return (
    <StyledView  className='relative mr-2'>
        <TouchableOpacity className='items-center'>
            <Image
              source={{
                uri: urlFor(imgUrl).url(),
              }}

              className='h-20 w-20 rounded-full'
            />
            <StyledText className='text-slate-600 font-bold'>{title}</StyledText>
        </TouchableOpacity>
    </StyledView>
  )
}

export default CategoryCard