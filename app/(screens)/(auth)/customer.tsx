import React, { useState } from 'react';
import { useRouter } from 'expo-router';

/* Import React-Native Content */
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ImageBackground, StatusBar, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/* Import Other Supported Content */
import * as DocumentPicker from 'expo-document-picker';
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Svg, { Path, Defs, Pattern, Image as SvgImage } from 'react-native-svg';

/* Import Icons, Images, and Colors */
import { icons, images } from '../../../constants';
import colors from '../../../constants/colors';

const Farmer = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleNext = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
    Alert.alert('Error', 'Please fill all fields');
    return;
    }

    router.replace('../../(tabs)/home');
  };

  const handleBack = () => {
      router.replace('/(screens)/(auth)/choice');
  };

  return (
    <>
      <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0.1)" barStyle="dark-content" />
      
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground
          imageStyle={styles.imageOverlay}
          style={styles.imageSpace}
          source={images.background3}
        >
          <ScrollView
            vertical
            contentContainerStyle={styles.scrollArea}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              <View style={styles.waves}>
                  <Svg
                  height="300"
                  width="200%"
                  viewBox="0 0 440 165"
                  style={[styles.wave, { bottom: 100 }]}
                  preserveAspectRatio="none"
                  >
                  <Defs>
                      <Pattern
                          id="wavePattern"
                          patternUnits="userSpaceOnUse"
                          width="440"
                          height="600"
                      >
                          <SvgImage
                              href={images.background3}
                              width="440"
                              height="200"
                              preserveAspectRatio="xMidYMid slice"
                          />
                      </Pattern>
                  </Defs>
                  
                  <Path
                      fill="url(#wavePattern)"
                      d="M 120 0 V 140 C 276 187 257 86 441 151 v -151 Z"
                  />
                  </Svg>
              </View>
                        
              <View style={styles.backward}>
                  <TouchableOpacity 
                      style={styles.back}
                      onPress={handleBack}
                  >
                      <Image
                          source={icons.left}
                          style={styles.icon}
                          tintColor={colors.grey}
                      />
                  </TouchableOpacity>
              </View>             

              <View style={styles.header}>
                <Text style={styles.headertext}>Register</Text>

                <Text style={styles.headersub}>
                  Create your account
                </Text>        
              </View>

              <View style={styles.textfields}>
                  <Text style={styles.text}>Please fill all the fields accordingly</Text>

                  <View style={styles.textfield}> 
                      <View style={styles.textbody}>
                          <Image
                              source={icons.user}
                              tintColor={colors.grey}
                              style={styles.icon}
                          />

                          <TextInput
                              style={styles.textinput}
                              placeholder="Full name"
                              placeholderTextColor={colors.grey}
                              value={formData.fullName}
                              onChangeText={(text) => setFormData({...formData, fullName: text})}
                          />
                      </View>
                  </View>

                  <View style={styles.textfield}> 
                      <View style={styles.textbody}>
                      <Image
                          source={icons.email}
                          tintColor={colors.grey}
                          style={styles.icon}
                      />

                      <TextInput
                          style={styles.textinput}
                          placeholder="Email address"
                          placeholderTextColor={colors.grey}
                          value={formData.email}
                          onChangeText={(text) => setFormData({...formData, email: text})}
                          keyboardType="email-address"
                      />
                      </View>
                  </View>

                  <View style={styles.textfield}> 
                      <View style={styles.textbody}>
                      <Image
                          source={icons.phone}
                          tintColor={colors.grey}
                          style={styles.icon}
                      />

                      <TextInput
                          style={styles.textinput}
                          placeholder="Phone number"
                          placeholderTextColor={colors.grey}
                          value={formData.phone}
                          onChangeText={(text) => setFormData({...formData, phone: text})}
                          keyboardType="phone-pad"
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
                          secureTextEntry={!showPassword}
                          value={formData.password}
                          onChangeText={(text) => setFormData({...formData, password: text})}
                      />
                      </View>

                      <TouchableOpacity 
                      onPress={() => setShowPassword(!showPassword)}
                      >
                      <Image
                          source={showPassword ? icons.show : icons.hide}
                          style={styles.icon}                     
                          tintColor={colors.grey}                      
                      />
                      </TouchableOpacity>
                  </View>
              </View>

              <View style={styles.pages}>
                <Text style={styles.pagetext}>Page 1 of </Text>
                <Text style={styles.pagesub}>1</Text>
              </View>
              
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleNext}
                >
                  <Text style={styles.buttontext}>
                    Submit
                  </Text>
                </TouchableOpacity>

                  <View style={styles.sign}>
                    <Text style={styles.signtext}>Have an account?</Text>
                    <TouchableOpacity 
                      onPress={() => router.replace('/(screens)/(auth)/signin')}
                    >
                      <Text style={styles.signsub}>Sign in</Text>
                    </TouchableOpacity>
                  </View>
              </View>

              <View style={styles.rep}>
                <Text style={styles.reptext}>FreshJA</Text>
                <Text style={styles.repsub}>Freshly made for you</Text>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
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
    zIndex: 2,
  },

  scrollArea: {
    marginBottom: 80,
  },

  /* Image */

  imageOverlay: {
    width: '100%',
    height: '105%',
    opacity: 0.05,
    top: -20,
  },

  imageSpace: {
    zIndex: 0,
  },

  /* Waves */

  waves: {
    position: 'absolute',
    height: 200,
    top: 500,
    right: 300,
    width: '100%',
  },
  
  wave: {
    position: 'absolute',
    opacity: 0,

  },
  
  /* Header */

  header: {
    width: '80%',
    flexDirection: 'column',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 100,
    zIndex: 2,
  },

  headertext: {
    fontSize: 45,
    color: colors.elf,
    fontFamily: 'Gilroy-Bold',
  },

  headersub: {
    fontSize: 12,
    color: colors.grey,
    fontFamily: 'Gilroy-Medium',
  },

  /* Text */

  textfields: {
    width: '80%',
    gap: 10,
    marginBottom: 20,
    zIndex: 2,
  },

  textfield: {
    height: 55,
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    elevation: 10,
    shadowColor: colors.dullGrey,
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
    color: colors.grey,
    fontFamily: 'Gilroy-Medium',
  },

  text: {
    fontSize: 12,
    color: colors.grey,
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 0.7,
    marginBottom: 20,
  },

  /* Document */

  documentfields: {
    width: '80%',
    zIndex: 2,
  },

  documentfield: {
    width: '100%',
    gap: 5,
    marginBottom: 15,
  },

  documentitle: {
    fontSize: 12,
    color: colors.dullGrey,
    fontFamily: 'Gilroy-Medium',
  },

  /* Upload */

  dropzone: {
    height: 120,
    backgroundColor: colors.lightgreen,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: colors.elf,
    borderStyle: 'dashed',
  },

  uploadprompt: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  uploadedfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  uploadtext: {
    fontSize: 10,
    color: colors.elf,
    fontFamily: 'Gilroy-Medium',
    textAlign: 'center',
  },

  uploadedtext: {
    fontSize: 10,
    color: colors.elf,
    fontFamily: 'Gilroy-Medium',
  },

  /* Pages */

  pages: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    textAlign: 'right',
    gap: 2,
    zIndex: 2,
  },
  
  pagetext: {
    fontSize: 10,
    color: colors.elf,
    fontFamily: 'Gilroy-Medium',
    top: 3,
  },
    
  pagesub: {
    fontSize: 25,
    color: colors.elf,
    fontFamily: 'Gilroy-SemiBold',
  },

  /* Footer */
  
  footer: {
    width: '80%',
    flexDirection: 'column',
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    marginBottom: 20,
  },

  /* Button */

  button: {
    width: '100%',
    backgroundColor: colors.elf,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    elevation: 10,
    shadowColor: colors.dullGrey,
  },

  buttontext: {
    fontSize: 13,
    color: colors.white,
    fontFamily: 'Gilroy-Bold',    
    letterSpacing: 2,
  },

  /* Sign  */

  sign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    alignItems: 'center',
  },

  signtext: {
    fontSize: 12,
    color: colors.grey,
    fontFamily: 'Gilroy-Medium',
  },

  signsub: {
    fontSize: 13,
    color: colors.elf,
    fontFamily: 'Gilroy-Bold',
  },

  /* Rep */

  rep: {
    position: 'absolute',
    flexDirection: 'column',
    gap: 5,
    bottom: 205,
    left: -90,
    transform: [
      { rotate: '-90deg' },
      { translateX: -100 }
    ],
    opacity: 0.05,
    zIndex: 1,
  },

  reptext: {
    fontSize: 85,
    color: colors.elf,
    fontFamily: 'Gilroy-Bold',
  },

  repsub: {
    fontSize: 25,
    color: colors.grey,
    fontFamily: 'Gilroy-Regular',
  },

  /* Backward */

  backward: {
    width: '80%',
    marginTop: 20,
    zIndex: 2,
    justifyContent: 'flex-start',
  },

  /* Add-Ons */

  back: {
    borderRadius: 15,
    padding: 20,
    width: 50,
    height: 50,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: colors.grey,
  },

  float1: {
    position: 'absolute',
    bottom: 550,
    right: -30,
    zIndex: 0,
    transform: [
      { rotate: '30deg' },
    ],
  },

  float2: {
    position: 'absolute',
    bottom: 450,
    left: -80,
    zIndex: 0,
    transform: [
      { rotate: '-30deg' },
    ],
  },

  /* Icons and Images */

  icon: {
    width: 18,
    height: 18,
  },

  image1: {
    width: 150,
    height: 150,
    opacity: 1,
  },

  image2: {
    width: 300,
    height: 300,
    opacity: 0.1,
  }
});

export default Farmer;