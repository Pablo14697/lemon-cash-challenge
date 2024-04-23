// React

// React Native
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native';

import LogOut from './assets/logout.png'
import { useContext } from 'react';
 import { AuthContext } from '../../../../providers/AuthProvider/AuthProvider';




const Header = () => {
  const { logOut} = useContext(AuthContext)
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fafafa',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: 60,
          borderBottomWidth: 0.2,
          paddingLeft: 10,
          paddingRight: 20,
        }}>
         <Pressable style={{width: '50%', flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}} >
          <Text style={{ fontFamily: 'NeueMontreal-Medium', fontSize: 22,  }}>
            Crypto Market
          </Text>

        </Pressable>
        <Pressable onPress={logOut} style={{ flexDirection: 'row', gap: 10, width: '50%', alignItems:'center', justifyContent: 'flex-end' }}>

          <Image source={LogOut} style={{ height: 25, width: 25 }} />

        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Header;
