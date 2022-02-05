import { onSnapshot, orderBy, query, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import {db} from '../firebase'
import Post from './Post'

function Posts() {
    const [data,setData] = useState([])
    useEffect(() => {
        const q = query(collection(db, "posts"),orderBy('timestamp','desc'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setData(querySnapshot.docs)
        })
        return () => unsubscribe()
    }, [db]);
    
    
    return (
        <div>
            {data.map((post)=>(
             <Post
                key={post.id}
                id={post.id}
                username={post.data().username}
                userImg={post.data().profileImg}
                img={post.data().postImg}
                caption={post.data().caption}
             />
            ))}
        </div>
    )
}

export default Posts