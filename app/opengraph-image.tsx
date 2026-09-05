import { ImageResponse } from "next/og";
import { ORG } from "@/lib/constants";

export const alt = `${ORG.name}: ${ORG.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share image, generated rather than shipped as an asset.
 *
 * This means the site never renders a broken preview while waiting on
 * artwork, and the image cannot drift out of sync with the brand tokens.
 * If the organisation later supplies photography, drop the file in
 * public/images/og-image.jpg and point the metadata at it instead. See
 * public/images/README.md.
 *
 * Rendered by Satori, which supports a subset of CSS: flexbox only, no grid,
 * and every element with more than one child needs an explicit display.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B1F3A",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <svg width="56" height="56" viewBox="0 0 40 40">
            <rect x="4" y="26" width="6" height="10" rx="1.5" fill="#FFFFFF" opacity="0.55" />
            <rect x="14" y="22" width="6" height="14" rx="1.5" fill="#FFFFFF" opacity="0.78" />
            <rect x="24" y="18" width="6" height="18" rx="1.5" fill="#FFFFFF" />
            <path d="M7 19 L27 9" stroke="#C9A227" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="7" cy="19" r="2.75" fill="#C9A227" />
            <circle cx="27" cy="9" r="2.75" fill="#C9A227" />
          </svg>
          <div style={{ color: "#FFFFFF", fontSize: 34, fontWeight: 600 }}>{ORG.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
            }}
          >
            {ORG.tagline}
          </div>
          <div style={{ display: "flex", width: "112px", height: "6px", backgroundColor: "#C9A227", marginTop: "36px" }} />
          <div style={{ color: "#C3CDDB", fontSize: 30, marginTop: "32px", maxWidth: "880px" }}>
            Discovery events in schools and universities, and mentorship that connects
            students with proven mentors.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
