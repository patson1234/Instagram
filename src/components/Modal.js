import { Dialog, Transition } from "@headlessui/react"
import { useRecoilState } from "recoil"
import { modalState,userState } from "../atoms/modalAtom"
import { Fragment, useRef, useState } from "react"
import { CameraIcon } from "@heroicons/react/outline"
import Compress from "react-image-file-resizer";

import { db, storage } from '../firebase'
import { addDoc, serverTimestamp, collection } from 'firebase/firestore'
import { ref, getDownloadURL, uploadString, } from "firebase/storage"
export default function Modal() {
    const [open, setOpen] = useRecoilState(modalState)
    const [user, setUser] = useRecoilState(userState)
    const fileref = useRef(null)
    const captionRef = useRef('')
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(0)
    const addImageToPost = (e) => {
        const file = e.target.files[0]
        const size = Math.floor(e.target.files[0].size/1000) 
        if(size>100){
            Compress.imageFileResizer(
                file,
                1000, 
                1000, 
                "JPEG", 
                70, 
                0, 
                (uri) => {
                  setFile(uri)
                },
                "base64"
              );
        }
        else{
            const filereader = new FileReader()
            filereader.readAsDataURL(file)
            filereader.onload = (readerEvent) => {
                setFile(readerEvent.target.result)
            }
        }
       
    }
    const uploadPost = async () => {
        if (loading !== 0) return;
        setLoading(1)
        const imageRef = ref(storage, `posts/${Math.random() * 1000}`) 
        setLoading(20) 
        await uploadString(imageRef, file, "data_url").then(async snapsot => {
            setLoading(40)
            const downlaodUrl = await getDownloadURL(imageRef)
            setLoading(60)
            setLoading(70)
            const docRef = await addDoc(collection(db, 'posts'), {
                username: user.displayName,
                caption: captionRef.current.value,
                profileImg: user.userImg,
                postImg: downlaodUrl,
                timestamp: serverTimestamp()
            })
            setLoading(100)
        })
        setOpen(false)
        setFile(null)
        setLoading(0)
    }
    return (

        <Transition.Root show={open} as={Fragment}>
            <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' onClose={() => { setOpen(false) && setFile(null) }}>
                <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0' >
                        <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                    </Transition.Child>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                        &#8203;
                    </span>
                    <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom="opacity-0 transition-y-4 sm:translate-y-0 sm:scale-95" enterTo='opacity-100 translate-y-0 sm:scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 translate-y-0 sm:scale-100' leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <div>
                                {file ? (
                                    <div className="" >
                                        <button className="rounded-full bg-slate-300 absolute h-6 w-6 ml-1 mt-1" onClick={() => setFile(null)}>X</button>
                                        <img src={file} alt="" />
                                    </div>

                                ) : (
                                    <div onClick={() => fileref.current.click()} className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer">
                                        <CameraIcon className="h-6 w-6 text-red-600" aria-hidden='true' />
                                    </div>
                                )
                                }

                                <div>
                                    <div className="mt-3 text-center sm:mt-3">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Upload a photo
                                        </Dialog.Title>
                                        <div>
                                            <input onChange={addImageToPost} accept="image/*" ref={fileref} type="file" hidden />
                                        </div>
                                        <div className="mt-2">
                                            <input type="text" ref={captionRef} className="border-none focus:ring-0 w-full text-center" placeholder="Please enter a caption..." />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">

                                   {loading >0 ?<div className={`inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300`}>
                                        {loading}%
                                    </div>:
                                    <button type="button" disabled={!file} onClick={uploadPost} className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300">
                                         Upload
                                    </button>}
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}