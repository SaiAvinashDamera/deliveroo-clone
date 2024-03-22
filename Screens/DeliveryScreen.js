import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/solid';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import MapView, {Marker} from 'react-native-maps';

const StyledView = styled(View);
const StyledText = styled(Text);

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);

  return (
    <StyledView className='bg-[#00ccbb] flex-1'>
        <SafeAreaView>
            <StyledView className="p-4 flex-row justify-between items-center">
                <TouchableOpacity
                onPress={()=>{navigation.navigate("Home")}}
                >
                    <XMarkIcon color={"white"} size={34}/>
                </TouchableOpacity>
                <StyledText className='text-white text-lg font-light'>Order Help</StyledText>
            </StyledView>

            <StyledView className='bg-white rounded-md mx-5 my-2 p-6 z-50 shadow-md'>
                <StyledView className='flex-row justify-between'>
                    <StyledView>
                        <StyledText className='text-gray-400 text-lg'>Estimated Arrival</StyledText>
                        <StyledText className='font-bold text-4xl'>45-50 Minutes</StyledText>
                    </StyledView>

                    <Image
                        source={{uri: "https://links.papareact.com/fls"}}
                        className="h-20 w-20"
                    />
                </StyledView>
                <Progress.Bar size={60} indeterminate={true} color="#00ccbb"/>
                <StyledText className='mt-3 text-gray-400'>Your order at {restaurant.title} is being prepared</StyledText>
            </StyledView>
        </SafeAreaView>
        <MapView
            initialRegion={{
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,

                latitude: restaurant.lat,
                longitude: restaurant.long,
            }}

            className="flex-1 mt-10 z-0"
            mapType='mutedStandard'
        >
            <Marker
                coordinate={{
                    latitude: restaurant.lat,
                    longitude: restaurant.long,
                }}
                title={restaurant.title}
                description={restaurant.short_description}
                identifier="origin"
                pinColor='#00ccbb'
            />
        </MapView>
        <SafeAreaView className="flex-row pb-4 px-3 bg-white items-center space-x-5">
            <Image
              source={
                {uri: 'https://b.zmtcdn.com/data/o2_assets/c0bb85d3a6347b2ec070a8db694588261616149578.png'
              }}

              className='h-8 w-8 bg-gray-300 p-4 rounded-full'
            />
            <StyledView className='flex-1'>
                <StyledText className='text-lg text-gray-700 font-bold'>PP Levi Yarou</StyledText>
                <StyledText className='text-sm text-gray-400'>Your Rider</StyledText>
            </StyledView>
            <StyledText className='text-[#00ccbb] text-lg mr-5 font-bold'>Call</StyledText>
        </SafeAreaView>
    </StyledView>
  )
}

export default DeliveryScreen