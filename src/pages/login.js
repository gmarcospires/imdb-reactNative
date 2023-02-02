import * as React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, TextInput, Text, ScrollView } from "react-native";
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import Input from '../components/Input';
const MyComponent = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [errors, setErrors] = React.useState({});

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
  });

  return (
    <ScrollView style={styles.page}>
      <View style={{  padding: 30}}>
        <Text variant="titleLarge" style={styles.titleText}>
          Login
        </Text>
        <Input
          label={"Email"}
          error={errors?.email}
          placeholder={"Digite seu email"}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          secureTextEntry
          label={"Senha"}
          error={errors?.password}
          placeholder={"Digite sua senha"}
          onChangeText={(text) => setSenha(text)}
        />
        <Button
          style={{ maxWidth: 150, alignSelf: "center", marginTop: 20 }}
          mode="contained"
          onPress={() => {
            if (!email && !senha) {
              setErrors({
                email: "Email inválido",
                password: "Senha inválida",
              });
              return;
            }
            if (!email) {
              setErrors({ email: "Email inválido" });
              return;
            }
            if (!senha) {
              setErrors({ password: "Senha inválida" });
              return;
            }
            navigation.navigate("Home");
          }}
          text={"Continuar"}
        >
          Entrar
        </Button>
      </View>
    </ScrollView>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  page: {
    color: '#000',
    margin: 10,
    padding: 10,
    fontFamily: 'Inter_400Regular',
    flex: 1
  },
  titleText: {
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#000',
    fontFamily: 'Inter_400Regular',
    fontWeight: 'bold',
  },
  text: {
    color: '#000',
    fontFamily: 'Inter_400Regular',
  },
});
