# Design System Strategy: The Curated Workspace

## 1. Overview & Creative North Star: "The Digital Vellum"
This design system moves beyond the utility of a standard note-taking app to create a high-end, editorial experience. The Creative North Star is **"The Digital Vellum"**—an interface that feels as tactile and premium as a custom-bound notebook, yet as fluid as a modern digital workspace. 

We break the "template" look by prioritizing **intentional asymmetry** and **breathable compositions**. Instead of a rigid grid of boxes, we use the user's focus as our compass. Content is not "contained"; it is "presented" on a series of layered, soft-teal surfaces that mimic the depth of physical paper and frosted glass. High-contrast typography scales between the utilitarian (Inter) and the editorial (Manrope) ensure that the act of writing feels professional and authoritative.

---

## 2. Color & Atmospheric Depth
Our palette is rooted in professional teals (`primary: #1e6a62`) and calming surfaces (`surface: #f6faf8`). It is designed to reduce eye strain while maintaining a sophisticated, modern edge.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. 
Visual boundaries must be defined solely through:
- **Background Color Shifts:** Placing a `surface-container-low` (#eef5f3) section against a `surface` (#f6faf8) background.
- **Tonal Transitions:** Using the `outline-variant` (#a9b4b1) at 10-15% opacity only if a subtle hint of a boundary is required for accessibility.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of materials. 
*   **Base Layer:** `surface` (#f6faf8) for the main application background.
*   **Content Areas:** `surface-container` (#e7f0ed) for sidebar or navigation regions.
*   **Active Canvas:** `surface-container-lowest` (#ffffff) for the actual note-taking area to provide the highest contrast and focus.
*   **Floating Elements:** Use `surface-bright` with a 60% opacity and a `20px` backdrop-blur to create a "Glassmorphism" effect for floating action buttons or overlays.

### Signature Textures
Main CTAs should never be flat. Use a subtle linear gradient (Top-Down) from `primary` (#1e6a62) to `primary_dim` (#095e56) to provide a "soul" and professional polish that flat hex codes lack.

---

## 3. Typography: The Editorial Engine
We use a dual-font system to balance character with legibility.

*   **Display & Headlines (Manrope):** Used for "Wayfinding" and "Expression." Large scales like `display-lg` (3.5rem) should be used with generous letter-spacing (-0.02em) to create a high-fashion, editorial look for notebook titles or empty states.
*   **Body & Labels (Inter):** Used for "Information" and "Utility." Inter is chosen for its high x-height and exceptional readability in the note-taking experience.
*   **Hierarchy Note:** To convey the brand's premium identity, always use a significant jump in scale between the `headline-sm` (1.5rem) and the `body-md` (0.875rem). This "High-Contrast" approach mimics magazine layouts.

---

## 4. Elevation & Depth: Tonal Layering
Traditional structural lines are replaced by the **Layering Principle**. 

### Ambient Shadows
When an element must float (e.g., a context menu), do not use a standard grey drop shadow. 
*   **Value:** `0px 12px 32px`
*   **Color:** `on-surface` (#2a3433) at **6% opacity**. 
This creates an "Ambient Lift" that feels like a soft shadow cast on a desk rather than a digital effect.

### The Ghost Border Fallback
If a container requires a border for accessibility (e.g., in Dark Mode), use the **Ghost Border**:
*   **Stroke:** 1px
*   **Token:** `outline-variant` (#a9b4b1) at **20% opacity**.
*   **Constraint:** Never use 100% opaque borders.

---

## 5. Components & Primitives

### Buttons
*   **Primary:** Rounded `full` (9999px) or `xl` (1.5rem). Gradient background from `primary` to `primary_dim`. Text is `on-primary` (#e2fff9).
*   **Secondary:** No background. `surface-container-high` (#e1eae7) fill on hover. `label-md` weight.
*   **Tertiary:** Text-only using `primary` color. No background or border.

### Note Cards & Lists
*   **Constraint:** Forbid the use of divider lines between notes. 
*   **Style:** Use `3.5rem` (Spacing 10) of vertical white space or a shift from `surface` to `surface-container-low` to separate items. 
*   **Radius:** Always use `lg` (1rem) or `xl` (1.5rem) to maintain the "approachable" feel requested.

### Input Fields (The Writing Experience)
*   **The "Invisible" Input:** For the main note title, remove all backgrounds and borders. Use `headline-lg` (Manrope) with `on-surface` (#2a3433).
*   **Utility Inputs:** Use `surface-container` (#e7f0ed) with a `Ghost Border`. Labels must be in `label-sm` using the `secondary` (#4b6460) color.

### Floating Action Button (FAB)
*   A "Curator's Tool." Use a Glassmorphism effect: `primary` at 85% opacity with a heavy backdrop-blur (16px) and a `primary_container` (#a9f0e5) icon.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical margins. A wider left margin (e.g., Spacing 16) in the note editor creates a sophisticated editorial vibe.
*   **Do** leverage the `tertiary` (#346578) color for highlighting search terms or categorized tags—it provides a subtle shift from the primary teal without breaking the palette.
*   **Do** prioritize whitespace. If a layout feels crowded, double the spacing token (e.g., move from `6` to `12`).

### Don't
*   **Don't** use black (#000000) for text. Use `on-surface` (#2a3433) to maintain the soft, professional teal-tonal atmosphere.
*   **Don't** use sharp corners. Anything smaller than `DEFAULT` (0.5rem) is prohibited to ensure the app feels "approachable."
*   **Don't** use 1px dividers. If you feel you need a line, use a 4px gap and a slight color change instead.