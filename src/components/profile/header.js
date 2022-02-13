import { useState, useEffect } from "react";
import { doc, arrayUnion, arrayRemove, updateDoc } from 'firebase/firestore'
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/modalAtom";
import { db } from "../../firebase";
const Header = ({ profile, postLength }) => {
  const [user, setUser] = useRecoilState(userState)
  const [isFollowing, setIsFollowing] = useState(false)
  console.log(user.uid)
  useEffect(() => {
    const f = profile.followers.includes(user.uid)
    setIsFollowing(f)
    console.log(isFollowing)
  }, [profile])
  
  const followUser = async () => {
    await updateDoc(doc(db, 'users', profile.id), { followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid) })
    await updateDoc(doc(db, 'users', user.uid), { following: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid) })
  }
  return (
    <>
      <header className="flex flex-wrap items-center p-4 md:py-8">

        <div className="md:w-3/12 md:ml-16">

          <img className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-pink-600 p-1" src={profile.userImg} alt="profile" />
        </div>
        <div className="w-8/12 md:w-7/12 ml-4">
          <div className="md:flex md:flex-wrap md:items-center mb-4">
            <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
              {profile.username}
            </h2>
            <span className="inline-block fas fa-certificate fa-lg text-blue-500 
                             relative mr-6 text-xl transform -translate-y-2" aria-hidden="true">
              <i className="fas fa-check text-white text-xs absolute inset-x-0
                             ml-1 mt-px"></i>
            </span>
            {user.uid !== profile.id && <a className={`cursor-pointer ${isFollowing ? 'bg-gray-300 hover:bg-gray-400 text-black border-gray-primary' : 'bg-blue-500 text-white hover:bg-blue-600'}  px-2 py-1 
                       font-semibold text-sm hidden rounded block text-center 
                      sm:inline-block block`} >
              <button hidden onClick={followUser}>{isFollowing ? "Unfollow" : 'Follow'}</button>
            </a>}
          </div>
          <ul className="hidden md:flex space-x-8 mb-4">
            <li>
              <span className="font-semibold">{postLength}</span>{" "}
              posts
            </li>

            <li>
              <span className="font-semibold">{profile.followers.length}</span>{" "}
              followers
            </li>
            <li>
              <span className="font-semibold">{profile.following.length}</span>{" "}
              following
            </li>
          </ul>
          <div className="hidden md:block">
            <h1 className="font-semibold">{profile.username}</h1>
          </div>
        </div>
        <div className="md:hidden text-sm my-2">
          <h1 className="font-semibold ml-1">{profile.username}</h1>
        </div>
      </header>
      <div className="px-px md:px-3">
        <ul className="flex md:hidden justify-around space-x-8 border-t 
                      text-center p-2 text-gray-600 leading-snug text-sm">
          <li>
            <span className="font-semibold text-gray-800 block">{postLength}</span>
            posts
          </li>
          <li>
            <span className="font-semibold text-gray-800 block">{profile.followers.length}</span>
            followers
          </li>
          <li>
            <span className="font-semibold text-gray-800 block">{profile.following.length}</span>
            following
          </li>
        </ul>
      </div>
    </>
  )
};

export default Header;
