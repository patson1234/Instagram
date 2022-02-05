import { PlusCircleIcon } from "@heroicons/react/outline"
import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState,userState } from "../atoms/modalAtom";
import { signOut } from "firebase/auth";
import {auth} from '../firebase'
export default function Header() {
  const [open, setOpen] = useRecoilState(modalState)
  const [user, setUser] = useRecoilState(userState)
  const logOut = () => {
    signOut(auth).then(() => {
      setUser([])
    }).catch((error) => {
      alert(error.message)
    });
  }
  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-2">

      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <div className="flex hidden lg:inline-grid mx-2 w-full">
              
                <img src="https://github.com/karlhadwen/instagram/blob/master/public/images/users/logo.png?raw=true" alt="Instagram" className="mt-2 w-6/12" />
              
            </div>
            <div className="flex lg:hidden mx-2 w-12">
              
                <img src='https://www.stanthonyshs.org/wp-content/uploads/2018/01/instagram-logo-black-transparent.png' alt="Instagram" className="" />
             
            </div>
          </div>
          {user ?
            <div className="text-gray-700 text-center flex items-center align-items">

              <>
                <PlusCircleIcon className="w-6 mr-2 cursor-pointer" onClick={() => setOpen(true)} />
                <button
                  type="button"
                  title="Sign Out"
                  
                  onClick={()=>logOut()}
                >
                  <svg
                    className="w-6 mr-2 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>

                <div className="flex items-center cursor-pointer">
                  
                    <img
                      className="rounded-full h-8 w-8 flex mr-2"
                      src={user.userImg}
                      alt={`profile`}

                    />
                  
                </div>

              </>
            </div> :
            <div className="text-gray-700 text-center flex items-center align-items">

            </div>
          }

        </div>
      </div>
    </header>
  )
}