import { Link } from "react-router-dom";
import { Fragment } from "react";

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground"
    >
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={`${c.label}-${i}`}>
              <li>
                {c.to && !last ? (
                  <Link to={c.to!} className="link-underline">
                    {c.label}
                  </Link>
                ) : (
                  <span className={last ? "text-ink" : ""}>{c.label}</span>
                )}
              </li>
              {!last && (
                <li aria-hidden className="text-border">
                  /
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
