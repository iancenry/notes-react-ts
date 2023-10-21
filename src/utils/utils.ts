import { redirect } from 'react-router-dom'
import { NoteData } from '../@types/notes'

type ActionProp = {
  onCreateNote: (data: NoteData) => void
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
