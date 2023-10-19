import {
  Route,
  Navigate,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { NewNote } from './components'

import { formAction } from './utils/utils'
import { NoteData, RawNote, Tag } from './@types/notes'
import { useLocalStorage } from './useLocalStorage'
import { useMemo } from 'react'

import { v4 as uuidV4 } from 'uuid'

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  // convert raw notes to actual notes
  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      }
    })
  }, [notes, tags])

  // note creation
  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
    ])
  }

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag])
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<>h</>} />
        <Route
          path="/new"
          element={<NewNote onAddTag={addTag} availableTags={tags} />}
          action={formAction({ onCreateNote })}
        />
        <Route path="/:id">
          <Route index element={<></>} />
          <Route path="edit" element={<></>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    )
  )

  return (
    <div className="my-4 mx-24">
      <RouterProvider router={router} />
    </div>
  )
}
export default App
