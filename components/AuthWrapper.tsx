import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isAuthenticated, isLoading, currentUser } = useAuth();
  const router = useRouter();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // Loading bittiğinde direkt yönlendirme yap
    if (!isLoading) {
      if (isAuthenticated) {
        console.log('🏠 Ana sayfaya yönlendiriliyor');
        router.replace('/home');
      }
      // isAuthenticated false ise zaten login sayfasındayız, yönlendirme yapma
    }
  }, [isAuthenticated, isLoading, router]);

  // App lifecycle takibi - uygulama kapanma/arka plana geçme
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // Uygulama aktif hale geldi
        console.log('📱 Uygulama aktif hale geldi');
        if (currentUser?.id) {
          // WebSocket ile online durumu yönetiliyor
          console.log('ℹ️ setUserOnline: Firebase kullanımı kaldırıldı, WebSocket ile yönetiliyor');
        }
      } else if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
        // Uygulama arka plana geçti veya kapatıldı
        console.log('📱 Uygulama arka plana geçti/kapatıldı');
        if (currentUser?.id) {
          // WebSocket ile offline durumu yönetiliyor
          console.log('ℹ️ setUserOffline: Firebase kullanımı kaldırıldı, WebSocket ile yönetiliyor');
        }
      }
      
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription?.remove();
    };
  }, [currentUser?.id]);

  // Direkt children'ı göster
  return <>{children}</>;
};
