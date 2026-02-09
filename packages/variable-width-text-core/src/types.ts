import type { Easing, EasingFunction } from './Easing';

/**
 * Configuration options for VariableTextTweener
 */
export interface TweenOptions {
  /** Duration of animation in milliseconds */
  duration: number;
  
  /** Easing function - can be Easing instance, string name, function, or cubic-bezier array */
  easing?: Easing | EasingFunction | string | [number, number, number, number];
  
  /** Optional delay before animation starts (ms) */
  delay?: number;
  
  /** Hook called on value change - return true to trigger animation */
  onChange?: (currentValue: number, targetValue: number) => boolean;
  
  /** Hook called when animation completes - useful for chaining */
  onComplete?: (finalValue: number) => void;
  
  /** Hook called on each animation frame with current value */
  onUpdate?: (currentValue: number, progress: number) => void;
}

/**
 * Internal animation state
 */
export interface AnimationState {
  fromValue: number;
  toValue: number;
  startTime: number;
  duration: number;
  easingFn: EasingFunction;
  animationId: number | null;
  isRunning: boolean;
}
