import { useAddTodoMutation } from "@/config/redux/api/todoApi";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, SyntheticEvent, useState } from "react";
import { FaCircleNotch } from "react-icons/fa";
import Head from "next/head";

interface AddTodoProps {
    onRefresh:() => void
}

export default function AddTodo({onRefresh}:AddTodoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [complete, setComplete] = useState(false);
  const [addNewPost, response] = useAddTodoMutation();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    addNewPost({
      userId: 1,
      title,
      completed: complete,
    })
      .then(() => {
        setTitle("");
        setComplete(false);
        setIsOpen(false);
        onRefresh()
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex justify-end mb-2">
        <Head>
          <title>Todo Apps Jsonplacholder</title>
        </Head>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add Todo
        </button>
      </div>

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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Input new todo
                  </Dialog.Title>
                  <form onSubmit={onSubmit}>
                    <div className="mt-5">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="floating_title"
                          id="floating_title"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=""
                          required
                          autoComplete="off"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <label
                          htmlFor="floating_title"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Title
                        </label>
                      </div>

                      <div className="flex justify-center">
                        <label className="relative inline-flex items-center mb-4 cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={complete}
                            onChange={(e) => setComplete(e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          <span className="ml-3 text-sm font-medium text-gray-500">
                            Complete
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-row justify-end gap-x-3">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-blue-200"
                        disabled={response.isLoading}
                      >
                        {response.isLoading ? (
                          <div className=" animate-spin text-2xl">
                            <FaCircleNotch />
                          </div>
                        ) : (
                          <>Save</>
                        )}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
