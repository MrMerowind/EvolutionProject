### General
- Read the documentation of used libraries thoroughly to not reinvent the wheel
- Don't 
```typescript
import * as PIXI from "pixi.js";
``` 

instead import what you need 
```typescript
import {Rectangle, Texture} from "pixi.js"
```
- Project structure - it's generally a good idea to have `components` directory for components, `utils` for utilities, `helpers` for helpers, `hooks` for hooks etc. You can google `react project structure` for some inspiration. For example in your `GameManagerStoreContext.tsx` you have both hook, component and definition of store context.
- Configure automatic linting in your IDE, that's the summary from `yarn lint` :
```
✖ 38 problems (3 errors, 35 warnings)
  3 errors and 0 warnings potentially fixable with the `--fix` option.
```
- Extract magic numbers to one place e.g. in `Enemy.ts` there's  `if(distance > 4000)`. You can add linting rule for magic numbers `no-magic-numbers`
- Clean up unused assets and scripts from repository
- Whitespace - add some linting rules to not have random 3 empty lines etc
- `{something}Renderer` naming convention - these are not really renderers, just components. 
- In most conventions you should capitalize component file names, but not helpers etc like `enemy.ts` but `Enemy.tsx`
- You can simplify some of your nested if's logic using `early return pattern` - look it up
- You can simplify some multiple-cases logic by using object literals so instead of:
```typescript 
if (e.code === "KeyW") { setButtonUpPressed(false); }
if (e.code === "KeyA") { setButtonLeftPressed(false); }
if (e.code === "KeyD") { setButtonRightPressed(false); }
if (e.code === "KeyS") { setButtonDownPressed(false); }
```
you can write 
```typescript 
const mappings = {
    KeyW: setButtonUpPressed,
    KeyA: setButtonLeftPressed,
    KeyD: setButtonRightPressed,
    Keys: setButtonDownPressed,
}
mappings(e.code)(false)
```
note that this is an example, I think that the whole input-handling part should be rewritten with keeping in mind what I said during our talk

### PIXI
- Are you sure the whole logic with slicing, repeating, removing non visible regions etc that's in `MapRenderer.tsx` couldn't be replaced by just using https://pixijs.io/pixi-react/components/TilingSprite/ ?
- The same as above but about animated sprites logic in `AnimationData.tsx`, why not just use https://pixijs.io/pixi-react/components/AnimatedSprite/ ?
- Don't manually compute `milliseconds` or `delta` just use existing hook https://pixijs.io/pixi-react/hooks/#usetick unless you are doing some advanced optimization frame skipping logic or something like that

Dodaj cienie usun z nazwy component i zmien nie komponenty na mala litere.