import { useEffect, useState } from 'react';
import Header from './components/Header';
import Profile from './components/profile';
import { collection, query, where, doc, setDoc, onSnapshot } from "firebase/firestore";
import {onAuthStateChanged} from 'firebase/auth'
import { useParams } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { userState } from './atoms/modalAtom';
import {db,auth} from './firebase'
import Loader from './components/Loader';
import { useHistory } from 'react-router-dom';
const Userprofile = () => {
  const [loading,setLoading] = useState(true)
  const [session,setSession] = useRecoilState(userState)
  const { username } = useParams();
  const [profile,setProfile] = useState([])
  const [photos,setPhotos] = useState([])
  let history = useHistory()
  useEffect(()=>{
    if(!localStorage.getItem('sign')){
      history.push("/login")
    }
    else{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setSession({
            uid:user.uid,
            email:user.email,
            userImg:user.photoURL,
            displayName:user.displayName
          }) 
          const q = query(collection(db, "users"), where('username', '==', `${username}`))
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setProfile(querySnapshot.docs[0].data())
            console.log(querySnapshot.docs[0].data())
            setLoading(false)
        })
        
        }       
      });
    }
  },[])
  return (
    <div className="bg-gray-50">
    {profile.id && <Header />}
    <div >
      {profile.id && <Profile profile={profile}/>}
      {loading && <Loader />}
    </div>
  </div>
  );
};

export default Userprofile;
