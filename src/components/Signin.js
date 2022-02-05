import { auth, provider} from '../firebase'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { userState } from "../atoms/modalAtom"
import { useRecoilState } from "recoil"

export default function SignIn() {
    const [session,userSession] = useRecoilState(userState)
    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {   
                const credential = GoogleAuthProvider.credentialFromResult(result);
            }).catch((error) => {
                alert(error.message)
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