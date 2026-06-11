PHASE 1G-B — Integrate Regenerated Dessert / Popsicle / Waffle Asset Pack

You are working inside the existing Next.js Shaytee’s Treat project.

Goal:
Integrate the new regenerated premium dessert assets so the remaining weak-looking core visual items on the site become cleaner, more attractive, and more consistent with the pink premium visual direction.

This is a targeted rollout for the newly regenerated subset only.
Do not redesign the site from scratch.
Do not remove the crop-safe rendering rules from Phase 1F.

Asset pack location after extraction:
public/assets/shaytees/regen-v2/

Subfolders:
- public/assets/shaytees/regen-v2/gelato/
- public/assets/shaytees/regen-v2/popsicles/
- public/assets/shaytees/regen-v2/specials/
- public/assets/shaytees/regen-v2/waffles/

Covered items and exact path mapping:

Gelato:
- Vanilla Dream -> /assets/shaytees/regen-v2/gelato/vanilla_dream.png
- Strawberry Delight -> /assets/shaytees/regen-v2/gelato/strawberry_delight.png
- Banana Caramel -> /assets/shaytees/regen-v2/gelato/banana_caramel.png
- Chocolate Bliss -> /assets/shaytees/regen-v2/gelato/chocolate_bliss.png

Popsicles:
- Fruit Popsicle -> /assets/shaytees/regen-v2/popsicles/fruit_popsicle.png
- Chocolate -> /assets/shaytees/regen-v2/popsicles/chocolate_popsicle.png
- Strawberry -> /assets/shaytees/regen-v2/popsicles/strawberry_popsicle.png

Specials:
- Dubai Strawberry Cup -> /assets/shaytees/regen-v2/specials/dubai_strawberry_cup.png

Waffles:
- Bubble Waffles -> /assets/shaytees/regen-v2/waffles/bubble_waffles.png
- Plain Waffles -> /assets/shaytees/regen-v2/waffles/plain_waffles.png

Tasks:

1. Copy / merge the extracted public/assets/shaytees/regen-v2/ folder into the project.

2. Update src/lib/menu_data.json so only the covered items above point to the new regen-v2 image paths.

3. Do a full audit for those covered items across the project. Check and update any stale references in:
- /menu
- /build-your-treat
- /combos
- vibe_categories
- homepage feature cards / mood cards if they reference these items
- any hardcoded thumbnail arrays or image maps
- admin preview image library notes if needed

4. Preserve current correct pricing exactly:
Gelato:
- Vanilla Dream: 1500 / 3000 / 5000
- Strawberry Delight: 1500 / 3000 / 5000
- Banana Caramel: 1500 / 3000 / 5000
- Chocolate Bliss: 1500 / 3000 / 5000

Popsicles:
- Fruit Popsicle: 1700
- Chocolate: 2000
- Strawberry: 1700

Special:
- Dubai Strawberry Cup Small: 6500
- Dubai Strawberry Cup Big: 8000

Waffles:
- Bubble Waffles: 3000
- Plain Waffles: 3000

5. Preserve crop-safe rendering rules from Phase 1F:
- object-contain
- padded image frame
- pastel background where already used
- no heavy crop / no object-cover on these product cards
- keep responsive behavior intact

6. Full check requirement:
After integrating these items, do a full visual pass on the whole site and list any remaining weak assets still using old imagery.
Likely remaining not-yet-regenerated categories may include:
- toppings
- popcorn
- noodles
- shawarma
- corn dog
- mini pancakes
- tequila shot
Only report them if still visually weak; do not change them in this phase unless required by an obvious broken path.

7. QA:
- Run npm run build
- Check /menu on mobile and desktop
- Check /build-your-treat
- Check /combos
- Confirm no awkward blur, crop, or clipping
- Confirm all new regen-v2 images load correctly

8. Commit and push:
Use a clear commit message like:
Phase 1G-B: Integrate regenerated gelato, popsicle, special, and waffle assets

Final report required:
- files changed
- asset paths integrated
- routes checked
- build result
- latest commit hash
- list of any remaining weak/placeholder items still recommended for future regeneration
- note clearly that this is a partial but broader regenerated asset rollout, not yet every single site image
