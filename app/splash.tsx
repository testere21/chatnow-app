import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default function Splash() {
  const router = useRouter();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bubble1Anim = useRef(new Animated.Value(0)).current;
  const bubble2Anim = useRef(new Animated.Value(0)).current;
  const bubble3Anim = useRef(new Animated.Value(0)).current;
  const bubble4Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('🚀 ChatNow Splash Screen - BAŞLADI!');
    
    // Ana animasyonlar
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Dönen konuşma balonları
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();

    // Konuşma balonu parıldama animasyonları
    const startBubbles = () => {
      // Bubble 1 - 💬
      Animated.loop(
        Animated.sequence([
          Animated.timing(bubble1Anim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(bubble1Anim, {
            toValue: 0.3,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Bubble 2 - 💭
      Animated.loop(
        Animated.sequence([
          Animated.delay(500),
          Animated.timing(bubble2Anim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(bubble2Anim, {
            toValue: 0.2,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Bubble 3 - 📱
      Animated.loop(
        Animated.sequence([
          Animated.delay(1000),
          Animated.timing(bubble3Anim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(bubble3Anim, {
            toValue: 0.1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Bubble 4 - ✨
      Animated.loop(
        Animated.sequence([
          Animated.delay(1500),
          Animated.timing(bubble4Anim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(bubble4Anim, {
            toValue: 0.4,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    // Animasyonları 300ms sonra başlat
    setTimeout(startBubbles, 300);
    
    // 4 saniye sonra login sayfasına yönlendir
    const timer = setTimeout(() => {
      router.replace('/auth/login');
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);

  // Dönüş animasyonu
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Konuşma balonu opacity değerleri
  const bubble1Opacity = bubble1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const bubble2Opacity = bubble2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.8],
  });

  const bubble3Opacity = bubble3Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 0.6],
  });

  const bubble4Opacity = bubble4Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  return (
    <LinearGradient
      colors={["#3B82F6", "#1E40AF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Dönen konuşma balonları */}
      <Animated.View 
        style={[
          styles.rotatingContainer,
          { transform: [{ rotate }] }
        ]}
      >
        <Animated.View style={[styles.bubble, styles.bubble1, { opacity: bubble1Opacity }]}>
          <Text style={styles.bubbleText}>💬</Text>
        </Animated.View>
        <Animated.View style={[styles.bubble, styles.bubble2, { opacity: bubble2Opacity }]}>
          <Text style={styles.bubbleText}>💭</Text>
        </Animated.View>
        <Animated.View style={[styles.bubble, styles.bubble3, { opacity: bubble3Opacity }]}>
          <Text style={styles.bubbleText}>📱</Text>
        </Animated.View>
        <Animated.View style={[styles.bubble, styles.bubble4, { opacity: bubble4Opacity }]}>
          <Text style={styles.bubbleText}>✨</Text>
        </Animated.View>
      </Animated.View>

      {/* Ana içerik */}
      <View style={styles.center}>
        {/* Logo */}
        <Animated.View 
          style={[
            styles.logoContainer,
            { 
              transform: [{ scale: scaleAnim }],
              opacity: fadeAnim 
            }
          ]}
        >
          <View style={styles.logoInner}>
            <Text style={styles.cnText}>CN</Text>
          </View>
        </Animated.View>
        
        {/* Başlık ve alt yazı */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.title}>ChatNow</Text>
          <Text style={styles.subtitle}>Hemen Sohbet Et!</Text>
        </Animated.View>
        
        {/* Loading bar */}
        <Animated.View style={[styles.loadingBar, { opacity: fadeAnim }]} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    zIndex: 10,
  },
  rotatingContainer: {
    position: 'absolute',
    width: 320,
    height: 320,
    top: '50%',
    left: '50%',
    marginTop: -160,
    marginLeft: -160,
    zIndex: 1,
  },
  bubble: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },
  bubble1: {
    top: 30,
    left: 125,
  },
  bubble2: {
    top: 125,
    right: 30,
  },
  bubble3: {
    bottom: 30,
    left: 125,
  },
  bubble4: {
    top: 125,
    left: 30,
  },
  bubbleText: {
    fontSize: 28,
  },
  logoContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 20,
    marginBottom: 30,
  },
  logoInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cnText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  title: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  subtitle: {
    marginTop: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  loadingBar: {
    width: 30,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
    marginTop: 40,
    opacity: 0.9,
  },
});
