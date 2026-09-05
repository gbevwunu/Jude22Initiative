# The Jude 22 Initiative, site handbook

Everything needed to run this site locally, fill in the outstanding content,
deploy it, and point a domain at it.

Written for whoever maintains the site next, which may not be a developer.
Where a step needs code, the exact file and the exact line are given.

---

## Contents

1. [Running it locally](#1-running-it-locally)
2. [Filling in the content marked REVIEW](#2-filling-in-the-content-marked-review)
3. [Connecting the forms](#3-connecting-the-forms)
4. [Adding the donation link](#4-adding-the-donation-link)
5. [Replacing images and the logo](#5-replacing-images-and-the-logo)
6. [Environment variables](#6-environment-variables)
7. [Deploying to Vercel](#7-deploying-to-vercel)
8. [Pointing the domain](#8-pointing-the-domain)
9. [Search Console and analytics](#9-search-console-and-analytics)
10. [Things worth knowing before you change anything](#10-things-worth-knowing-before-you-change-anything)

---

## 1. Running it locally

You need Node 20 or newer. Check with `node -v`.

    npm install
    npm run dev

The site is then at http://localhost:3000.

Other commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server, reloads as you edit |
| `npm run build` | Production build. Run this before deploying, it fails on any type error |
| `npm start` | Serves the production build locally |
| `npm run lint` | Checks code style |
| `npm run typecheck` | Checks types without building |

If `npm run build` fails, do not deploy. The error names the file and line.

---

## 2. Filling in the content marked REVIEW

Almost all site text lives in one file: **`lib/constants.ts`**. Edit it in any
text editor. Anything still awaiting confirmation is marked `{REVIEW}` or
carries a `needsReview: true` flag, and the site renders a visible badge for
those so a placeholder can never be mistaken for finished copy.

**To find every outstanding item, search the project for `REVIEW`.**

### Contact details

Near the top of `lib/constants.ts`, in the `ORG` block:

    email: {
      value: "hello@jude22initiative.org",
      needsReview: true,
    },

Replace `value` with the real address, then change `needsReview` to `false`.
Setting it to `false` removes the "Confirm" badge from the contact page **and**
publishes the address in the site's structured data for search engines. Do not
set it to `false` until the value is correct.

Do the same for `phone`, `location`, and `foundedYear`.

### Social profiles

    export const SOCIALS = [
      { label: "Instagram", url: "", needsReview: true },
      ...
    ];

A profile with an empty `url` is hidden everywhere rather than shown as a dead
link. Paste the full address, including `https://`, and set `needsReview` to
`false`. Delete any row the organisation does not use.

### Impact figures

    export const METRICS = [
      { id: "students", label: "Students Reached", value: 1200, suffix: "+", needsReview: true },
      ...
    ];

Every number is currently a placeholder and the page says so. Put in the real
figure, adjust `suffix` (`"+"` or `""`), and set `needsReview: false` to remove
the badge. **Do not publish a figure the organisation cannot evidence.**

### Everything else

`PILLARS`, `PROGRAMS`, `GET_INVOLVED`, and `AUDIENCES` hold the rest of the
copy. Edit the text between the quotation marks. Keep the `id` values as they
are, because links elsewhere point at them.

### Team and leadership bios

The About page ends with a marked placeholder. When bios are ready, each person
needs a name, a role, two or three sentences, and a square photograph. Send
those to a developer along with this note: the block to replace is in
`app/about/page.tsx`, the section labelled "Leadership, pending client
content".

---

## 3. Connecting the forms

There are three form slots: **mentor application**, **volunteer sign up**, and
**contact**. Until each has a URL, the site shows a clearly marked panel
explaining what goes there.

### Step by step

1. Build the form in **Tally** (tally.so) or **JotForm** (jotform.com). Either
   works. Do not use a different provider without reading the warning below.
2. Publish it and copy the **embed URL**. In Tally this looks like
   `https://tally.so/embed/abc123`. In JotForm it looks like
   `https://form.jotform.com/1234567890`.
3. In the form's own settings, set the **redirect after submit** to
   `https://your-domain.org/thank-you`. This is what sends people to the thank
   you page. It is a setting in Tally or JotForm, not something in this code.
4. Open `lib/constants.ts` and find:

       export const FORM_EMBED = {
         mentorUrl: "",
         volunteerUrl: "",
         contactUrl: "",
         needsReview: true,
       };

5. Paste each URL between the matching quotation marks. Set `needsReview` to
   `false` once all three are in.
6. Deploy. The panels are replaced by the live forms.

### Important, read before choosing a provider

For security, this site only permits forms from **Tally** and **JotForm** to
load. Any other provider will be **silently blocked by the browser**: the area
will simply be blank, with no error message on the page.

If the organisation wants a different provider, a developer must add that
provider's address to the `EMBED_ORIGINS` list at the top of **`middleware.ts`**
in the same style as the existing entries. Nothing else needs changing.

This restriction is deliberate. It means a compromised third party cannot load
arbitrary content into the site.

---

## 4. Adding the donation link

There is **no payment integration in this site**, by design. Nothing collects
card or bank details.

Once the organisation confirms how it wants to receive gifts:

**If it is a link** (a donation platform, a giving page, a bank transfer page),
open `lib/constants.ts`, find the `give` entry in `GET_INVOLVED`, and set:

    {
      id: "give",
      ...
      ctaHref: "https://the-donation-page.example",
      needsReview: false,
    }

Then replace the marked placeholder panel in `app/get-involved/page.tsx`, in the
section with `id="give"`, with the real giving details.

**If it is an embedded donation widget**, treat it exactly like a form: it must
be added to `EMBED_ORIGINS` in `middleware.ts` or the browser will block it.

**Before connecting any payment tool**, have someone confirm the organisation's
charity registration and payment handling obligations. That is a legal question,
not a technical one, and it is outside what this site does.

---

## 5. Replacing images and the logo

See **`public/images/README.md`**. It lists every asset, the exact size and
format wanted, and how to swap each one in.

Two things from it are worth repeating here:

- The favicon, the social share image, the logo mark, and all the icons are
  currently **drawn in code**. The site is complete without a single image file.
  Nothing is broken or missing.
- **Photographs of identifiable young people need consent before publication**,
  from a parent or guardian where the student is a minor. If consent for a
  particular person is unclear, do not publish that photograph.

Every photograph also needs alt text, which is a plain description for someone
who cannot see it. `public/images/README.md` has worked examples.

---

## 6. Environment variables

One variable, and the site builds without it.

| Name | Example | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.jude22initiative.org` | The site's public address. Used for canonical links, the sitemap, robots.txt, and social share previews |

No trailing slash.

If it is not set, the site falls back to `https://www.jude22initiative.org`. It
still runs, but search engines and social previews will be pointed at the wrong
place, so **set it before launch**.

The value is forgiving. An empty value, a stray space, a missing `https://`, or
a trailing slash are all handled, and anything unparseable falls back rather
than failing the build. Adding the variable in Vercel and leaving the value
blank is safe.

Note for Vercel: a variable added with an empty value is not the same as no
variable at all. Either give it the real address or remove the row entirely.

Locally, copy `.env.example` to `.env.local` and edit it. `.env.local` is
ignored by git and must never be committed.

There are no secrets in this project. Nothing here is a password or an API key.

---

## 7. Deploying to Vercel

### First deployment

1. Push the code to GitHub.
2. Go to vercel.com, sign in, and choose **Add New, Project**.
3. Import the repository. Vercel detects Next.js on its own, so leave the build
   settings alone.
4. Open **Environment Variables** and add `NEXT_PUBLIC_SITE_URL` with the
   production address. Tick Production, Preview, and Development.
5. Press **Deploy**. First build takes a couple of minutes.

### After that

Every push to the `main` branch deploys to production automatically. Every pull
request gets its own preview address, which is the safe way to review a change
before it goes live.

### If a deployment fails

Open the failed deployment in Vercel and read the build log. The error names a
file and a line. Running `npm run build` locally reproduces the same failure and
is faster to iterate on.

---

## 8. Pointing the domain

In Vercel, open the project, then **Settings, Domains**, and add the domain.
Vercel then tells you which records to create. Add these at the domain
registrar, wherever the domain was bought.

For a domain like `jude22initiative.org`:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

The `A` record points the bare domain at Vercel. The `CNAME` points the `www`
version at it.

**Always confirm the exact values Vercel shows you**, rather than copying the
table above. Vercel occasionally changes these, and its own screen is correct.

Notes:

- DNS changes can take anything from a few minutes to 48 hours to take effect.
- HTTPS is issued automatically once the records resolve. Nothing to buy or
  configure.
- Decide whether the canonical address is `www.` or the bare domain, set
  `NEXT_PUBLIC_SITE_URL` to match, and have Vercel redirect the other one to it.
  Serving both without a redirect splits search ranking between them.

---

## 9. Search Console and analytics

### Google Search Console

Do this once the domain is live. It is free and shows how the site appears in
search.

1. Go to search.google.com/search-console and add a property.
2. Choose **Domain** and verify with the `TXT` record it gives you, added at the
   registrar alongside the records from section 8.
3. Once verified, open **Sitemaps** and submit:

       sitemap.xml

The sitemap is generated automatically and always current. Nothing to maintain.

### Analytics

**The straightforward option: Vercel Analytics.** In the Vercel project, open
the **Analytics** tab and enable it. It needs no code change, no cookie banner,
and no security policy change, because it is served from the site's own domain.
For a site this size it is very likely all the organisation needs.

**If Google Analytics is required instead**, be aware of two things.

First, it will not work by simply pasting the snippet in. The site has a strict
security policy that blocks scripts from addresses it does not know. A developer
must add Google's addresses to the policy in **`middleware.ts`**:

    script-src   add  https://*.googletagmanager.com
    connect-src  add  https://*.google-analytics.com https://*.analytics.google.com
    img-src      already permits https, no change needed

The snippet itself must carry the request nonce, the same way the small script
in `app/layout.tsx` does. Copy that pattern.

Second, Google Analytics sets cookies and processes personal data, so the
organisation will likely need a cookie notice and a privacy policy. Neither
exists on the site today. Vercel Analytics avoids both questions entirely.

---

## 10. Things worth knowing before you change anything

**Text is one file.** `lib/constants.ts` holds almost all copy. Editing it is
safe. If something reads awkwardly on the site, that file is where to fix it.

**Colours and spacing are one file.** `app/globals.css`, at the top. The brand
palette is fixed there. Two extra colours, `gold-ink` and `grey-600`, exist
because the brand gold is not readable as small text on a white background: it
reaches only 2.4 to 1 against a required 4.5 to 1. Gold is still used at full
strength for buttons, rules, and shapes. **Please do not "correct" gold-ink back
to the brand gold for text.** It would fail accessibility rules the site
currently meets.

**Motion respects the reader.** Anyone whose device is set to reduce motion sees
the site fade gently rather than move. This is deliberate and tested.

**The site works without JavaScript.** Content is readable with scripting off.

**Security headers are set in two places on purpose**, `next.config.ts` and
`vercel.json`, so a response is covered even if it bypasses one of them. The
content security policy, which needs a fresh value per visit, is set in
`middleware.ts`. If an embed ever appears blank, that file is the first place to
look.

**Keep dependencies patched.** Every few months run:

    npm audit

If it reports anything, `npm audit fix` usually resolves it. Run `npm run build`
afterwards to confirm nothing broke.

---

## Where the outstanding items live, at a glance

| Item | File | Status |
| --- | --- | --- |
| Email, phone, location | `lib/constants.ts`, `ORG` | Placeholder |
| Social profiles | `lib/constants.ts`, `SOCIALS` | Empty, hidden until filled |
| Impact figures | `lib/constants.ts`, `METRICS` | Placeholder, badged on the page |
| Mentor form | `lib/constants.ts`, `FORM_EMBED.mentorUrl` | Empty, panel shown |
| Volunteer form | `lib/constants.ts`, `FORM_EMBED.volunteerUrl` | Empty, panel shown |
| Contact form | `lib/constants.ts`, `FORM_EMBED.contactUrl` | Empty, panel shown |
| Donation link | `lib/constants.ts`, `GET_INVOLVED` give entry | Placeholder panel |
| Team bios | `app/about/page.tsx` | Placeholder panel |
| Logo files | `public/images/` | Drawn in code, files optional |
| Registered legal name | `lib/constants.ts`, `ORG.legalName` | Placeholder |

---

Site built by [GB Tech](https://gbgrouphq.com).
