import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

/* Import Supported Contents */
import { View, Text, TextInput, Image, ImageBackground, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, withDelay, Easing, runOnJS } from 'react-native-reanimated';
import Svg, { Path, Defs, Pattern, Image as SvgImage } from 'react-native-svg';

/* Import Icons, Images, and Colors */
import { icons, images } from '../../../constants';
import colors from '../../../constants/colors';

const Signin = () => {

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showRememberMe, setShowRememberMe] = useState(false);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      <SafeAreaView style={styles.safeArea}>
        <> 
          <ImageBackground 
            imageStyle={styles.imageStyle}
            style={styles.imageOverlay}
            source={images.texture2}
            resizeMode='cover'
          >
          </ImageBackground>

          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headertext}>Welcome Back</Text>
              <Text style={styles.headersub}>Login to your account</Text>        
            </View>

            <View style={styles.textfields}>
              <View style={styles.textfield}> 
                <View style={styles.textbody}>
                  <Image
                    source={icons.profilefill}
                    tintColor={colors.grey}
                    style={styles.icon}
                  />

                  <TextInput
                    style={styles.textinput}
                    placeholder="Full name"
                    placeholderTextColor={colors.grey}  
                  />
                </View>
              </View>

              <View style={styles.textfield}> 
                <View style={styles.textbody}>
                  <Image
                    source={icons.lock}
                    tintColor={colors.grey}
                    style={styles.icon}
                  />

                  <TextInput
                    style={styles.textinput}
                    placeholder="Password"
                    placeholderTextColor={colors.grey}  
                  />
                </View>

                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.textoggle}
                >
                  <Image
                    source={showPassword ? icons.show : icons.hide}
                    style={styles.icon}                     
                    tintColor={colors.grey}                      
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.forgotremember}>
              <View style={styles.remember}>
                <TouchableOpacity 
                  onPress={() => setShowRememberMe(!showRememberMe)}
                  style={styles.textoggle}
                >
                  <Image
                    source={showRememberMe ? icons.checked : icons.unchecked}
                    tintColor={colors.yellow}
                    style={styles.icon}                                           
                  />
                </TouchableOpacity>

                <Text style={styles.remembertext}>Remember Me</Text>
              </View>

              <TouchableOpacity 
                onPress={() => router.replace('/(screens)/(auth)/forgot')}
                style={styles.textoggle}
              >
                <Text style={styles.forgotext}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace('../../(tabs)/home')}
              >
                <Text style={styles.buttontext}>Login</Text>
              </TouchableOpacity>

              <View style={styles.sign}>
                <Text style={styles.signtext}>Don't have account?</Text>
                
                <TouchableOpacity 
                  onPress={() => router.replace('/(screens)/(auth)/choice')}
                  style={styles.textoggle}
                >
                  <Text style={styles.signsub}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  
  container: {
    flexGrow: 1,
    alignItems: 'center',
    zIndex: 1,
    marginTop: 25,
  },

  /* Images */

  imageOverlay: {
    height: 300,
    width: '100%',
    top: -30,
  },
  
  /* Header */

  header: {
    width: '80%',
    flexDirection: 'column',
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },

  headertext: {
    fontSize: 40,
    color: colors.yellow,
    fontFamily: 'Gilroy-Bold',
  },

  headersub: {
    fontSize: 12,
    color: colors.grey,
    fontFamily: 'Montserrat-Medium',
  },

  /* Text */

  textfields: {
    width: '80%',
    gap: 10,
    marginBottom: 20,
  },

  textfield: {
    height: 55,
    flexDirection: 'row',
    backgroundColor: colors.gallery,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
  },

  textbody: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },

  textinput: {
    fontSize: 13,
    color: colors.black,
    fontFamily: 'Montserrat-Medium',
  },

  /* Forgot & Remember */

  forgotremember: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 80,
  },
  
  remember: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  remembertext: {
    fontSize: 12,
    color: colors.yellow,
    fontFamily: 'Montserrat-Medium',
  },

  forgotext: {
    fontSize: 13,
    color: colors.yellow,
    fontFamily: 'Gilroy-Bold',
  },

  /* Footer */

  footer: {
    width: '80%',
    flexDirection: 'column',
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },

  /* Button  */

  button: {
    width: '100%',
    backgroundColor: colors.yellow,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  buttontext: {
    fontSize: 13,
    color: colors.white,
    fontFamily: 'Gilroy-Bold',    
    letterSpacing: 2,
  },

  /* Sign */

  sign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    alignItems: 'center',
  },

  signtext: {
    fontSize: 12,
    color: colors.grey,
    fontFamily: 'Montserrat-Medium',
  },

  signsub: {
    fontSize: 12,
    color: colors.yellow,
    fontFamily: 'Gilroy-Bold',
  },

  /* Addd-Ons */

  back: {
    position: 'absolute',
    top: 40,
    left: 40,
    padding: 20,
    borderRadius: 30,
    width: 50,
    height: 50,
    backgroundColor: 'rgba(241, 238, 229, 0.42)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#686868ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
    overflow: 'hidden',
  },

  floatimage: {
    position: 'absolute',
    bottom: 350,
    right: -30,
    zIndex: 1,
  },

  /* Icons and Images */

  icon: {
    width: 18,
    height: 18,
  },

  image: {
    width: 150,
    height: 150,
  }
});

export default Signin;