import { View, Text,TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { styled } from 'nativewind';
import Currency from 'react-currency-formatter';
import { urlFor } from '../sanity';
import {MinusCircleIcon, PlusCircleIcon} from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basketSlice';

const StyledView = styled(View);
const StyledText = styled(Text);

const DishRow = ({
    id,
    name,
    short_description,
    price,
    image,
}) => {

    const [isPressed, setIsPressed] = useState(false);
    const items = useSelector((state) => selectBasketItemsWithId(state, id));
    const dispatch = useDispatch();

    const addItemToBasket = () => {
        dispatch(addToBasket({ id, name, short_description, price, image}));
    }

    const removeItemFromBasket = () => {
        if(!items.length > 0 ) return;
        dispatch(removeFromBasket({id}));
    }

  return (
    <>
    <TouchableOpacity  
        onPress={()=>{
            setIsPressed(!isPressed);
        }}
        className={`flex-row px-3 py-3 bg-white border border-gray-200 ${isPressed && "border-b-0"}`}
    >
        <StyledView className='flex-1'>
            <StyledView>
            <StyledText className='font-medium text-lg pb-0.5'>{name}</StyledText>
            <StyledText className='text-gray-400 pb-1'>{short_description}</StyledText>
            
            <StyledText className='text-gray-400'><Currency quantity={price} currency="INR"/></StyledText>
            </StyledView>
        </StyledView>
        <StyledView>
            <Image
                source={{
                    uri: urlFor(image).url(),
                }}

                className="h-20 w-20 bg-gray-400 p-4"
            />
        </StyledView>
    </TouchableOpacity>

    {isPressed && (
        <StyledView className='bg-white px-4'>
            <StyledView className='flex-row items-center space-x-2 pb-3'>
                <TouchableOpacity
                    disabled={!items.length}
                    onPress={removeItemFromBasket}
                >
                    <MinusCircleIcon 
                        size={40}
                        color={items.length >0 ?"#00ccbb":"gray"}
                    />
                </TouchableOpacity>
                <StyledText>{items.length}</StyledText>
                <TouchableOpacity
                    onPress={addItemToBasket}
                >
                    <PlusCircleIcon 
                        size={40}
                        color={"#00ccbb"}
                    />
                </TouchableOpacity>
            </StyledView>
        </StyledView>
    )}
    </>
  )
}

export default DishRow;