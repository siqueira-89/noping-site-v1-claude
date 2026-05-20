# Design System Document: High-Tech Network Infrastructure

## 1. Overview & Creative North Star: "The Kinetic Pulse"
The Creative North Star for this design system is **"The Kinetic Pulse."** 

We are moving away from the "static box" nature of traditional dashboards. In high-tech network infrastructure, data isn't stationary; it is a living, breathing flow of energy. This design system treats the interface as a sophisticated dark vacuum where information is illuminated through bioluminescent glows and architectural layering. We avoid the "template" look by utilizing intentional asymmetry, overlapping "glass" modules, and a hierarchy driven by light rather than lines. The result is an editorial-grade technical environment that feels both authoritative and hyper-modern.

---

## 2. Colors: Tonal Depth & Bioluminescence
This palette is designed to minimize eye strain in NOC (Network Operations Center) environments while highlighting critical data flows against a high-contrast, deep-space background.

### Palette Strategy
- **Primary (`#93FF18`):** This vibrant neon-green represents "Active Flow" and "System Health." It is the most distinctive chromatic color for buttons and interactive elements.
- **Secondary (`#1D2028`):** A deep, midnight-charcoal used for supporting UI elements, surfaces, and secondary actions.
- **Tertiary (`#ffffff`):** A crisp white accent used for high-contrast highlights, badges, or decorative elements.
- **Neutral/Surface (`#000000`):** A pure black base that provides a profound "vacuum" feel for backgrounds, ensuring that all UI elements appear to float and glow.

### The "No-Line" Rule
**Standard 1px borders are strictly prohibited for sectioning.** 
Structural boundaries must be defined solely through background shifts. Using subtle roundedness (Level 1) and varied spacing (Level 2), we create a spacious, editorial feel that avoids a "drawn" appearance.

### The "Glass & Gradient" Rule
Floating modules (modals, hover-state details) must utilize **Glassmorphism**. Use semi-transparent versions of surface containers with a `backdrop-blur` of 12px–20px. 
*   **Signature Texture:** Main CTAs or active status cards should use a subtle linear gradient transitioning from the Primary color (`#93FF18`) to its dimmed variant to simulate a glowing light source.

---

## 3. Typography: Technical Precision
We pair the geometric utility of **Inter** with the architectural character of **Space Grotesk**.

- **Display & Headlines (Space Grotesk):** Used for high-level metrics (e.g., "99.9% Uptime"). The slightly "off-beat" terminals of Space Grotesk convey a high-tech, custom-engineered feel.
- **Title & Body (Inter):** Used for all functional data reading. Inter’s tall x-height ensures readability of complex IP addresses and server names at small scales.
- **The Identity Shift:** By using a high contrast between display and label sizes, we create an editorial rhythm that guides the eye to the most critical "Pulse" of the network.

---

## 4. Elevation & Depth: Tonal Layering
In this design system, height is indicated by luminosity and spacing, not just shadows.

- **The Layering Principle:** 
    1.  **Base:** Neutral Background (#000000)
    2.  **Sectioning:** Subtle background shifts using the Secondary tone (#1D2028).
    3.  **Individual Cards:** Elevated surfaces with Level 1 rounded corners.

- **Ambient Shadows:** For floating elements, use an extra-diffused shadow. The shadow must be a darker tint of the neutral background or a soft glow of the primary color.
- **The "Ghost Border" Fallback:** If a component requires a boundary for accessibility (e.g., input fields), use the outline-variant token at 15% opacity.

---

## 5. Components: Engineered Modules

### Status Indicators (Signature Component)
Instead of a flat green dot, status indicators use the `primary` neon green with a multi-layered CSS glow. 
- **Active:** Primary color (#93FF18) with a 4px blur "aura."
- **Alert:** Error states with a pulsing animation.

### Cards & Lists
**Forbid the use of divider lines.** 
- Separate list items using the system spacing (Level 2) to maintain a balanced, readable flow.
- **Interactive States:** On hover, a card should not move "up"; instead, increase its surface-brightness and change the "Ghost Border" opacity from 15% to 40%.

### Data Visualization (The Network Flow)
- **Pathways:** Connections between nodes use secondary tones. 
- **Active Traffic:** Use a "comet" animation—a 2px line using a gradient of `primary` to transparent, traveling along the pathway.

### Input Fields
- **Background:** Subtle container fill using the Secondary color.
- **Active State:** The bottom edge glows with a 1px `primary` line; the rest of the container remains borderless with Level 1 rounded corners.

---

## 6. Do’s and Don’t

### Do:
- **Use Intentional Asymmetry:** Align high-level stats to a different grid rhythm than the granular logs to create visual interest.
- **Embrace "Dark Space":** Let the background breathe. High-tech systems feel more premium when they aren't crowded, utilizing Level 2 spacing against the pure black background.
- **Use Subtlety in Motion:** Status pulses should be slow and rhythmic (2-3 seconds), simulating a "breathing" server room.

### Don't:
- **No 100% Opaque Borders:** Never use a solid, high-contrast line to separate content. It breaks the "Kinetic Pulse" illusion.
- **No Heavy Roundedness:** Keep corners at Level 1 to maintain a technical, engineered aesthetic.
- **Don't Overuse the Neon:** Reserve the Primary neon green (#93FF18) for active data and critical actions only.