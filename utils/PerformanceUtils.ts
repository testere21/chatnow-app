// Performance monitoring utilities
export class PerformanceMonitor {
  private static startTimes: { [key: string]: number } = {};

  static startTimer(label: string): void {
    this.startTimes[label] = Date.now();
  }

  static endTimer(label: string): number {
    const startTime = this.startTimes[label];
    if (!startTime) {
      console.warn(`Timer ${label} was not started`);
      return 0;
    }
    
    const duration = Date.now() - startTime;
    console.log(`⏱️ ${label}: ${duration}ms`);
    delete this.startTimes[label];
    return duration;
  }

  static measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.startTimer(label);
    return fn().finally(() => {
      this.endTimer(label);
    });
  }
}

// Image optimization utilities
export const ImageOptimizer = {
  // Optimize image dimensions
  getOptimizedDimensions(originalWidth: number, originalHeight: number, maxSize: number = 300) {
    const aspectRatio = originalWidth / originalHeight;
    
    if (originalWidth > originalHeight) {
      return {
        width: maxSize,
        height: Math.round(maxSize / aspectRatio)
      };
    } else {
      return {
        width: Math.round(maxSize * aspectRatio),
        height: maxSize
      };
    }
  },

  // Get optimized image source
  getOptimizedSource(uri: string, quality: number = 80) {
    if (uri.startsWith('data:')) {
      return uri;
    }
    
    // Add quality parameter if it's a web URL
    if (uri.startsWith('http')) {
      const separator = uri.includes('?') ? '&' : '?';
      return `${uri}${separator}quality=${quality}`;
    }
    
    return uri;
  }
};

// Memory management utilities
export const MemoryManager = {
  // Clear unused data
  clearUnusedData(): void {
    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }
  },

  // Monitor memory usage
  getMemoryUsage(): any {
    if (global.performance && (global.performance as any).memory) {
      return {
        used: (global.performance as any).memory.usedJSHeapSize,
        total: (global.performance as any).memory.totalJSHeapSize,
        limit: (global.performance as any).memory.jsHeapSizeLimit
      };
    }
    return null;
  }
};

// Network optimization utilities
export const NetworkOptimizer = {
  // Debounce function calls
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Throttle function calls
  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};
