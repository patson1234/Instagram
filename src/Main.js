import { useEffect ,useState} from 'react';
import Feed from "./components/Feed";
import Header from "./components/Header";
import Modal from "./components/Modal";
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import { useRecoilState } from "recoil"
import { userState } from "./atoms/modalAtom"
import { useHistory } from 'react-router-dom';
import Loader from './components/Loader';
const Main = () => {
    let history = useHistory()
    const [session,setSession] = useRecoilState(userState)
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    if(!localStorage.getItem('sign')){
      setLoading(false)
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
          setLoading(false)
        }       
      });
    }
  
  }, []);
  return (
     <>
    {loading && <Loader />}
    {!loading && <>
        <Header />
        <Feed />
        <Modal />
    </>}
    </> 
  );
};

export default Main;
