/**
 * Resume parser for standard plaintext resumes.
 *
 * Expected structure (conventional resume layout):
 *
 *   Name
 *   Headline
 *   contacts | separated | by pipes
 *
 *   SECTION HEADER            <- all-caps line (SUMMARY, EXPERIENCE, ...)
 *   Title | Organization | Date range
 *   - bullet point
 *   - bullet point
 */

export interface ResumeEntry {
  title: string
  organization: string
  period: string
  bullets: string[]
}

export interface ResumeSection {
  name: string
  text: string[]
  entries: ResumeEntry[]
}

export interface ParsedResume {
  name: string
  headline: string
  contacts: string[]
  sections: ResumeSection[]
}

const isSectionHeader = (line: string): boolean =>
  /^[A-Z][A-Z\s&/]+$/.test(line.trim()) && line.trim().length >= 3

const isEntryHeader = (line: string): boolean => line.includes('|')

const isBullet = (line: string): boolean => /^[-•*]\s+/.test(line.trim())

export function parseResume(raw: string): ParsedResume {
  const lines = raw.split(/\r?\n/)
  const resume: ParsedResume = {
    name: '',
    headline: '',
    contacts: [],
    sections: [],
  }

  // Header: first non-empty lines before the first section are
  // name, headline, then contact line(s).
  let i = 0
  const headerLines: string[] = []
  while (i < lines.length && !isSectionHeader(lines[i])) {
    const line = lines[i].trim()
    if (line) headerLines.push(line)
    i++
  }
  resume.name = headerLines[0] ?? ''
  resume.headline = headerLines[1] ?? ''
  resume.contacts = headerLines
    .slice(2)
    .flatMap((l) => l.split('|'))
    .map((c) => c.trim())
    .filter(Boolean)

  let section: ResumeSection | null = null
  let entry: ResumeEntry | null = null

  for (; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    if (isSectionHeader(line)) {
      section = { name: line, text: [], entries: [] }
      resume.sections.push(section)
      entry = null
    } else if (!section) {
      continue
    } else if (isEntryHeader(line)) {
      const [title = '', organization = '', period = ''] = line
        .split('|')
        .map((p) => p.trim())
      entry = { title, organization, period, bullets: [] }
      section.entries.push(entry)
    } else if (isBullet(line) && entry) {
      entry.bullets.push(line.replace(/^[-•*]\s+/, ''))
    } else if (entry) {
      entry.bullets.push(line)
    } else {
      section.text.push(line)
    }
  }

  return resume
}

export function findSection(
  resume: ParsedResume,
  name: string,
): ResumeSection | undefined {
  return resume.sections.find((s) =>
    s.name.toUpperCase().includes(name.toUpperCase()),
  )
}

export async function fetchResume(path: string): Promise<ParsedResume> {
  const res = await fetch(path)
  if (!res.ok) {
    throw new Error(`Resume not found at ${path} (HTTP ${res.status})`)
  }
  return parseResume(await res.text())
}
