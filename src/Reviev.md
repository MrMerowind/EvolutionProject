- You can simplify some of your nested if's logic using `early return pattern` - look it up
note that this is an example, I think that the whole input-handling part should be rewritten with keeping in mind what I said during our talk

### PIXI
- Are you sure the whole logic with slicing, repeating, removing non visible regions etc that's in `MapRenderer.tsx` couldn't be replaced by just using https://pixijs.io/pixi-react/components/TilingSprite/ ?
- The same as above but about animated sprites logic in `AnimationData.tsx`, why not just use https://pixijs.io/pixi-react/components/AnimatedSprite/ ?


Custom hooks