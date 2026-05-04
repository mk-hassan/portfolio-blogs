import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"
import { byDateAndAlphabetical } from "./PageList"
import { formatDate, getDate } from "./Date"
import style from "./styles/gardenSidebar.scss"
import { classNames } from "../util/lang"

interface SectionConfig {
  title: string
  folder: string
  /** Show immediate subfolders instead of individual notes */
  showSubfolders?: boolean
}

const SECTIONS: SectionConfig[] = [
  { title: "Areas", folder: "areas", showSubfolders: true },
  { title: "Projects", folder: "projects", showSubfolders: true },
  { title: "Inbox", folder: "inbox" },
  { title: "Resources", folder: "resources" },
  { title: "Archive", folder: "archive" },
]

const LIMIT = 5
const SUB_LIMIT = 3

/** Turn a slug segment like "llm-zoomcamp" into "LLM Zoomcamp" (best-effort) */
function formatSubfolderName(seg: string): string {
  return seg
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export default (() => {
  const GardenSidebar: QuartzComponent = ({
    allFiles,
    fileData,
    cfg,
    displayClass,
  }: QuartzComponentProps) => {
    const sortFn = byDateAndAlphabetical(cfg)

    return (
      <div class={classNames(displayClass, "garden-sidebar")}>
        {SECTIONS.map(({ title, folder, showSubfolders }) => {
          // All non-index files inside this folder
          const files = allFiles.filter((f) => {
            const slug = f.slug ?? ""
            return (
              slug.startsWith(`${folder}/`) &&
              !slug.endsWith("/index") &&
              slug !== `${folder}/index`
            )
          })

          if (files.length === 0) return null

          if (showSubfolders) {
            // Group files by immediate subfolder
            const subMap = new Map<string, { title: string; files: typeof files }>()

            for (const f of files) {
              const parts = (f.slug ?? "").split("/")
              if (parts.length < 3) continue
              const sub = parts[1]

              if (!subMap.has(sub)) {
                const indexPage = allFiles.find(
                  (p) => p.slug === (`${folder}/${sub}/index` as FullSlug),
                )
                const displayTitle =
                  indexPage?.frontmatter?.title ?? formatSubfolderName(sub)
                subMap.set(sub, { title: displayTitle, files: [] })
              }
              subMap.get(sub)!.files.push(f)
            }

            if (subMap.size === 0) return null

            // Sort each subfolder's files and sort subfolders by most-recent note
            const subfolders = Array.from(subMap.entries())
              .map(([sub, { title: subTitle, files: subFiles }]) => ({
                sub,
                subTitle,
                subFiles: subFiles.sort(sortFn),
              }))
              .sort((a, b) => {
                const aDate = getDate(cfg, a.subFiles[0])
                const bDate = getDate(cfg, b.subFiles[0])
                if (!aDate && !bDate) return 0
                if (!aDate) return 1
                if (!bDate) return -1
                return bDate.getTime() - aDate.getTime()
              })

            const totalShown = subfolders.reduce(
              (sum, { subFiles }) => sum + Math.min(subFiles.length, SUB_LIMIT),
              0,
            )
            const remaining = files.length - totalShown

            return (
              <div class="garden-section">
                <h3 class="section-title">
                  <a href={resolveRelative(fileData.slug!, `${folder}/index` as FullSlug)} class="internal">{title}</a>
                </h3>
                {subfolders.map(({ sub, subTitle, subFiles }) => (
                  <div class="sub-section">
                    <h4 class="sub-title">
                      <a
                        href={resolveRelative(fileData.slug!, `${folder}/${sub}` as FullSlug)}
                        class="internal"
                      >
                        {subTitle}
                      </a>
                    </h4>
                    <ul>
                      {subFiles.slice(0, SUB_LIMIT).map((page) => {
                        const pageTitle =
                          page.frontmatter?.title ?? (page.slug ?? "").split("/").pop() ?? ""
                        const date = getDate(cfg, page)
                        return (
                          <li class="garden-item">
                            <a
                              href={resolveRelative(fileData.slug!, page.slug!)}
                              class="internal item-title"
                            >
                              {pageTitle}
                            </a>
                            {date && <p class="item-date">{formatDate(date, cfg.locale)}</p>}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
                {remaining > 0 && (
                  <a
                    href={resolveRelative(fileData.slug!, folder as FullSlug)}
                    class="internal see-more"
                  >
                    See {remaining} more →
                  </a>
                )}
              </div>
            )
          }

          // Default: show individual notes sorted by date
          const sorted = files.sort(sortFn)
          const visible = sorted.slice(0, LIMIT)
          const remaining = sorted.length - LIMIT

          return (
            <div class="garden-section">
              <h3 class="section-title">
                <a href={resolveRelative(fileData.slug!, `${folder}/index` as FullSlug)} class="internal">{title}</a>
              </h3>
              <ul>
                {visible.map((page) => {
                  const pageTitle =
                    page.frontmatter?.title ?? (page.slug ?? "").split("/").pop() ?? ""
                  const date = getDate(cfg, page)

                  return (
                    <li class="garden-item">
                      <a
                        href={resolveRelative(fileData.slug!, page.slug!)}
                        class="internal item-title"
                      >
                        {pageTitle}
                      </a>
                      {date && <p class="item-date">{formatDate(date, cfg.locale)}</p>}
                    </li>
                  )
                })}
              </ul>
              {remaining > 0 && (
                <a
                  href={resolveRelative(fileData.slug!, folder as FullSlug)}
                  class="internal see-more"
                >
                  See {remaining} more →
                </a>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  GardenSidebar.css = style
  return GardenSidebar
}) satisfies QuartzComponentConstructor
