import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        // Haptic feedback kaldırıldı - expo-haptics modülü kaldırıldı
        props.onPressIn?.(ev);
      }}
    />
  );
}
