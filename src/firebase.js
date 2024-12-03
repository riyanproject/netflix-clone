import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyAw3ld_mpo-OieFI8FFZVPKDdG7jcIaWwQ",
  authDomain: "netflix-clone-72086.firebaseapp.com",
  databaseURL: "https://netflix-clone-72086-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "netflix-clone-72086",
  storageBucket: "netflix-clone-72086.firebasestorage.app",
  messagingSenderId: "797239446790",
  appId: "1:797239446790:web:b0904bd237a6b8907d2287"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password) ;
        const user = res.user;
        await addDoc(collection(db,"user"),{
          uid: user.uid,
          name,
          authProvider: "local",
          email,
        });
      }catch(error){
          console.log(error);
          toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login = async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout = ()=>{
  signOut(auth);
}

export {auth, db, login, signup, logout};