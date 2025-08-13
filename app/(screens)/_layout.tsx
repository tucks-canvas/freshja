import { Stack } from 'expo-router';

export default function Views() {

    return (
        <Stack>
            <Stack.Screen name="(home)" options={{headerShown: false}} />
            <Stack.Screen name="(auth)" options={{headerShown: false}} />
            <Stack.Screen name="(cart)" options={{headerShown: false}} />
            <Stack.Screen name="(profile)" options={{headerShown: false}} />
            <Stack.Screen name="(order)" options={{headerShown: false}} />
            <Stack.Screen name="(load)" options={{headerShown: false}} />
        </Stack>      
    );

};