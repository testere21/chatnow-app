// expo-haptics kaldırıldı
import React, { useState } from 'react';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

interface SwipeableTabContainerProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  enabled?: boolean;
}

export const SwipeableTabContainer: React.FC<SwipeableTabContainerProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  enabled = true,
}) => {
  const [lastSwipe, setLastSwipe] = useState(0);
  const SWIPE_COOLDOWN = 200; // 200ms bekle
  const SWIPE_THRESHOLD = 30; // Minimum 30px swipe gerekli (daha kolay)

  const onHandlerStateChange = (event: any) => {
    if (!enabled) return;

    if (event.nativeEvent.state === State.END) {
      const now = Date.now();
      if (now - lastSwipe < SWIPE_COOLDOWN) return;

      const { translationX } = event.nativeEvent;
      
      console.log('🔄 Swipe detected:', { translationX, threshold: SWIPE_THRESHOLD });
      
      if (translationX > SWIPE_THRESHOLD && onSwipeRight) {
        // Sağa swipe - önceki sayfa
        console.log('➡️ Swipe Right triggered');
        setLastSwipe(now);
        // Haptic feedback kaldırıldı
        onSwipeRight();
      } else if (translationX < -SWIPE_THRESHOLD && onSwipeLeft) {
        // Sola swipe - sonraki sayfa
        console.log('⬅️ Swipe Left triggered');
        setLastSwipe(now);
        // Haptic feedback kaldırıldı
        onSwipeLeft();
      }
    }
  };

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <PanGestureHandler
      onHandlerStateChange={onHandlerStateChange}
      activeOffsetX={[-20, 20]} // Daha hassas başlangıç
      failOffsetY={[-30, 30]} // Dikey scroll'u engelle
      minPointers={1}
      maxPointers={1}
    >
      {children}
    </PanGestureHandler>
  );
};
