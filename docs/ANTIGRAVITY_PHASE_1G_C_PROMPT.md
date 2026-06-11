PHASE 1G-C — Integrate Remaining Regenerated Asset Pack + Final Site Fix Audit

You are working inside the existing Next.js Shaytee’s Treat project.

Goal:
Integrate the supplied regenerated premium product assets for the remaining weak-looking items only:
- Toppings
- Noodles
- Corn Dog
- Shawarma
- Popcorn
- Mini Pancakes
- Tequila Shot

Do not redesign the site from scratch.
Do not overwrite earlier regen-v1 or regen-v2 assets.
Do not remove the Phase 1F crop-safe rendering rules.

Asset pack location after extraction:
public/assets/shaytees/regen-v3/

Reference manifest:
docs/phase1g_c_manifest.json

Exact mapping:

Toppings:
- Oreo Crumbles -> /assets/shaytees/regen-v3/toppings/oreo_crumbles.png
- Sprinkles -> /assets/shaytees/regen-v3/toppings/sprinkles.png
- Chocolate Chips -> /assets/shaytees/regen-v3/toppings/chocolate_chips.png
- Gummy Bears -> /assets/shaytees/regen-v3/toppings/gummy_bears.png
- Peanut -> /assets/shaytees/regen-v3/toppings/peanut.png
- M&Ms -> /assets/shaytees/regen-v3/toppings/m_and_ms.png
- Wafers -> /assets/shaytees/regen-v3/toppings/wafers.png

Snacks:
- Noodles & Egg -> /assets/shaytees/regen-v3/snacks/noodles_egg.png
- Noodles & Chicken -> /assets/shaytees/regen-v3/snacks/noodles_chicken.png
- Corn Dog -> /assets/shaytees/regen-v3/snacks/corn_dog.png
- Chicken Shawarma -> /assets/shaytees/regen-v3/snacks/chicken_shawarma.png
- Caramel Popcorn -> /assets/shaytees/regen-v3/snacks/caramel_popcorn.png
- Milky Popcorn -> /assets/shaytees/regen-v3/snacks/milky_popcorn.png
- Beef Shawarma -> /assets/shaytees/regen-v3/snacks/beef_shawarma.png

Mini Pancakes:
- Box of 6 -> /assets/shaytees/regen-v3/mini-pancakes/mini_pancakes_box_6.png
- Box of 12 -> /assets/shaytees/regen-v3/mini-pancakes/mini_pancakes_box_12.png

Shots:
- Tequila Shot -> /assets/shaytees/regen-v3/shots/tequila_shot.png

Implementation tasks:

1. Extract this ZIP into the project root.

2. Verify current legacy filenames before editing:
   git grep -n "individual_assets/toppings" src public
   git grep -n "individual_assets/snacks" src public
   git grep -n "mini-pancakes" src public
   git grep -n "tequila" src public

3. Update src/lib/menu_data.json:
   Replace legacy image paths with the new regen-v3 paths for all 17 covered items.

4. Audit and update hardcoded references in:
   - src/app/build-your-treat/page.tsx
   - src/app/combos/page.tsx
   - src/app/page.tsx
   - src/app/admin-preview/page.tsx
   - any vibe category arrays
   - any helper/image map files found by grep

5. Preserve rendering rules everywhere these items appear:
   - object-contain
   - object-center
   - aspect-[4/3]
   - padded image frame: p-3 or p-4
   - soft pastel background: bg-pink-50/20 or bg-pink-50/30
   Do not revert to object-cover for product cards, builder option cards, or combo cards.

6. Pricing must not change:
   - Toppings remain ₦500 except M&Ms remains ₦1,000.
   - Noodles & Egg remains ₦3,500.
   - Noodles & Chicken remains ₦6,000.
   - Corn Dog remains Without Sausage ₦1,000 / With Sausage ₦1,500.
   - Chicken Shawarma remains Single Sausage ₦3,500 / Double Sausage ₦4,000.
   - Beef Shawarma remains Single Sausage ₦3,500 / Double Sausage ₦4,000.
   - Milky Popcorn remains ₦1,500 / ₦2,500.
   - Caramel Popcorn remains ₦1,500 / ₦2,500.
   - Box of 6 remains ₦2,000.
   - Box of 12 remains ₦4,500.
   - Tequila Shot remains ₦2,000 each.

7. Important site-fix audit:
   Inspect the full site and fix anything still missing or visually wrong:
   - /menu product cards
   - /build-your-treat option thumbnails and live preview
   - /combos cover images and circular thumbnails
   - homepage vibe cards or visual sections
   - /admin-preview image library checklist

8. Builder render fix:
   If /build-your-treat still shows only “Loading Customizer...” to crawlers or before hydration, refactor carefully:
   - Keep the customizer as a Client Component if needed.
   - Prefer a Server Component page that receives searchParams and passes initial values to the Client Component.
   - Avoid page-wide dependency on useSearchParams for first paint.
   - Preserve all current builder logic and WhatsApp draft behavior.

9. Image optimization:
   - Use Next/Image where already used.
   - Add sensible sizes props for responsive images, especially fill/responsive layouts.
   - Keep quality high but avoid unnecessary layout shift.
   - Confirm no horizontal overflow.

10. Stale-path audit:
   git grep -n "/images/" src public
   git grep -n "/assets/shaytees/" src
   Confirm all 17 covered items point to regen-v3.

11. QA:
   - npm run build
   - /menu at mobile 375px and 414px
   - /menu desktop 1440px
   - /build-your-treat mobile
   - /combos mobile and desktop
   - /admin-preview desktop
   - Verify WhatsApp draft still works.
   - Verify popcorn variants are visually different.
   - Verify beef/chicken shawarma are visually different.
   - Verify mini pancake boxes show full tray/box.
   - Verify Tequila Shot full glass/lime is visible.

12. Commit and push:
   Suggested commit:
   Phase 1G-C: integrate regenerated remaining asset pack

Final report required:
- Files changed
- Exact asset paths replaced
- Old paths removed
- Builder rendering fix status
- Build result
- Screenshot/visual QA summary
- Latest commit hash
- Vercel production verification result
- Any remaining owner-photo recommendations
