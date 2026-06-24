# Phase 1S — Add Boba Ice Cream with Client Image

Client has provided the actual Boba Ice Cream image and requested the item be added:

- Item: Boba Ice Cream
- Price: ₦8,000
- New WhatsApp number mentioned: 08069621919
- Important: Do **not** change the WhatsApp order number yet until client confirms WhatsApp is active on that SIM.

## Files in this ZIP

Copy the included asset folder into the project root. It contains:

```txt
public/assets/shaytees/regen-v4/specials/boba_ice_cream.png
public/assets/shaytees/regen-v4/specials/boba_ice_cream.webp
public/assets/shaytees/regen-v4/specials/boba_ice_cream_thumb.webp
```

A reference image from the client is also included at:

```txt
docs/client_boba_reference.jpg
```

## Implementation tasks

1. Add Boba Ice Cream to the menu data.

Suggested data:

```json
{
  "id": "boba_ice_cream",
  "name": "Boba Ice Cream",
  "category": "special-menu",
  "description": "Premium boba-style ice cream treat with creamy swirls, chocolate drizzle, caramel notes, and boba pearls.",
  "price": 8000,
  "image": "/assets/shaytees/regen-v4/specials/boba_ice_cream.webp",
  "thumbnail": "/assets/shaytees/regen-v4/specials/boba_ice_cream_thumb.webp"
}
```

Match the exact schema already used by `src/lib/menu_data.json`.

2. Place it in the best existing public category, preferably:

- Special Menu / Specials / Ice Cream Specials

Use the existing category ID format in the codebase.

3. Make Boba Ice Cream visible on:

- `/menu`

Only add to `/build-your-treat` if the current structure cleanly supports standalone specials. Do not force it into the builder if it does not fit.

Do not add it to combos unless specifically requested.

4. Ensure the normal Quick Order button works for Boba Ice Cream.

5. Update `/admin-preview` checklist:

- Add/mark: Boba Ice Cream item added — confirmed
- Keep: WhatsApp number / SIM confirmation pending
- Note: New number `08069621919` is pending WhatsApp activation

6. Do not change:

- Current WhatsApp order number yet
- Tequila Shot hidden state
- Popcorn prices
- Shawarma variants/prices
- Small Cone builder rule
- Opening hours
- Delivery fee policy
- TikTok link
- Ice cream visuals
- Premium visual style

7. QA

Test:

- `/menu`
- `/build-your-treat`
- `/admin-preview`

Confirm:

- Boba Ice Cream appears with ₦8,000
- Image loads correctly and is not cropped awkwardly
- Quick Order works
- Tequila Shot remains hidden
- WhatsApp order number remains unchanged
- Build passes

Run:

```bash
npm run build
```

Commit and push to `origin/main`.

Suggested commit message:

```txt
Phase 1S: add boba ice cream menu item
```

Final report required:

- files changed
- Boba Ice Cream added
- image path used
- WhatsApp number unchanged
- admin checklist updated
- build result
- latest commit hash
- Vercel production verification
