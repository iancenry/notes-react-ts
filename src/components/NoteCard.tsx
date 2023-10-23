import { Link } from 'react-router-dom'
import { SimplifiedNote } from '../@types/notes'

const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
  return (
    <Link to={`/${id}`}>
      <div className="h-96 w-full rounded-md flex justify-center items-center shadow-lg hover:shadow-xl hover:-translate-y-4 transition-all">
        <div className="text-center">
          <span className="text-2xl font-semibold">{title}</span>

          {tags.length > 0 && (
            <div className="flex flex-row flex-wrap justify-center space-x-6 mt-7">
              {tags.map((tag) => (
                <div
                  className="px-4 py-2 rounded-md bg-blue-500 text-slate-100 text-lg"
                  key={tag.id}
                >
                  {tag.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
