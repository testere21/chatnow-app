import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useProfile } from '../../contexts/ProfileContext';

export default function InsufficientTokensScreen() {
  const router = useRouter();
  const { currentUser } = useProfile();

  const isMale = currentUser?.gender === 'male';

  return (
    <LinearGradient
      colors={isMale ? ['#3B82F6', '#1E40AF'] : ['#FF6B95', '#EC4899']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name="diamond-outline" 
            size={80} 
            color="white" 
          />
        </View>
        
        <Text style={styles.title}>Jetonunuz Bitti!</Text>
        
        <Text style={styles.message}>
          Mesaj göndermek için jeton gerekiyor:
        </Text>
        
        <View style={styles.costContainer}>
          <View style={styles.costItem}>
            <Ionicons name="chatbubble-outline" size={24} color="white" />
            <Text style={styles.costText}>Yazılı mesaj: 100 jeton</Text>
          </View>
          
          <View style={styles.costItem}>
            <Ionicons name="image-outline" size={24} color="white" />
            <Text style={styles.costText}>Resim mesajı: 500 jeton</Text>
          </View>
        </View>
        
        <View style={styles.tokenInfo}>
          <Text style={styles.tokenText}>
            Mevcut jetonunuz: {currentUser?.diamonds || 0}
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.purchaseButton]}
            onPress={() => router.push('/tokens/purchase')}
          >
            <Ionicons name="card-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Jeton Satın Al</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Geri Dön</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.9,
  },
  costContainer: {
    width: '100%',
    marginBottom: 30,
  },
  costItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  costText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 15,
  },
  tokenInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  tokenText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  purchaseButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
