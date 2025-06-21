import { Image, View, StyleSheet } from 'react-native';

export default function HeaderLogo() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo_ccss.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 16 },
  logo: { width: 120, height: 60 },
});