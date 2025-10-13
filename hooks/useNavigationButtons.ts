import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useNavigationButtons = () => {
  const insets = useSafeAreaInsets();
  const [hasNavigationButtons, setHasNavigationButtons] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      // Android'de bottom inset 0'dan büyükse navigasyon tuşları var demektir
      // Genellikle 24px civarında olur
      setHasNavigationButtons(insets.bottom > 0);
    } else {
      // iOS'ta navigasyon tuşları yok, sadece home indicator var
      setHasNavigationButtons(false);
    }
  }, [insets.bottom]);

  return {
    hasNavigationButtons,
    bottomInset: insets.bottom,
    isAndroid: Platform.OS === 'android'
  };
};
