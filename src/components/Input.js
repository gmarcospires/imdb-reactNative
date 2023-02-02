import { StyleSheet, View, TextInput, Text } from 'react-native';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';

const Input = ({ error, label, ...inputProps }) => {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={[styles.input, !!error && styles.borderError]}
        {...inputProps}
      />
      {!!error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    borderRadius: 10,
    fontFamily: 'Inter_400Regular',
  },
  text: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Inter_400Regular',
    marginBottom: 5,
  },
  container: {
    width: '80%',
    borderRadius: 10,
    marginBottom: 10,
    fontFamily: 'Inter_400Regular',
  },
  borderError: {
    borderWidth: 1,
    borderColor: 'rgba(200,0,50,1)',
  },
  errorMessage: {
    textAlign: 'left',
    fontSize: 12,
    color: 'rgba(200,0,50,1)',
    marginTop: 5,
    fontFamily: 'Inter_400Regular',
  },
});
export default Input;
