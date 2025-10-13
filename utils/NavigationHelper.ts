import { router } from 'expo-router';

/**
 * Navigation Helper - NUCLEAR OPTION navigation
 * Completely destroys Expo Router's internal stack
 */
export class NavigationHelper {
  private static mainPages = ['/home', '/chats', '/profile'];
  private static authPages = ['/auth/login', '/auth/register', '/Welcome'];
  private static navigationHistory: string[] = [];
  private static isNavigating = false; // Prevent multiple navigation calls
  private static nuclearOption = true; // Enable nuclear option
  private static maxHistorySize = 10; // Maximum history size

  /**
   * Navigate with smart history management - OPTIMIZED VERSION
   * @param path - Target path
   * @param replace - Whether to replace current screen
   */
  static navigate(path: string, replace = false) {
    try {
      const isMainPage = this.mainPages.includes(path);
      
      // If navigating to a main page, clear ALL history immediately
      if (isMainPage) {
        this.navigationHistory = [path];
        router.replace(path);
        return;
      }
      
      // Only add to history if it's a sub-page of current main page
      const shouldKeep = this.shouldKeepInHistory(path);
      
      if (!replace && shouldKeep) {
        this.navigationHistory.push(path);
      }

      // Navigate
      if (replace) {
        router.replace(path);
      } else {
        router.push(path);
      }

      // Cleanup old history
      this.cleanupHistory();
    } catch (error) {
      console.error('❌ NavigationHelper: Navigation error:', error);
    }
  }

  /**
   * Check if path should be kept in history
   */
  private static shouldKeepInHistory(path: string): boolean {
    // NEVER keep auth pages in history
    if (this.authPages.includes(path)) {
      return false;
    }

    // Always keep main pages
    if (this.mainPages.includes(path)) {
      return true;
    }

    // Keep sub-pages of current main page
    const currentMainPage = this.getCurrentMainPage();
    if (currentMainPage && path.startsWith(currentMainPage)) {
      return true;
    }

    // Don't keep other pages
    return false;
  }

  /**
   * Get current path from navigation history
   */
  private static getCurrentPath(): string {
    return this.navigationHistory[this.navigationHistory.length - 1] || '/home';
  }

  /**
   * Get current main page from history
   */
  private static getCurrentMainPage(): string | null {
    for (let i = this.navigationHistory.length - 1; i >= 0; i--) {
      if (this.mainPages.includes(this.navigationHistory[i])) {
        return this.navigationHistory[i];
      }
    }
    return null;
  }

  /**
   * Navigate back with simple logic
   */
  static goBack() {
    try {
      // Simple back navigation - just use router.back()
      if (router.canGoBack()) {
        router.back();
      } else {
        // If can't go back, go to home
        this.navigationHistory = ['/home'];
        router.replace('/home');
      }
    } catch (error) {
      console.error('❌ NavigationHelper: Go back error:', error);
      // Emergency fallback to home
      this.navigationHistory = ['/home'];
      router.replace('/home');
    }
  }

  /**
   * Navigate to home - ULTRA FAST
   */
  static goHome() {
    this.navigationHistory = ['/home'];
    // Use replace to prevent going back to auth pages
    router.replace('/home');
  }

  /**
   * Navigate to chats - ULTRA FAST
   */
  static goToChats() {
    const currentPath = this.getCurrentPath();
    if (currentPath === '/chats') {
      return; // Already on chats, don't reload
    }
    this.navigationHistory = ['/chats'];
    // Use push instead of replace for faster navigation
    router.push('/chats');
  }

  /**
   * Navigate to profile - ULTRA FAST
   */
  static goToProfile() {
    const currentPath = this.getCurrentPath();
    if (currentPath === '/profile') {
      return; // Already on profile, don't reload
    }
    this.navigationHistory = ['/profile'];
    // Use push instead of replace for faster navigation
    router.push('/profile');
  }

  /**
   * Clear navigation history
   */
  static clearHistory() {
    this.navigationHistory = [];
  }

  /**
   * Get navigation history
   */
  static getHistory(): string[] {
    return [...this.navigationHistory];
  }

  /**
   * Cleanup old history
   */
  private static cleanupHistory() {
    if (this.navigationHistory.length > this.maxHistorySize) {
      this.navigationHistory = this.navigationHistory.slice(-this.maxHistorySize);
    }
  }

  /**
   * Navigate to chat with optimization
   */
  static goToChat(userId: string) {
    const chatPath = `/chat/${userId}`;
    this.navigationHistory.push(chatPath);
    
    try {
      router.push(chatPath);
    } catch (error) {
      console.error('❌ NavigationHelper: Chat ekranına gidilirken hata:', error);
    }
  }

  /**
   * Navigate to user profile with optimization
   */
  static goToUserProfile(userId: string) {
    const profilePath = `/profile/${userId}`;
    this.navigationHistory.push(profilePath);
    router.push(profilePath);
  }

  /**
   * Navigate to edit profile
   */
  static goToEditProfile() {
    const editPath = '/profile/edit';
    this.navigationHistory.push(editPath);
    router.push(editPath);
  }

  /**
   * Navigate to blocked users
   */
  static goToBlockedUsers() {
    const blockedPath = '/profile/blocked-users';
    this.navigationHistory.push(blockedPath);
    router.push(blockedPath);
  }

  /**
   * Navigate to token purchase
   */
  static goToTokenPurchase() {
    const tokenPath = '/tokens/purchase';
    this.navigationHistory.push(tokenPath);
    router.push(tokenPath);
  }

  /**
   * Navigate to messages page
   */
  static goToMessages() {
    const messagesPath = '/chats';
    this.navigationHistory.push(messagesPath);
    router.push(messagesPath);
  }

  /**
   * Navigate to login (clears history for security)
   */
  static goToLogin() {
    this.navigationHistory = [];
    router.replace('/auth/login');
  }

  /**
   * Navigate to register (clears history for security)
   */
  static goToRegister() {
    this.navigationHistory = [];
    router.replace('/auth/register');
  }

  /**
   * Navigate to welcome (clears history for security)
   */
  static goToWelcome() {
    this.navigationHistory = [];
    router.replace('/Welcome');
  }

  /**
   * Check if current page is auth page
   */
  static isAuthPage(path: string): boolean {
    return this.authPages.includes(path);
  }

  /**
   * Get safe back destination
   */
  static getSafeBackDestination(): string {
    if (this.navigationHistory.length > 0) {
      const lastPage = this.navigationHistory[this.navigationHistory.length - 1];
      if (!this.authPages.includes(lastPage)) {
        return lastPage;
      }
    }
    return '/home';
  }
}
