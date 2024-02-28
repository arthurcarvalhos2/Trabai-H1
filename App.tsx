import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState<string>('');
  const [altura, setAltura] = useState<string>('');
  const [calculoIMC, setCalculoIMC] = useState<number>(0.0);
  const [resultadoIMC, setResultadoIMC] = useState<string>('');
  const [visivel, setVisivel] = useState<boolean>(false);

  const calcularIMC = () => {
    setVisivel(false);

    if (!peso.trim() || !altura.trim()) {
      alert('Não deixe os campos vazios!');
      return;
    }

    const pesoConvertido = parseFloat(peso.replace(/,/g, "."));
    const alturaConvertida = parseFloat(altura.replace(/,/g, "."));

    if (pesoConvertido === 0 || alturaConvertida === 0) {
      alert('É necessário que os valores sejam diferentes de zero!');
      return;
    }

    try {
      const alturaAoQuadrado = alturaConvertida * alturaConvertida;
      const imc = pesoConvertido / alturaAoQuadrado;

      setCalculoIMC(imc);

      if (imc <= 16.9) setResultadoIMC('Muito abaixo do peso');
      else if (imc <= 18.4) setResultadoIMC('Abaixo do peso');
      else if (imc <= 24.9) setResultadoIMC('Peso normal');
      else if (imc <= 29.9) setResultadoIMC('Acima do peso');
      else if (imc <= 34.9) setResultadoIMC('Obesidade grau I');
      else if (imc < 40.0) setResultadoIMC('Obesidade grau II');
      else setResultadoIMC('Obesidade grau III');

      setVisivel(true);
    } catch (error) {
      alert(`Erro ao realizar cálculo do IMC: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Cálculo do IMC</Text>

      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Digite seu peso'
        onChangeText={(e) => setPeso(e)}
      />
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Digite sua altura'
        onChangeText={(e) => setAltura(e)}
      />

      <TouchableOpacity style={styles.button} onPress={calcularIMC}>
        <Text style={styles.buttonText}>Calcular seu IMC</Text>
      </TouchableOpacity>

      {visivel && (
        <Text style={styles.textResult}>
          Seu IMC é: {calculoIMC.toFixed(2)}, e sua classificação é: {resultadoIMC}
        </Text>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff7c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#000000',
    textAlign: 'center',
    padding: 10,
    width: 200,
    height: 40,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#257904',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textTitle: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  textResult: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});