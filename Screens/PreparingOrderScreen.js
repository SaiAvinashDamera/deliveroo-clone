import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';

import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


const StyledView = styled(View);
const StyledText = styled(Text);

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate("Delivery");
    }, 4000)
  },[])
  return (
    <SafeAreaView className="justify-center bg-[#00ccbb] flex-1 items-center">
      <Animatable.Image
        source={require("../assets/egg_loader.gif")}
        animation="slideInUp"
        iterationCount={1}
      />
      <StyledText className='my-2 text-white font-bold text-base' >Waiting for the restaurant to accept your order!</StyledText>

      <Progress.Circle className="my-8" size={60} indeterminate={true} color="white"/>
    </SafeAreaView>
  )
}

export default PreparingOrderScreen