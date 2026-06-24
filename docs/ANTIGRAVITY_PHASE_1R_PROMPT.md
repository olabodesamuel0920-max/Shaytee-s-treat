# Phase 1R — Final Ice Cream Visual Replacement Pack

Client correction:
- Vanilla should be lighter / creamy / pale vanilla.
- Banana Caramel should look like banana flavour through colour only: a clean yellowish soft-serve cup, **no banana slices**, **no visible banana pieces**, and not heavy caramel/filling-looking.

This ZIP contains corrected assets already named to match the existing production paths.

## Files to replace
Copy/merge this ZIP into the project root and overwrite the existing files:

```text
public/assets/shaytees/regen-v2/gelato/vanilla_dream.png
public/assets/shaytees/regen-v2/gelato/vanilla_dream.webp
public/assets/shaytees/regen-v2/gelato/vanilla_dream_thumb.webp
public/assets/shaytees/regen-v2/gelato/banana_caramel.png
public/assets/shaytees/regen-v2/gelato/banana_caramel.webp
public/assets/shaytees/regen-v2/gelato/banana_caramel_thumb.webp
```

## Visual requirements
Vanilla Dream:
- very light creamy vanilla tone
- soft-serve swirl in the pink-striped cup
- clean premium pink background
- keep the waffle piece if present

Banana Caramel:
- yellowish banana-flavour vibe
- soft-serve swirl in the pink-striped cup
- **no banana slices/pieces added to the cream**
- no heavy brown caramel filling look
- clean premium pink background

## Implementation notes
1. Do not change image paths in code if they already point to:
   - `/assets/shaytees/regen-v2/gelato/vanilla_dream.webp`
   - `/assets/shaytees/regen-v2/gelato/banana_caramel.webp`
2. Do not change menu prices.
3. Do not change WhatsApp number.
4. Do not change popcorn/shawarma updates.
5. Do not restore Tequila Shot.
6. Do not bring Small Cone back into the builder.

## QA
Check these pages:
- `/menu`
- `/build-your-treat`
- `/combos`

Confirm:
- Vanilla Dream looks lighter and creamy.
- Banana Caramel looks yellowish, banana-flavour, and has no banana pieces.
- Images are not cropped awkwardly.
- Build Your Treat still works.
- WhatsApp draft still works.

Run:
```bash
npm run build
```

Commit message suggestion:
```text
Phase 1R: replace final vanilla and banana ice cream visuals
```

Final report required:
- files replaced
- vanilla image verified
- banana image verified
- pages checked
- build result
- latest commit hash
- Vercel production verification
