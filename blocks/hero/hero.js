import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  const heroContent = block.querySelector(':scope > div > div');
  const heroPic = block.querySelector(':scope picture');
  if (heroPic) {
    const img = heroPic.querySelector('img');
    heroPic.remove();
    const optimizedHeroPic = createOptimizedPicture(img.src, img.alt, false, [{ media: '(min-width: 600px)', width: '2000' }, { width: '1200' }]);
    block.append(optimizedHeroPic);
  }
  if (heroContent) {
    if (heroContent.parentElement) {
      heroContent.parentElement.remove();
      // Remove button class from all except first link
      Array.from(heroContent.querySelectorAll('.button'))
        .forEach((button, index) => {
          if (index > 0) {
            button.classList.remove('button');
          }
        });
    }
    heroContent.classList.add('hero-content');
    block.append(heroContent);
  }
  return block;
}
