import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

// DATA
import jsonData from '../../utils/categories.json';

// COMPONENTS
import ImageButton from '../../components/buttons/ImageButton';

export default function TabOneScreen() {
  const baseLocation = '../../assets/images/';
  // const fileName = jsonData[1].imageSRC;
  const fileName = 'beverages.png';
  // const sample = {
  //   '0' : 'appetizers.png',
  //   '1' : 'beverages.png'
  // }
  const imageLocation = baseLocation + fileName;
  const image = require(imageLocation);

  const pressState = () => {
    console.log('Button Pressed')
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" /> */}

      <ImageButton
        image={image}
        text={jsonData[1].name}
        onPress={pressState}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
