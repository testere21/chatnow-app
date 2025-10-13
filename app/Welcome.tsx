import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Welcome() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Hoş geldin!</Text>
      <Text style={styles.subtitle}>Uygulamamıza başlamak için ileriye dokun.</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/login')}>
        <Text style={styles.buttonText}>Başla</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#0b1215',
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#a9b6c3',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#1976f3',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});