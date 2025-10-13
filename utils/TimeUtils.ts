/**
 * Zaman formatları için utility fonksiyonları
 */

export const formatLastSeen = (lastSeen: Date | string | any): string => {
  if (!lastSeen || lastSeen === '{}' || lastSeen === 'null' || lastSeen === 'undefined') {
    return 'Bilinmiyor';
  }
  
  try {
    const now = new Date();
    let lastSeenDate: Date;

    // MongoDB date object formatını kontrol et
    if (typeof lastSeen === 'object' && lastSeen.$date) {
      lastSeenDate = new Date(lastSeen.$date);
    } else if (typeof lastSeen === 'object' && lastSeen instanceof Date) {
      lastSeenDate = lastSeen;
    } else {
      lastSeenDate = new Date(lastSeen);
    }
    
    // Geçersiz tarih kontrolü
    if (isNaN(lastSeenDate.getTime())) {
      return 'Bilinmiyor';
    }
    
    const diffInMs = now.getTime() - lastSeenDate.getTime();
    
    // Gelecek tarih kontrolü - gelecek tarihler için "Bilinmiyor" döndür
    if (diffInMs < 0) {
      return 'Bilinmiyor';
    }
    
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);


    if (diffInSeconds < 60) {
      return 'Şimdi aktif';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} dakika önce`;
    } else if (diffInHours < 24) {
      return `${diffInHours} saat önce`;
    } else if (diffInDays < 7) {
      return `${diffInDays} gün önce`;
    } else {
      return lastSeenDate.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'short',
        year: diffInDays > 365 ? 'numeric' : undefined
      });
    }
  } catch (error) {
    return 'Bilinmiyor';
  }
};

export const formatMessageTime = (timestamp: Date | string): string => {
  if (!timestamp) return '';
  
  const now = new Date();
  const messageDate = new Date(timestamp);
  const diffInMs = now.getTime() - messageDate.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 24) {
    return messageDate.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } else if (diffInDays < 7) {
    return messageDate.toLocaleDateString('tr-TR', {
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  } else {
    return messageDate.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};

export const getOnlineStatusText = (isOnline: boolean, lastSeen?: Date | string): string => {
  if (isOnline) {
    return 'Çevrimiçi';
  } else if (lastSeen) {
    return `Son görülme: ${formatLastSeen(lastSeen)}`;
  } else {
    return 'Çevrimdışı';
  }
};
