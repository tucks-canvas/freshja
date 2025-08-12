import { Stack } from 'expo-router';

export default function ProfileViews() {

    return (
        <Stack>
            <Stack.Screen name="editprofile" options={{headerShown: false}} />
        </Stack>      
    );

};