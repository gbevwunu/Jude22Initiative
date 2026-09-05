import type { Pillar } from "@/lib/constants";
import PillarIcon from "./PillarIcon";

type PillarCardProps = {
  pillar: Pillar;
};

/**
 * Deliberately not interactive and deliberately not hovered. The card is a
 * statement, not a control, so giving it a hover state would suggest a click
 * target that is not there.
 */
export default function PillarCard({ pillar }: PillarCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[var(--hairline)] bg-white p-6 lg:p-7">
      <span className="text-navy">
        <PillarIcon name={pillar.id} />
      </span>
      <h3 className="mt-5 font-heading text-xl font-semibold text-navy">{pillar.title}</h3>
      <p className="mt-2.5 text-body-sm text-[var(--muted-fg)]">{pillar.blurb}</p>
    </article>
  );
}
