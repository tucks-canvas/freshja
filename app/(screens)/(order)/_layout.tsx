import { Stack } from 'expo-router';

export default function OrderSummary() {

    return (
        <Stack>
            <Stack.Screen name="track" options={{headerShown: false}} />
        </Stack>      
    );

};


