import { Form, Link } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import { NewNoteProps, Tag } from '../@types/notes'
import { useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { Button } from '.'
import { useNote } from '../utils/hooks'

const NoteForm = ({ onAddTag, availableTags }: NewNoteProps) => {
  // property used on edit mode
  const note = useNote()
  const [selectedTags, setSelectedTags] = useState<Tag[]>(note?.tags || [])

  return (
    <Form method="post">
      <div className="flex flex-row gap-16">
        <div className="flex-1">
          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Title
            </span>
            <input
              type="text"
              name="title"
              className="mt-1 px-3 py-2 h-12 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              // when edit note only
              defaultValue={note?.title}
            />
          </label>
        </div>
        <div className="flex-1">
          <label className="block">
            <span className=" block text-sm font-medium text-slate-700">
              Tags
            </span>
            <CreatableReactSelect
              isMulti
              className="mt-0.5  focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.id }
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    // convert from the value that CreatableReactSelect expects(label & value) to the value we are storing for our type(label and id)
                    return { label: tag.label, id: tag.value }
                  })
                )
              }}
              options={availableTags.map((tag) => ({
                label: tag.label,
                value: tag.id,
              }))}
              onCreateOption={(label) => {
                const newTag = { id: uuidV4(), label }
                onAddTag(newTag) // add to local storage
                setSelectedTags((prev) => [...prev, newTag])
              }}
            />
            {/* to handle selected values due to action not getting all data from CreatableReactSelect */}
            <input
              name="tags"
              value={JSON.stringify(selectedTags)}
              hidden
              readOnly
            />
          </label>
        </div>
      </div>

      <div className="my-10">
        <label className="block">
          <span className=" block text-sm font-medium text-slate-700">
            Body
          </span>
          <textarea
            name="markdown"
            id=""
            cols={30}
            rows={15}
            className="mt-1 px-3 py-2  bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            // when edit note only
            defaultValue={note?.markdown}
          ></textarea>
        </label>
        {note?.id && (
          /* for use when editing a note */
          <input name="editNoteId" value={note.id} hidden readOnly />
        )}
      </div>

      <div className="flex flex-row gap-4 justify-end">
        <Button hasBackground={true} text="Save" isSubmit={true} />

        <Link to="..">
          <Button hasBackground={false} text="Cancel" />
        </Link>
      </div>
    </Form>
  )
}

export default NoteForm
