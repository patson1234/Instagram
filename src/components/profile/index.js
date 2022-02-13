import { useEffect,useState } from "react";
import { collection, query, where, doc, setDoc, onSnapshot } from "firebase/firestore";
import Header from "./header";
import Photos from "./photos";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
const Profile = ({profile}) => {
  const {username}= useParams()
  const [photos, setPhotos] = useState([])
  useEffect(()=>{
    const q2 = query(collection(db,'posts'),where('username','==',`${username}`))     
        const unsubscribe = onSnapshot(q2, (querySnapshot) => {
          setPhotos(querySnapshot.docs)
      })
  },[])
  return (
    <>
    <div className="mx-auto max-w-screen-lg">
     
      <Header profile={profile}  postLength={photos.length} />
      <Photos photos={photos}/>
    </div>
    </>
    
  );
};

export default Profile;
