import Badge from "./Badge";

type FormEmbedProps = {
  /** Published Tally or JotForm embed URL. Empty renders the setup panel. */
  src: string;
  /** Names the frame for assistive technology. Required. */
  title: string;
  /** Which form this is, used in the setup instructions. */
  slotName: string;
  height?: number;
};

/**
 * Slot for the third-party form.
 *
 * Until the client supplies a published form URL this renders a clearly
 * marked panel rather than an empty box, so an unfinished integration can
 * never be mistaken for a broken page in review.
 *
 * The frame is only permitted to load because middleware.ts lists the Tally
 * and JotForm origins in the Content Security Policy frame-src allowlist. A
 * different provider needs that list updated or the embed will be blocked.
 *
 * Where the form goes after submit is configured in the form provider's own
 * settings, not here. Point it at /thank-you. See SETUP.md.
 */
export default function FormEmbed({
  src,
  title,
  slotName,
  height = 720,
}: FormEmbedProps) {
  if (src.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-gold-edge bg-gold/5 p-7 lg:p-10">
        <Badge variant="review">Form embed slot</Badge>

        <h3 className="mt-5 font-heading text-xl font-semibold text-navy">
          {title}
        </h3>

        <p className="mt-3 max-w-[60ch] text-[0.9375rem] text-[var(--muted-fg)]">
          This is where the {slotName} form will appear. Build the form in
          Tally or JotForm, publish it, then paste the embed URL into
          <code className="mx-1 rounded bg-navy/8 px-1.5 py-0.5 font-mono text-[0.85em] text-navy">
            FORM_EMBED.{slotName}
          </code>
          in
          <code className="mx-1 rounded bg-navy/8 px-1.5 py-0.5 font-mono text-[0.85em] text-navy">
            lib/constants.ts
          </code>
          . Set the form to redirect to /thank-you after submission.
        </p>

        <p className="mt-4 max-w-[60ch] text-sm text-[var(--muted-fg)]">
          Only Tally and JotForm are permitted to load in a frame on this site.
          Using another provider means updating the security policy in
          middleware.ts as well, or the browser will block it. Full steps are
          in SETUP.md.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--hairline)] bg-white">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        height={height}
        className="block w-full"
        style={{ height: `${height}px`, border: "0" }}
      />
    </div>
  );
}
