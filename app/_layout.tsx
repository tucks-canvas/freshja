import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Root() {

    const [loaded, error] = useFonts({
        "AfacadFlux-Black": require("../assets/fonts/AfacadFlux-Black.ttf"),
        "AfacadFlux-Bold": require("../assets/fonts/AfacadFlux-Bold.ttf"),
        "AfacadFlux-Medium": require("../assets/fonts/AfacadFlux-Medium.ttf"),
        "AfacadFlux-Regular": require("../assets/fonts/AfacadFlux-Regular.ttf"),
        "AfacadFlux-Thin": require("../assets/fonts/AfacadFlux-Thin.ttf"),
        "AfacadFlux-SemiBold": require("../assets/fonts/AfacadFlux-SemiBold.ttf"),
        "AfacadFlux-ExtraBold": require("../assets/fonts/AfacadFlux-ExtraBold.ttf"),
        "AfacadFlux-ExtraLight": require("../assets/fonts/AfacadFlux-ExtraLight.ttf"),
        "AfacadFlux-Light": require("../assets/fonts/AfacadFlux-Light.ttf"),
        "Montserrat-Black": require("../assets/fonts/Montserrat-Black.ttf"),
        "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
        "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
        "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
        "Montserrat-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
        "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
        "Montserrat-ExtraBold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
        "Montserrat-ExtraLight": require("../assets/fonts/Montserrat-ExtraLight.ttf"),
        "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
        "Nunito-Black": require("../assets/fonts/Nunito-Black.ttf"),
        "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
        "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
        "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
        "Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
        "Nunito-ExtraBold": require("../assets/fonts/Nunito-ExtraBold.ttf"),
        "Nunito-ExtraLight": require("../assets/fonts/Nunito-ExtraLight.ttf"),
        "Nunito-Light": require("../assets/fonts/Nunito-Light.ttf"),
        "FunnelDisplay-Bold": require("../assets/fonts/FunnelDisplay-Bold.ttf"),
        "FunnelDisplay-Medium": require("../assets/fonts/FunnelDisplay-Medium.ttf"),
        "FunnelDisplay-Regular": require("../assets/fonts/FunnelDisplay-Regular.ttf"),
        "FunnelDisplay-SemiBold": require("../assets/fonts/FunnelDisplay-SemiBold.ttf"),
        "FunnelDisplay-ExtraBold": require("../assets/fonts/FunnelDisplay-ExtraBold.ttf"),
        "FunnelDisplay-Light": require("../assets/fonts/FunnelDisplay-Light.ttf"),
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
        if (loaded) SplashScreen.hideAsync();
    }, [loaded, error]);

    if (!loaded && !error) return null;

    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="(screens)" options={{headerShown: false}} />
            <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        </Stack>      
    );

};