import {
  Route,
  Navigate,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import {
  EditNote,
  NewNote,
  NoteDetail,
  NoteLayout,
  NoteList,
} from './components'

import { editFormAction, formAction } from './utils/utils'
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

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id == id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  const onDeleteNote = (id: string) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id)
    })
  }

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id == id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id)
    })
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={
            <NoteList
              availableTags={tags}
              notes={notesWithTags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />
          }
        />
        <Route
          path="/new"
          element={<NewNote onAddTag={addTag} availableTags={tags} />}
          action={formAction({ onCreateNote })}
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<NoteDetail onDeleteNote={onDeleteNote} />} />
          <Route
            path="edit"
            element={<EditNote onAddTag={addTag} availableTags={tags} />}
            action={editFormAction({ onUpdateNote })}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    )
  )

  return (
    <div className="mt-9 mx-6 md:my-12 md:mx-24 lg:mx-80">
      <RouterProvider router={router} />
    </div>
  )
}
export default App
