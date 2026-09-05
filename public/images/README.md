# Images

Everything the site needs is either generated in code or listed below as an
asset the organisation supplies. Nothing here is required for the site to
build and deploy: the pages render correctly today without a single file in
this folder.

Drop replacement files straight into `public/images/`. A file placed here is
served from the site root, so `public/images/og-image.jpg` is reachable at
`/images/og-image.jpg`.

---

## Already handled in code, no file needed

| Asset | Where it comes from | To replace |
| --- | --- | --- |
| Favicon and tab icon | `app/icon.svg`, the brand mark drawn as inline SVG | Edit that file, or replace it with `app/icon.png` at 512x512 |
| Social share image | `app/opengraph-image.tsx`, generated at 1200x630 from the brand tokens | See "Social share image" below |
| Logo mark in the header and footer | `components/ui/Logo.tsx`, inline SVG | See "Logo" below |
| The five pillar icons | `components/ui/PillarIcon.tsx`, inline SVG | Geometric by design, no bitmaps wanted |
| Hero accent shape | `components/ui/GrowthAccent.tsx`, inline SVG | Geometric by design |

Inline SVG is used throughout rather than image files because these marks
have to recolour with the surface they sit on, stay sharp at any size, and
cost no network request.

---

## Assets to supply

### 1. Logo, once finalised

| File | Format | Notes |
| --- | --- | --- |
| `logo-primary.svg` | SVG | The main lockup. Vector, with text converted to outlines |
| `logo-primary.png` | PNG | 1024px wide, transparent background, fallback for contexts that reject SVG |
| `logo-mark.svg` | SVG | The mark on its own, no wordmark, for tight spaces |
| `logo-reversed.svg` | SVG | The version that sits on navy, if the primary does not work there |

The header and footer currently draw the mark in code. Once real files exist,
swap the contents of `components/ui/Logo.tsx` for an `next/image` referencing
the SVG. Keep the `aria-label` on the surrounding link, since the mark itself
is decorative.

### 2. Social share image, if a photographic one is preferred

The generated image works and is on brand. Replace it only if the
organisation wants photography in link previews.

| File | Format | Notes |
| --- | --- | --- |
| `og-image.jpg` | JPG | Exactly 1200x630. Keep text well inside the middle 80 percent, since platforms crop the edges. Under 300KB |

To switch over, delete `app/opengraph-image.tsx` and add to the metadata in
`app/layout.tsx`:

    openGraph: {
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    }

### 3. Event photography for the programs page

Real photographs of sessions would strengthen `/programs` considerably. None
are used yet, so the page is honest rather than stocked with generic imagery.

| File | Format | Suggested subject |
| --- | --- | --- |
| `event-session.jpg` | JPG or WebP | A discovery event mid-session, students visible and engaged |
| `event-students.jpg` | JPG or WebP | Students working through the exercise |
| `mentor-meeting.jpg` | JPG or WebP | A mentor and a student in conversation |

Supply each at 1600px on the long edge, under 400KB.

**Every photograph needs alt text written for it.** Alt text describes what a
person who cannot see the image would need in order to follow the page. It is
not a caption and not a place for keywords.

Good: `Students working in pairs during a discovery session at a secondary
school.`
Poor: `Event photo` or `Jude 22 Initiative youth mentorship purpose event`.

Send the alt text alongside the files and it goes in with them.

**Consent is required before any photograph of an identifiable young person is
published.** Where students are minors this means consent from a parent or
guardian, held on record by the organisation. If consent for a particular
person is unclear, do not publish that image. This is the one item on this
page that is not a design decision.

---

## Technical notes

- Use `next/image` for any photograph added, not a bare `img` tag. It handles
  sizing, lazy loading and modern formats, all of which the performance
  budget depends on.
- Always set `width` and `height`, so the layout does not shift while the
  image loads.
- The security policy permits images from this site and over HTTPS, so
  external image hosts will load. Self-hosting in this folder is still
  preferred, since it is faster and adds no third-party dependency.
- Decorative images take `alt=""` so screen readers skip them. Meaningful
  images always take real alt text.
