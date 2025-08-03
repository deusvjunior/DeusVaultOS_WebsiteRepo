// Haptic Feedback Utility with Failsafe Implementation
// Provides vibration feedback for mobile devices with graceful degradation

interface HapticPattern {
  light: number;
  medium: number[];
  heavy: number;
  success: number[];
  error: number[];
  click: number;
  navigation: number[];
}

class HapticFeedback {
  private isSupported: boolean = false;
  private isEnabled: boolean = true;

  constructor() {
    this.checkSupport();
  }

  private checkSupport(): void {
    try {
      // Check for Vibration API support
      this.isSupported = 'vibrate' in navigator && typeof navigator.vibrate === 'function';
      
      // Additional check for mobile environment
      if (this.isSupported) {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.isSupported = isMobile || isTouchDevice;
      }
    } catch (error) {
      console.debug('Haptic feedback not supported:', error);
      this.isSupported = false;
    }
  }

  private patterns: HapticPattern = {
    light: 10,           // Light tap - button hover
    medium: [20],        // Medium tap - button press
    heavy: 50,           // Heavy tap - important action
    success: [20, 30, 20], // Success pattern - form submission
    error: [50, 50, 50],   // Error pattern - failed action
    click: 15,           // Standard click
    navigation: [10, 20] // Navigation transition
  };

  public vibrate(pattern: keyof HapticPattern | number | number[]): boolean {
    if (!this.isSupported || !this.isEnabled) {
      return false;
    }

    try {
      let vibrationPattern: number | number[];

      if (typeof pattern === 'string') {
        vibrationPattern = this.patterns[pattern];
      } else {
        vibrationPattern = pattern;
      }

      // Safety check - limit vibration duration and intensity
      if (typeof vibrationPattern === 'number') {
        vibrationPattern = Math.min(vibrationPattern, 100); // Max 100ms
      } else if (Array.isArray(vibrationPattern)) {
        vibrationPattern = vibrationPattern.map(v => Math.min(v, 100)); // Max 100ms each
        if (vibrationPattern.length > 10) {
          vibrationPattern = vibrationPattern.slice(0, 10); // Max 10 segments
        }
      }

      navigator.vibrate(vibrationPattern);
      return true;
    } catch (error) {
      console.debug('Haptic vibration failed:', error);
      return false;
    }
  }

  // Convenience methods for common patterns
  public light(): boolean {
    return this.vibrate('light');
  }

  public medium(): boolean {
    return this.vibrate('medium');
  }

  public heavy(): boolean {
    return this.vibrate('heavy');
  }

  public success(): boolean {
    return this.vibrate('success');
  }

  public error(): boolean {
    return this.vibrate('error');
  }

  public click(): boolean {
    return this.vibrate('click');
  }

  public navigation(): boolean {
    return this.vibrate('navigation');
  }

  // Control methods
  public enable(): void {
    this.isEnabled = true;
  }

  public disable(): void {
    this.isEnabled = false;
    try {
      navigator.vibrate(0); // Stop any ongoing vibration
    } catch (error) {
      // Silently fail
    }
  }

  public isAvailable(): boolean {
    return this.isSupported;
  }

  public getStatus(): { supported: boolean; enabled: boolean } {
    return {
      supported: this.isSupported,
      enabled: this.isEnabled
    };
  }
}

// Create singleton instance
export const hapticFeedback = new HapticFeedback();

// React hook for haptic feedback
export const useHapticFeedback = () => {
  return {
    vibrate: hapticFeedback.vibrate.bind(hapticFeedback),
    light: hapticFeedback.light.bind(hapticFeedback),
    medium: hapticFeedback.medium.bind(hapticFeedback),
    heavy: hapticFeedback.heavy.bind(hapticFeedback),
    success: hapticFeedback.success.bind(hapticFeedback),
    error: hapticFeedback.error.bind(hapticFeedback),
    click: hapticFeedback.click.bind(hapticFeedback),
    navigation: hapticFeedback.navigation.bind(hapticFeedback),
    isAvailable: hapticFeedback.isAvailable.bind(hapticFeedback),
    enable: hapticFeedback.enable.bind(hapticFeedback),
    disable: hapticFeedback.disable.bind(hapticFeedback),
    getStatus: hapticFeedback.getStatus.bind(hapticFeedback)
  };
};

export default hapticFeedback;
