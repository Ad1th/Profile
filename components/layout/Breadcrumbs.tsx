import Link from "next/link";

type Crumb = { name: string; href?: string };

/**
 * The detail pages' "back" link, extended into the full trail. Same face and
 * color as the link it replaces; the last crumb is the current page and is
 * not a link. The matching BreadcrumbList lives in the page's JSON-LD.
 */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#A14A32]">
        {trail.map((crumb, i) => (
          <li key={`${crumb.name}-${i}`} className="flex items-center gap-2">
            {i > 0 ? (
              <span aria-hidden="true" className="text-[#111]/30">
                /
              </span>
            ) : null}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-[#E8420A]">
                {i === 0 ? <>&larr; </> : null}
                {crumb.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-[#111]/55">
                {crumb.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
