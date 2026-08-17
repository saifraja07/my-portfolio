export type WritingKind = 'Note' | 'Article' | 'Experiment' | 'Idea';

export interface WritingEntry {
  slug: string;
  title: string;
  kind: WritingKind;
  summary: string;
  date: string;
  tags: string[];
  readingMinutes: number;
  /** Placeholder for future markdown/CMS body content. */
  body: string[];
}
