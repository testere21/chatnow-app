import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { API_CONFIG } from '../../config/api';
import { useProfile } from '../../contexts/ProfileContext';
import { NavigationHelper } from '../../utils/NavigationHelper';

export default function BlockedUsers() {
  const { unblockUser } = useProfile();
  const [blockedUsersList, setBlockedUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

  // Engellenen kullanıcıları yükle
  const loadBlockedUsers = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('auth_token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/users/blocked`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setBlockedUsersList(data.blockedUsers || []);
      }
    } catch (error) {
      console.error('❌ Engellenen kullanıcılar yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlockedUsers();
  }, []);

  const handleUnblockUser = async (userId: string) => {
    try {
      await unblockUser(userId);
      setBlockedUsersList(prev => prev.filter(u => u.id !== userId));
    } catch (error) {
      console.error('❌ Engelleme kaldırılırken hata:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#EF4444', '#DC2626']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 10 }]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => NavigationHelper.goToProfile()}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Engellenen Kullanıcılar</Text>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Yükleniyor...</Text>
          </View>
        ) : blockedUsersList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="person-remove-outline" size={48} color="#9CA3AF" />
            </View>
            <Text style={styles.emptyTitle}>Henüz kimseyi engellememişsin</Text>
            <Text style={styles.emptyMessage}>
              Birini engellediğinde burada görünecek
            </Text>
          </View>
        ) : (
          <View style={styles.usersList}>
            {blockedUsersList.map((user) => (
              <View key={user.id} style={styles.userItem}>
                <View style={styles.userInfo}>
                  <View style={[styles.userAvatar, { backgroundColor: user.bgColor || '#FFB6C1' }]}>
                    {user.avatarImage ? (
                      <Image 
                        source={{ 
                          uri: user.avatarImage.startsWith('data:') 
                            ? user.avatarImage 
                            : `data:image/jpeg;base64,${user.avatarImage}`
                        }} 
                        style={styles.userAvatarImage}
                      />
                    ) : (
                      <Text style={styles.userAvatarText}>
                        {user.avatar || (user.gender === 'male' ? '👨' : '👩')}
                      </Text>
                    )}
                  </View>
                  <View style={styles.userDetails}>
                    <Text style={styles.userName}>
                      {user.name}{user.surname ? ` ${user.surname}` : ''}
                    </Text>
                    <Text style={styles.userReason}>
                      {user.reason}
                    </Text>
                    <Text style={styles.userDate}>
                      {new Date(user.blockedAt).toLocaleDateString('tr-TR')}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.unblockButton}
                  onPress={() => handleUnblockUser(user.id)}
                >
                  <Text style={styles.unblockButtonText}>Engeli Kaldır</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  usersList: {
    paddingHorizontal: 20,
  },
  userItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userAvatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userAvatarText: {
    fontSize: 20,
    color: '#ffffff',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  userReason: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  userDate: {
    fontSize: 11,
    color: '#9ca3af',
  },
  unblockButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  unblockButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
