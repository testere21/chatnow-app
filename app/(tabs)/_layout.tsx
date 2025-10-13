import { Tabs } from 'expo-router';
import { useEffect } from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { NotificationService } from '@/services/NotificationService';
import { webSocketService } from '@/services/websocket';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // TabLayout component rendered

  // Initialize notifications
  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        // Starting notification initialization
        const result = await NotificationService.initialize();
        
        if (result) {
          // Notification service initialized successfully
          // Test local notification
          setTimeout(() => {
            NotificationService.sendTestNotification();
          }, 2000);
        } else {
          // Notification service initialization failed
        }
      } catch (error) {
        // Error initializing notifications
      }
        
      // Set up notification listeners
      const notificationListener = NotificationService.addNotificationReceivedListener(
        (notification) => {
          // Notification received
        }
      );

      const responseListener = NotificationService.addNotificationResponseReceivedListener(
        (response) => {
          // Handle notification tap - navigate to chat
          const data = response.notification.request.content.data;
          if (data?.chatId) {
            // Navigation will be handled by the app
          }
        }
      );

      return () => {
        notificationListener.remove();
        responseListener.remove();
        NotificationService.cleanup();
      };
    };

    initializeNotifications();
  }, []);

  // Global WebSocket event listener for local notifications
  useEffect(() => {
    console.log('🔔 Setting up global WebSocket listener for local notifications');
    console.log('🔔 WebSocket connection status:', webSocketService.isConnected());
    
    const handleLocalNotification = (data: any) => {
      console.log('📱 Global local notification received from backend:', data);
      
      // Arkaplanda sistem bildirimi gönder
      NotificationService.showBackgroundNotification(
        data.title,
        data.body,
        data.data
      );
    };
    
    // WebSocket event'ini dinle
    webSocketService.on('localNotification', handleLocalNotification);
    // WebSocket listener registered for localNotification
    
    return () => {
      webSocketService.off('localNotification', handleLocalNotification);
      // WebSocket listener removed for localNotification
    };
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}