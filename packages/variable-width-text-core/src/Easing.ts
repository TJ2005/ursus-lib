import bezierEasing from 'bezier-easing';

export type EasingFunction = (t: number) => number;

/**
 * Easing class for animation curves
 * Wraps bezier-easing library with predefined easings
 */
export class Easing {
  private easingFn: EasingFunction;

  constructor(easing: EasingFunction | string | [number, number, number, number]) {
    if (typeof easing === 'function') {
      this.easingFn = easing;
    } else if (Array.isArray(easing)) {
      // Custom cubic-bezier curve
      this.easingFn = bezierEasing(easing[0], easing[1], easing[2], easing[3]);
    } else {
      this.easingFn = Easing.getPreset(easing);
    }
  }

  /**
   * Apply the easing function to a progress value (0-1)
   */
  public apply(t: number): number {
    return this.easingFn(Math.max(0, Math.min(1, t)));
  }

  /**
   * Get the raw easing function
   */
  public getFunction(): EasingFunction {
    return this.easingFn;
  }

  /**
   * Predefined easing presets
   */
  private static getPreset(name: string): EasingFunction {
    switch (name.toLowerCase()) {
      case 'linear':
        return (t) => t;
      case 'ease':
        return bezierEasing(0.25, 0.1, 0.25, 1.0);
      case 'ease-in':
        return bezierEasing(0.42, 0, 1.0, 1.0);
      case 'ease-out':
        return bezierEasing(0, 0, 0.58, 1.0);
      case 'ease-in-out':
        return bezierEasing(0.42, 0, 0.58, 1.0);
      case 'ease-in-quad':
        return bezierEasing(0.55, 0.085, 0.68, 0.53);
      case 'ease-out-quad':
        return bezierEasing(0.25, 0.46, 0.45, 0.94);
      case 'ease-in-out-quad':
        return bezierEasing(0.455, 0.03, 0.515, 0.955);
      case 'ease-in-cubic':
        return bezierEasing(0.55, 0.055, 0.675, 0.19);
      case 'ease-out-cubic':
        return bezierEasing(0.215, 0.61, 0.355, 1);
      case 'ease-in-out-cubic':
        return bezierEasing(0.645, 0.045, 0.355, 1);
      case 'ease-in-quart':
        return bezierEasing(0.895, 0.03, 0.685, 0.22);
      case 'ease-out-quart':
        return bezierEasing(0.165, 0.84, 0.44, 1);
      case 'ease-in-out-quart':
        return bezierEasing(0.77, 0, 0.175, 1);
      default:
        console.warn(`Unknown easing preset: ${name}, falling back to ease-in-out`);
        return bezierEasing(0.42, 0, 0.58, 1.0);
    }
  }

  /**
   * Static helper to create common easings
   */
  static linear = new Easing('linear');
  static ease = new Easing('ease');
  static easeIn = new Easing('ease-in');
  static easeOut = new Easing('ease-out');
  static easeInOut = new Easing('ease-in-out');
  static easeInQuad = new Easing('ease-in-quad');
  static easeOutQuad = new Easing('ease-out-quad');
  static easeInOutQuad = new Easing('ease-in-out-quad');
  static easeInCubic = new Easing('ease-in-cubic');
  static easeOutCubic = new Easing('ease-out-cubic');
  static easeInOutCubic = new Easing('ease-in-out-cubic');
  static easeInQuart = new Easing('ease-in-quart');
  static easeOutQuart = new Easing('ease-out-quart');
  static easeInOutQuart = new Easing('ease-in-out-quart');
}
