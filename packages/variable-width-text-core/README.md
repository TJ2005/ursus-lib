# @ursus/variable-width-text-core

Core TypeScript library for animating variable font weights with smooth easing.

## Features

- Animate font weight (or any numeric value) with smooth easing
- Built-in easing presets using bezier curves
- Promise-based API for chaining animations
- Hooks for onChange, onUpdate, and onComplete
- Works in any framework (React, Vue, Svelte, vanilla JS)
- TypeScript support with full type definitions

## Installation

```bash
npm install @ursus/variable-width-text-core
# or
pnpm add @ursus/variable-width-text-core
# or
yarn add @ursus/variable-width-text-core
```

## Quick Start

```typescript
import { VariableTextTweener, Easing } from '@ursus/variable-width-text-core'

const tweener = new VariableTextTweener({
  duration: 1000,
  easing: Easing.easeInOutCubic,
  onUpdate: (value) => {
    element.style.fontWeight = value.toString()
  }
})

// Animate to font weight 700
await tweener.animateTo(700)
```

## API

### Constructor Options

```typescript
interface TweenOptions {
  duration: number                    // Animation duration in ms
  easing?: Easing | string | function // Easing function
  delay?: number                      // Delay before animation starts
  onChange?: (current, target) => boolean // Control if animation triggers
  onComplete?: (value) => void        // Called when animation ends
  onUpdate?: (value, progress) => void // Called each frame
}
```

### Methods

- `animateTo(value: number): Promise<void>` - Animate to a target value
- `setTarget(value: number): Promise<void>` - Set target with onChange check
- `stop()` - Stop current animation
- `getCurrentValue(): number` - Get current animated value
- `isAnimating(): boolean` - Check if animation is running
- `setEasing(easing)` - Update easing function
- `setDuration(ms)` - Update duration

### Easing Presets

Available presets: `linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `easeInQuad`, `easeOutQuad`, `easeInOutQuad`, `easeInCubic`, `easeOutCubic`, `easeInOutCubic`, `easeInQuart`, `easeOutQuart`, `easeInOutQuart`

```typescript
import { Easing } from '@ursus/variable-width-text-core'

// Use preset
const tweener = new VariableTextTweener({
  duration: 1000,
  easing: Easing.easeInOutCubic
})

// Or use string
easing: 'ease-in-out'

// Or custom function
easing: (t) => t * t

// Or cubic-bezier array
easing: [0.42, 0, 0.58, 1.0]
```

## Examples

### Hover Effect

```typescript
element.addEventListener('mouseenter', () => {
  tweener.animateTo(800)
})

element.addEventListener('mouseleave', () => {
  tweener.animateTo(400)
})
```

### Chaining Animations

```typescript
// Sequential animations
await tweener.animateTo(100)
await tweener.animateTo(900)
await tweener.animateTo(400)

// Using static chain method
await VariableTextTweener.chain(
  { tweener, target: 100 },
  { tweener, target: 900 },
  { tweener, target: 400 }
)
```

### Conditional Animation

```typescript
const tweener = new VariableTextTweener({
  duration: 1000,
  onChange: (current, target) => {
    // Only animate if difference is > 100
    return Math.abs(target - current) > 100
  }
})
```

## License

MIT

## Author

Part of the Ursus text animation library collection.
