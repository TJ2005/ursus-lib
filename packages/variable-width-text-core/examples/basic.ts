import { VariableTextTweener, Easing } from '../src/index';

// Get DOM elements
const textElement = document.getElementById('text') as HTMLElement;
const weightDisplay = document.getElementById('weight') as HTMLElement;
const progressDisplay = document.getElementById('progress') as HTMLElement;
const statusDisplay = document.getElementById('status') as HTMLElement;

// Create tweener instance
const tweener = new VariableTextTweener({
  duration: 1000,
  easing: Easing.easeInOutCubic,
  onUpdate: (value, progress) => {
    // Update font weight
    textElement.style.fontWeight = value.toString();
    
    // Update displays
    weightDisplay.textContent = Math.round(value).toString();
    progressDisplay.textContent = `${Math.round(progress * 100)}%`;
  },
  onComplete: (finalValue) => {
    console.log('Animation complete! Final weight:', finalValue);
    statusDisplay.textContent = 'Idle';
  }
});

// Set initial weight
textElement.style.fontWeight = '100';

// Hover effect - tween to 800 on hover, back to initial on leave
let initialWeight = 100;

textElement.addEventListener('mouseenter', () => {
  initialWeight = tweener.getCurrentValue(); // Remember current weight
  statusDisplay.textContent = 'Hovering...';
  tweener.animateTo(800);
});

textElement.addEventListener('mouseleave', () => {
  statusDisplay.textContent = 'Hover ended';
  tweener.animateTo(initialWeight);
});

// Button handlers
document.getElementById('thin')?.addEventListener('click', () => {
  initialWeight = 100; // Update the target weight for hover
  statusDisplay.textContent = 'Animating...';
  tweener.animateTo(100);
});

document.getElementById('light')?.addEventListener('click', () => {
  initialWeight = 300;
  statusDisplay.textContent = 'Animating...';
  tweener.animateTo(300);
});

document.getElementById('regular')?.addEventListener('click', () => {
  initialWeight = 400;
  statusDisplay.textContent = 'Animating...';
  tweener.animateTo(400);
});

document.getElementById('bold')?.addEventListener('click', () => {
  initialWeight = 700;
  statusDisplay.textContent = 'Animating...';
  tweener.animateTo(700);
});

document.getElementById('black')?.addEventListener('click', () => {
  initialWeight = 900;
  statusDisplay.textContent = 'Animating...';
  tweener.animateTo(900);
});

// Animate loop through weights
document.getElementById('animate')?.addEventListener('click', async () => {
  statusDisplay.textContent = 'Animating Loop...';
  
  await tweener.animateTo(100);
  await tweener.animateTo(900);
  await tweener.animateTo(300);
  await tweener.animateTo(700);
  await tweener.animateTo(400);
  
  statusDisplay.textContent = 'Loop Complete';
});

// Example of using the static chain method
async function chainExample() {
  await VariableTextTweener.chain(
    { tweener, target: 100 },
    { tweener, target: 900 },
    { tweener, target: 400 }
  );
  console.log('Chain complete!');
}

// Expose for console testing
(window as any).tweener = tweener;
(window as any).chainExample = chainExample;

console.log('Tweener ready! Try clicking buttons or run chainExample() in console');
