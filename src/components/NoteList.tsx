import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import { NoteListProps, Tag } from '../@types/notes'
import { useMemo, useState } from 'react'
import { Button, EditTagsModal, NoteCard } from '.'

const NoteList = ({
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag,
}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  // update Form to form
  const [title, setTitle] = useState<string>('')

  const [isOpen, setIsOpen] = useState<boolean>(false)
  console.log(isOpen)

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        // if title blank do nothing otherwise check for the title;
        (title === '' ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        //if selectedTags len is 0 do no matching otherwise go through every selected tag and ensure a note has all of them
        (selectedTags.length === 0 ||
          selectedTags.length == 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, notes])

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Notes</h1>
        <div className="flex flex-row space-x-4 md:space-x-10">
          <Link to="new">
            <Button hasBackground={true} text="Add Note" />
          </Link>

          <Link to="." onClick={() => setIsOpen(true)}>
            <Button hasBackground={false} text="Edit Tags" />
          </Link>
        </div>
      </div>

      <form className="mt-10">
        <div className="flex flex-row space-x-5 md:space-x-28 lg:space-x-52">
          <div className="flex-1">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Title
              </span>
              <input
                type="text"
                name="title"
                className="mt-1 px-3 py-2 h-12 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
            </label>
          </div>
          <div className="flex-1">
            <label className="block">
              <span className=" block text-sm font-medium text-slate-700">
                Tags
              </span>
              <ReactSelect
                isMulti
                className="mt-0.5  focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id }
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value }
                    })
                  )
                }}
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
              />
              {/* to handle selected values due to action not getting all data from CreatableReactSelect */}
              <input
                name="tags"
                // value={JSON.stringify(selectedTags)}
                hidden
                readOnly
              />
            </label>
          </div>
        </div>
      </form>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 mt-20">
        {filteredNotes.map((note) => (
          <div key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </div>
        ))}
      </div>

      {/* modal */}
      <EditTagsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        availableTags={availableTags}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
    </>
  )
}

export default NoteList
