import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { EditTagsModalProps } from '../@types/notes'

const EditTagsModal = ({
  isOpen,
  setIsOpen,
  availableTags,
  onUpdateTag,
  onDeleteTag,
}: EditTagsModalProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          {/* Dialog Box */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* Dialog content */}
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 ml-7 md:ml-5 lg:ml-5"
                  >
                    Edit Tags
                  </Dialog.Title>
                  {/* TAGS LIST */}
                  <div className="mt-4 max-h-80 overflow-y-auto px-7 md:px-5 lg:px-5">
                    <form>
                      <div className="flex flex-col space-y-5">
                        {availableTags?.map((tag) => (
                          <div
                            key={tag.id}
                            className="flex flex-row justify-between"
                          >
                            <div>
                              <input
                                type="text"
                                value={tag.label}
                                className="px-3 py-2 h-12 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500  w-full rounded-md sm:text-sm focus:ring-1"
                                onChange={(e) =>
                                  onUpdateTag(tag.id, e.target.value)
                                }
                              />
                            </div>
                            <button
                              className="outline outline-1 outline-slate-600 py-1 px-2"
                              onClick={() => onDeleteTag(tag.id)}
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    </form>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="ml-7 md:ml-5 lg:ml-5 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Close!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default EditTagsModal
