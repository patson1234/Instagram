import { auth, provider } from '../firebase'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import { collection, query, where, doc, setDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
export default function SignIn() {
    let history = useHistory()
    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                localStorage.setItem('sign','true')
                const q = query(collection(db, "users"), where('id', '==', `${result.user.uid}`))
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    console.log(querySnapshot.docs)
                    if (querySnapshot.docs.length !== 1) {
                        setDoc(doc(db, 'users', result.user.uid), {
                            username: result.user.displayName,
                            id: result.user.uid,
                            userImg: result.user.photoURL,
                            email: result.user.email,
                            followers:[],
                            following:[]
                        }).then(()=>history.push('/'))
                    }else{
                        history.push("/")
                        console.log('signed already')
                    }
                })
            }).catch((error) => {
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }

    return (
        <>
            <div className='flex flex-col items-center justify-center min-h-screen py-2 -nt-56 px-14 text-center'>
                <img className='w-80' src="https://github.com/karlhadwen/instagram/blob/master/public/images/users/logo.png?raw=true" alt="Instagram" />
                <p className='font-xs italic'>This is Instagram, by the big developer team of one person</p>
                <div className='mt-40'>

                    <div>
                        <button onClick={signIn} className='p-3 bg-blue-500 rounded-lg text-white'>
                            Sign in with Google
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}