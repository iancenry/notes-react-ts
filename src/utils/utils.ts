import { redirect } from 'react-router-dom'
import { NoteData } from '../@types/notes'

type ActionProp = {
  onCreateNote: (data: NoteData) => void
}

type editActionProp = {
  onUpdateNote: (id: string, data: NoteData) => void
}

export const formAction =
  ({ onCreateNote }: ActionProp) =>
  async ({ request }: { request: Request }) => {
    const formData: FormData = await request.formData()
    const title = formData.get('title') as string
    const markdown = formData.get('markdown') as string
    const tags = formData.get('tags')
    const selectedTags = JSON.parse(tags! as string)

    onCreateNote({ title: title, markdown: markdown, tags: selectedTags })

    return redirect('..')
  }

export const editFormAction =
  ({ onUpdateNote }: editActionProp) =>
  async ({ request }: { request: Request }) => {
    const formData: FormData = await request.formData()
    const id = formData.get('editNoteId') as string
    const title = formData.get('title') as string
    const markdown = formData.get('markdown') as string
    const tags = formData.get('tags')
    const selectedTags = JSON.parse(tags! as string)

    onUpdateNote(id, { title: title, markdown: markdown, tags: selectedTags })

    return redirect('..')
  }
