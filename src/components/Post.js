import { useState, useEffect } from 'react'
import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon } from '@heroicons/react/outline'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { db } from '../firebase'
import { useRecoilState } from "recoil"
import { userState } from "../atoms/modalAtom"
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
export default function Post({ id, username, userImg, img, caption }) {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [likes, setLikes] = useState([])
    const [hasliked, setHasLiked] = useState(false)
    const [user, setUser] = useRecoilState(userState)
    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), (snapsot) => setComments(snapsot.docs))
        return () => unsubscribe()
    }, [db, id])
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => setLikes(snapshot.docs))
        return () => unsubscribe()
    },
        [db, id])
    useEffect(() => {
        setHasLiked(likes.findIndex((like) => like.id === user?.uid) !== -1)
    }, [likes]);
    const submitComment = async (e) => {
        e.preventDefault()
        setComment('')
        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: comment,
            username: user.displayName,
            userImg: user.userImg,
            timestamp: serverTimestamp()
        })
    }
    const likePost = async () => {
        if (hasliked) {
            deleteDoc(doc(db, 'posts', id, 'likes', user.uid))
        }
        else {
            await setDoc(doc(db, 'posts', id, 'likes', user.uid), {
                username: user.displayName
            })
        }

    }
    return (
        <div className='rounded  w-full border bg-white border-gray-primary mb-12'>
            <div className="flex border-b border-gray-primary h-4 p-4 py-8">
                <div className="flex items-center">
                    <Link to={`/p/${username}`} className="flex items-center">
                    <img
                        className="rounded-full h-8 w-8 flex mr-3"
                        src={userImg}
                        alt={`${username} profile picture`}
                    />
                    <p className="font-bold">{username}</p>
                    </Link>
                </div>
            </div>
            <img src={img} alt="" className='object-cover w-full' />
            {user && <div className='flex justify-between px-4 pt-4'>
                <div className='flex space-x-3'>
                    {
                        hasliked ? <HeartIconFilled className='btn text-red-500' onClick={likePost} /> : <HeartIcon className='btn' onClick={likePost} />
                    }

                    <ChatIcon className='btn' />
                    <PaperAirplaneIcon className='btn' />
                </div>
                <BookmarkIcon className='btn ' />
            </div>}
            <p className='p-5 truncate'>
                {likes.length > 0 && <p className='font-bold mb-1'>{likes.length} {likes.length === 1 ? 'like' : "likes"}</p>}
                <div className="pt-2 pb-1">
                    <span className="mr-1 font-bold">{username}</span>
                    <span className="italic">{caption}</span>
                </div>
            </p>
            {comments.length > 0 && (
                <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
                    {comments.map((comment) => (
                        <div key={comment.id} className='flex items-center space-x-2 mb-3'>
                            <Link to={`/p/${comment.data().username}`}>
                            <img src={comment.data().userImg} className='h-7 rounded-full' alt="" />
                            </Link>
                            <p className='text-sm flex-1'><span className='font-bold'>{comment.data().username}</span>{" "}{comment.data().comment}</p>
                            <Moment fromNow className='pr-5 text-xs'>
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))
                    }
                </div>)}


            {<form onSubmit={submitComment} className='flex items-center p-4'>
                <EmojiHappyIcon className='h-6  text-slate-800' />
                <input type='text' value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Add a comment...' className='border-none flex-1 focus:ring-0 outline-none' />
                <button type='submit' className='font-semibold text-blue-500'>Post</button>
            </form>}
        </div>
    )
}