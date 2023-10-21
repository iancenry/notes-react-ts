// Added id to data from form; actual note data structure
export type Note = {
  id: string
} & NoteData

// data from the form
export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

// store the id of the tag instead of the tag so that changes are propagated without editing every single note
export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type NewNoteProps = {
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export type NoteListProps = {
  availableTags: Tag[]
  notes: Note[]
}
