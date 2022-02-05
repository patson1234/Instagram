import { useEffect,useState} from "react";
import Feed from "./components/Feed";
import Header from "./components/Header";
import SignIn from "./components/Signin";
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import { useRecoilState } from "recoil"
import { userState } from "./atoms/modalAtom"
import Modal from "./components/Modal";
import Loader from "./components/Loader";
function App() {
  const [session,setSession] = useRecoilState(userState)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession({
          uid:user.uid,
          email:user.email,
          userImg:user.photoURL,
          displayName:user.displayName
        })
        setLoading(false)
      } 
      else{
        setLoading(false)
      }
      
    });
  }, []);
  
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll">

      {loading && <Loader />}
      {session.length < 1 && loading === false &&
      <SignIn /> }

     {session.displayName && loading === false && <><Header />
       <Feed />
        <Modal /> 
        </>}
    </div>
  );
}

export default App;
