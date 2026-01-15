// Splash Screen Controller
// Manages the loading splash screen with progress indicator

class SplashScreenController {
  constructor() {
    this.splashScreen = document.getElementById('splash-screen');
    this.progressBar = document.getElementById('splash-progress');
    this.percentageText = document.getElementById('splash-percentage');
    this.currentProgress = 0;
    this.isLoadingComplete = false;
  }

  // Show the splash screen
  show() {
    if (this.splashScreen) {
      this.splashScreen.classList.remove('hidden', 'fade-out');
    }
  }

  // Hide the splash screen
  hide() {
    if (this.splashScreen) {
      // Force progress to 100%
      this.updateProgress(100);
      
      // Immediate hide with fade effect
      this.splashScreen.style.opacity = '0';
      this.splashScreen.style.transition = 'opacity 0.5s ease';
      
      // Remove completely after fade
      setTimeout(() => {
        this.splashScreen.style.display = 'none';
        console.log('Splash screen hidden');
      }, 500);
    }
  }

  // Update progress percentage
  updateProgress(percentage) {
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    
    this.currentProgress = percentage;
    
    if (this.progressBar) {
      this.progressBar.style.width = `${percentage}%`;
    }
    
    if (this.percentageText) {
      this.percentageText.textContent = `${Math.round(percentage)}%`;
    }
  }

  // Simulate loading progress
  simulateLoading(duration = 3000) {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        
        this.updateProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          this.isLoadingComplete = true;
          setTimeout(resolve, 200); // Small delay before resolving
        }
      }, 50);
    });
  }

  // Track actual loading progress - ensures 100% before navigation
  trackLoadingProgress(promise, estimatedDuration = 3000) {
    return new Promise(async (resolve, reject) => {
      let isResolved = false;
      
      // Start simulated progress to exactly 100%
      const simulationPromise = this.simulateLoading(estimatedDuration);
      
      // Handle the actual promise
      promise
        .then((result) => {
          if (!isResolved) {
            isResolved = true;
            // Ensure we reach 100% before resolving
            this.updateProgress(100);
            setTimeout(() => resolve(result), 500); // Extra delay to ensure 100% is visible
          }
        })
        .catch((error) => {
          if (!isResolved) {
            isResolved = true;
            this.updateProgress(100);
            setTimeout(() => reject(error), 500);
          }
        });
      
      // Wait for simulation to complete and reach 100%
      await simulationPromise;
      
      // Give extra time to ensure 100% is displayed
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!isResolved) {
        // If actual loading took longer, wait for it but ensure 100%
        setTimeout(() => {
          if (!isResolved) {
            isResolved = true;
            this.updateProgress(100);
            resolve();
          }
        }, 1000);
      }
    });
  }

  // Apply current theme to splash screen
  applyCurrentTheme() {
    const body = document.body;
    const splash = this.splashScreen;
    
    if (!splash) return;
    
    // Remove all theme classes
    splash.classList.remove('light-mode', 'batman-mode');
    
    // Add current theme class
    if (body.classList.contains('light-mode')) {
      splash.classList.add('light-mode');
    } else if (body.classList.contains('batman-mode')) {
      splash.classList.add('batman-mode');
    }
  }
}

// Export singleton instance
export const splashController = new SplashScreenController();