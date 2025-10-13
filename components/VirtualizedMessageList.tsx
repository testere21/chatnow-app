import React, { memo, useCallback, useMemo, useRef } from 'react';
import { FlatList, ListRenderItem, ViewToken } from 'react-native';
import { ImageCacheService } from '../services/ImageCacheService';

export interface VirtualizedMessage {
  id: string;
  text: string;
  imageUrl?: string;
  senderId: string;
  timestamp: any;
  isCurrentUser: boolean;
  chatUser: any;
  currentUser: any;
}

interface VirtualizedMessageListProps {
  messages: VirtualizedMessage[];
  renderMessage: ListRenderItem<VirtualizedMessage>;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  onScroll?: (event: any) => void;
  scrollEventThrottle?: number;
  style?: any;
  contentContainerStyle?: any;
  showsVerticalScrollIndicator?: boolean;
  ref?: React.Ref<FlatList>;
}

// WhatsApp seviyesi virtual scrolling
const VirtualizedMessageList = memo<VirtualizedMessageListProps>(({
  messages,
  renderMessage,
  onEndReached,
  onEndReachedThreshold = 0.1,
  onScroll,
  scrollEventThrottle = 16,
  style,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  ref
}) => {
  const flatListRef = useRef<FlatList>(null);

  // WhatsApp seviyesi performans optimizasyonları
  const performanceProps = useMemo(() => ({
    // Virtual scrolling optimizasyonları
    removeClippedSubviews: true,
    maxToRenderPerBatch: 10, // WhatsApp standardı
    windowSize: 21, // WhatsApp standardı (10 üst + 10 alt + 1 mevcut)
    initialNumToRender: 20, // İlk yükleme
    updateCellsBatchingPeriod: 50, // 50ms batch güncelleme
    scrollEventThrottle: scrollEventThrottle,
    
    // Memory optimizasyonları
    getItemLayout: (data: VirtualizedMessage[] | null | undefined, index: number) => ({
      length: 80, // Ortalama mesaj yüksekliği
      offset: 80 * index,
      index,
    }),
    
    // Scroll optimizasyonları
    maintainVisibleContentPosition: {
      minIndexForVisible: 0,
      autoscrollToTopThreshold: 10
    },
    
    // WhatsApp benzeri davranış
    onEndReachedThreshold: onEndReachedThreshold,
    decelerationRate: 'fast',
    bounces: true,
    bouncesZoom: false,
    
    // Performance
    keyboardShouldPersistTaps: 'handled',
    keyboardDismissMode: 'on-drag',
  }), [onEndReachedThreshold, scrollEventThrottle]);

  // Mesajları önceden yükle (WhatsApp'ın yaptığı gibi)
  const preloadImages = useCallback((messages: VirtualizedMessage[]) => {
    messages.forEach(message => {
      if (message.imageUrl) {
        ImageCacheService.preloadImage(message.imageUrl);
      }
    });
  }, []);

  // Mesajlar değiştiğinde resimleri önceden yükle
  React.useEffect(() => {
    preloadImages(messages);
  }, [messages, preloadImages]);

  // Scroll handler
  const handleScroll = useCallback((event: any) => {
    onScroll?.(event);
  }, [onScroll]);

  // End reached handler
  const handleEndReached = useCallback(() => {
    onEndReached?.();
  }, [onEndReached]);

  // Viewable items changed (WhatsApp'ın yaptığı gibi)
  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    // Görünen mesajları log'la (debug için)
    if (__DEV__) {
      console.log('👁️ VirtualizedMessageList: Görünen mesajlar:', viewableItems.length);
    }
  }, []);

  const viewabilityConfig = useMemo(() => ({
    itemVisiblePercentThreshold: 50, // %50 görünürse aktif say
    minimumViewTime: 100, // 100ms görünür kalmalı
  }), []);

  return (
    <FlatList
      ref={ref || flatListRef}
      data={messages}
      renderItem={renderMessage}
      keyExtractor={(item) => item.id}
      onScroll={handleScroll}
      onEndReached={handleEndReached}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      style={style}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      {...performanceProps}
    />
  );
});

VirtualizedMessageList.displayName = 'VirtualizedMessageList';

export default VirtualizedMessageList;
