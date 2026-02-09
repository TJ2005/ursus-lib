import { Easing, type EasingFunction } from './Easing';
import type { TweenOptions, AnimationState } from './types';

/**
 * VariableTextTweener - Animates variable font weight with easing
 * 
 * Features:
 * - Flexible easing (Easing class, function, string, or bezier array)
 * - onChange hook to conditionally trigger animations
 * - onComplete hook for chaining animations
 * - Promise-based for async/await support
 */
export class VariableTextTweener {
  private options: Required<Omit<TweenOptions, 'onChange' | 'onComplete' | 'onUpdate'>> & 
    Pick<TweenOptions, 'onChange' | 'onComplete' | 'onUpdate'>;
  private easingInstance: Easing;
  private animationState: AnimationState | null = null;
  private currentValue: number = 0;

  constructor(options: TweenOptions) {
    // Set defaults
    this.options = {
      duration: options.duration,
      easing: options.easing ?? Easing.easeInOut,
      delay: options.delay ?? 0,
      onChange: options.onChange,
      onComplete: options.onComplete,
      onUpdate: options.onUpdate,
    };

    // Create easing instance
    this.easingInstance = this.createEasingInstance(this.options.easing);
  }

  /**
   * Create an Easing instance from various input types
   */
  private createEasingInstance(easing: TweenOptions['easing']): Easing {
    if (easing instanceof Easing) {
      return easing;
    }
    return new Easing(easing ?? 'ease-in-out');
  }

  /**
   * Get current animated value
   */
  public getCurrentValue(): number {
    return this.currentValue;
  }

  /**
   * Check if animation is currently running
   */
  public isAnimating(): boolean {
    return this.animationState?.isRunning ?? false;
  }

  /**
   * Set a new target value and animate to it
   * The onChange hook determines if animation should trigger
   * 
   * @param targetValue - The target font weight (or any numeric value)
   * @returns Promise that resolves when animation completes
   */
  public setTarget(targetValue: number): Promise<void> {
    // Check if onChange hook allows animation
    if (this.options.onChange) {
      const shouldAnimate = this.options.onChange(this.currentValue, targetValue);
      if (!shouldAnimate) {
        // Skip animation, set value immediately
        this.currentValue = targetValue;
        return Promise.resolve();
      }
    }

    return this.animateTo(targetValue);
  }

  /**
   * Animate to a target value
   * 
   * @param toValue - Target value to animate to
   * @returns Promise that resolves when animation completes
   */
  public animateTo(toValue: number): Promise<void> {
    // Stop any existing animation
    this.stop();

    const fromValue = this.currentValue;

    return new Promise((resolve) => {
      const startTime = performance.now() + this.options.delay;
      
      this.animationState = {
        fromValue,
        toValue,
        startTime,
        duration: this.options.duration,
        easingFn: this.easingInstance.getFunction(),
        animationId: null,
        isRunning: true,
      };

      const tick = (currentTime: number) => {
        if (!this.animationState) {
          resolve();
          return;
        }

        // Handle delay
        if (currentTime < startTime) {
          this.animationState.animationId = requestAnimationFrame(tick);
          return;
        }

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / this.options.duration, 1);

        // Apply easing
        const easedProgress = this.easingInstance.apply(progress);

        // Interpolate value
        this.currentValue = fromValue + (toValue - fromValue) * easedProgress;

        // Call onUpdate hook
        if (this.options.onUpdate) {
          this.options.onUpdate(this.currentValue, progress);
        }

        // Continue or complete
        if (progress < 1) {
          this.animationState.animationId = requestAnimationFrame(tick);
        } else {
          // Animation complete
          this.currentValue = toValue;
          this.animationState.isRunning = false;
          this.animationState = null;

          // Call onComplete hook
          if (this.options.onComplete) {
            this.options.onComplete(toValue);
          }

          resolve();
        }
      };

      this.animationState.animationId = requestAnimationFrame(tick);
    });
  }

  /**
   * Stop the current animation
   */
  public stop(): void {
    if (this.animationState?.animationId) {
      cancelAnimationFrame(this.animationState.animationId);
    }
    this.animationState = null;
  }

  /**
   * Update easing function
   */
  public setEasing(easing: TweenOptions['easing']): void {
    this.options.easing = easing ?? 'ease-in-out';
    this.easingInstance = this.createEasingInstance(this.options.easing);
  }

  /**
   * Update duration
   */
  public setDuration(duration: number): void {
    this.options.duration = duration;
  }

  /**
   * Chain multiple animations
   * Useful with onComplete hook
   */
  public static chain(...tweeners: Array<{ tweener: VariableTextTweener; target: number }>): Promise<void> {
    return tweeners.reduce((promise, { tweener, target }) => {
      return promise.then(() => tweener.animateTo(target));
    }, Promise.resolve());
  }
}