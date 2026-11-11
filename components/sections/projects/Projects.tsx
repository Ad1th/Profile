"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  PROJECT_TAGS,
  projects as catalogue,
  type Project,
  type ProjectTag,
} from "@/lib/seo-data";
import styles from "./Projects.module.css";

/**
 * The home projects section.
 *
 * Everything here is in normal document flow: a filter rail, a wrap of lead
 * cards and a ledger of rows. Nothing is absolutely positioned against the
 * viewport, so there is no width or aspect ratio at which pieces can land on
 * top of each other. The previous version scattered rotated papers and a CRT
 * with per-breakpoint offsets and did exactly that.
 *
 * Tags overlap by design. Selecting several narrows the list to projects
 * that carry all of them, and each tag shows how many projects it would
 * leave, so a dead end is visible before it is clicked.
 */

/** Rows shown before "Show all" when no filter is active. */
const COLLAPSED_ROWS = 6;

const PAPER: Record<NonNullable<Project["paperColor"]>, string> = {
  orange: styles.paperVermilion,
  blue: styles.paperBlue,
  yellow: styles.paperVolt,
  green: styles.paperMoss,
  purple: styles.paperInk,
  pink: styles.paperDeep,
  white: styles.paperBright,
};

function hasAll(project: Project, selected: ProjectTag[]) {
  return selected.every((tag) => project.tags.includes(tag));
}

function Arrow() {
  return (
    <svg
      className={styles.arrow}
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <path
        d="M4 12 12 4M5.5 4H12v6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}

function TagList({
  project,
  selected,
  onToggle,
}: {
  project: Project;
  selected: ProjectTag[];
  onToggle: (tag: ProjectTag) => void;
}) {
  return (
    <ul className={styles.tags}>
      {project.tags.map((tag) => {
        const active = selected.includes(tag);
        return (
          <li key={tag}>
            <button
              type="button"
              className={styles.tag}
              aria-pressed={active}
              aria-label={
                active
                  ? `Remove the ${tag} filter`
                  : `Filter projects by ${tag}`
              }
              onClick={() => onToggle(tag)}
            >
              {tag}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<ProjectTag[]>([]);
  const [expanded, setExpanded] = useState(false);

  const toggle = (tag: ProjectTag) =>
    setSelected((current) =>
      current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag],
    );

  const matches = useMemo(
    () => catalogue.filter((p) => hasAll(p, selected)),
    [selected],
  );

  /** For each tag: how many projects remain if it joins the selection. */
  const counts = useMemo(() => {
    const out = {} as Record<ProjectTag, number>;
    PROJECT_TAGS.forEach((tag) => {
      const next = selected.includes(tag) ? selected : [...selected, tag];
      out[tag] = catalogue.filter((p) => hasAll(p, next)).length;
    });
    return out;
  }, [selected]);

  const filtering = selected.length > 0;
  const leads = matches.filter((p) => p.featured);
  const rest = matches.filter((p) => !p.featured);
  const rows =
    filtering || expanded ? rest : rest.slice(0, COLLAPSED_ROWS);
  const hiddenRows = rest.length - rows.length;

  return (
    <section
      data-section="projects"
      className={styles.section}
      aria-labelledby="projects-title"
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <h2 id="projects-title" className={styles.title}>
            Projects
            <span className={styles.titleCount} aria-hidden="true">
              {catalogue.length}
            </span>
          </h2>
          <p className={styles.lede}>
            {catalogue.length} builds, from a C11 symbol table to a wave energy
            harvester. Most are more than one thing, so pick any mix of tags.
          </p>
        </header>

        <div className={styles.body}>
          <div
            className={styles.rail}
            role="group"
            aria-label="Filter projects by tag"
          >
            <ul className={styles.filters}>
              {PROJECT_TAGS.map((tag) => {
                const active = selected.includes(tag);
                const empty = !active && counts[tag] === 0;
                return (
                  <li key={tag}>
                    <button
                      type="button"
                      className={styles.filter}
                      aria-pressed={active}
                      disabled={empty}
                      onClick={() => toggle(tag)}
                    >
                      <span>{tag}</span>
                      <span className={styles.filterCount}>{counts[tag]}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className={styles.status} aria-live="polite">
              <span>
                {filtering
                  ? `${matches.length} of ${catalogue.length} match`
                  : `All ${catalogue.length} shown`}
              </span>
              {filtering ? (
                <button
                  type="button"
                  className={styles.reset}
                  onClick={() => setSelected([])}
                >
                  Clear filters
                </button>
              ) : null}
            </p>
          </div>

          <div className={styles.results} key={selected.join("|")}>
            {leads.length > 0 ? (
              <ul className={styles.leads}>
                {leads.map((p) => {
                  const metric = p.evidence?.metrics?.[0];
                  return (
                    <li
                      key={p.slug}
                      className={`${styles.lead} ${PAPER[p.paperColor ?? "white"]}`}
                    >
                      <p className={styles.leadYear}>{p.year}</p>
                      <h3 className={styles.leadTitle}>
                        <Link
                          href={`/projects/${p.slug}`}
                          className={styles.stretch}
                        >
                          {p.title}
                        </Link>
                      </h3>
                      <p className={styles.leadDesc}>{p.description}</p>
                      {metric ? (
                        <p className={styles.metric}>
                          <b>{metric.value}</b>
                          <span>{metric.label}</span>
                        </p>
                      ) : null}
                      <div className={styles.leadFoot}>
                        <TagList
                          project={p}
                          selected={selected}
                          onToggle={toggle}
                        />
                        <Arrow />
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {rows.length > 0 ? (
              <ul className={styles.rows}>
                {rows.map((p) => {
                  const metric = p.evidence?.metrics?.[0];
                  return (
                    <li key={p.slug} className={styles.row}>
                      <p className={styles.rowYear}>{p.year}</p>
                      <h3 className={styles.rowTitle}>
                        <Link
                          href={`/projects/${p.slug}`}
                          className={styles.stretch}
                        >
                          {p.title}
                        </Link>
                      </h3>
                      <div className={styles.rowBody}>
                        <p>
                          {p.description}
                          {metric ? (
                            <span className={styles.rowMetric}>
                              {metric.label}: {metric.value}
                            </span>
                          ) : null}
                        </p>
                        <TagList
                          project={p}
                          selected={selected}
                          onToggle={toggle}
                        />
                      </div>
                      <Arrow />
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {matches.length === 0 ? (
              <div className={styles.empty}>
                <p className={styles.emptyTitle}>
                  Nothing carries all of those.
                </p>
                <p>
                  No project is tagged {selected.join(" and ")} at once. Drop
                  one tag to widen the list.
                </p>
                <button
                  type="button"
                  className={styles.more}
                  onClick={() => setSelected([])}
                >
                  Clear filters
                </button>
              </div>
            ) : null}

            <div className={styles.foot}>
              {hiddenRows > 0 ? (
                <button
                  type="button"
                  className={styles.more}
                  onClick={() => setExpanded(true)}
                >
                  Show {hiddenRows} more
                </button>
              ) : null}
              <Link href="/projects" className={styles.archive}>
                Search the full archive
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
