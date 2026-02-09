# Ursus Text Library

A monorepo of text animation and manipulation libraries built with TypeScript.

## Packages

### [@studioursus/variable-width-text-core](./packages/variable-width-text-core)

Core TypeScript library for animating variable font weights with smooth easing.

[View Documentation](./packages/variable-width-text-core/README.md)

**Features:**
- Animate font weight with smooth easing
- Built-in easing presets using bezier curves
- Promise-based API for chaining animations
- Framework-agnostic (works with React, Vue, Svelte, vanilla JS)

```bash
npm install @studioursus/variable-width-text-core
```

## Planned Packages

- `@studioursus/text-randomizer` - Text randomization and scrambling effects
- `@studioursus/text-animator` - Advanced text animation utilities
- More text manipulation libraries coming soon

## Development

This is a pnpm workspace monorepo. To get started:

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm -r build

# Run tests
pnpm -r test
```

## License

MIT
