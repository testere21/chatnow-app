import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CountBadgeProps {
  count: number;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  backgroundColor?: string;
}

export const CountBadge: React.FC<CountBadgeProps> = ({ 
  count, 
  size = 'medium', 
  color = '#FFFFFF', 
  backgroundColor = '#ef4444' 
}) => {
  if (count <= 0) return null;

  const displayCount = count > 99 ? '99+' : count.toString();

  const sizeStyles = {
    small: {
      minWidth: 16,
      height: 16,
      borderRadius: 8,
      fontSize: 10,
      paddingHorizontal: 4,
    },
    medium: {
      minWidth: 20,
      height: 20,
      borderRadius: 10,
      fontSize: 12,
      paddingHorizontal: 6,
    },
    large: {
      minWidth: 24,
      height: 24,
      borderRadius: 12,
      fontSize: 14,
      paddingHorizontal: 8,
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <View style={[
      styles.badge,
      {
        minWidth: currentSize.minWidth,
        height: currentSize.height,
        borderRadius: currentSize.borderRadius,
        backgroundColor,
        paddingHorizontal: currentSize.paddingHorizontal,
      }
    ]}>
      <Text style={[
        styles.badgeText,
        {
          fontSize: currentSize.fontSize,
          color,
        }
      ]}>
        {displayCount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  badgeText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CountBadge;

