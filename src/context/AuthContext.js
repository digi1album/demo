import { createContext, useContext, useEffect, useState } from 'react';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updatePassword
  } from 'firebase/auth';

  import { collection, getDocs, query, where } from "firebase/firestore";
  import { db } from '../firebase';

  import { auth } from '../firebase';

// creating a context for the user
const userContext = createContext()

export const AuthContextProvider=({children})=>{
    const [user, setUser] = useState(null);
    const [Link,setLink] = useState(null)


    // handleing sign in requests using firebase auth
    const signIn = (email, password) =>  {
        return signInWithEmailAndPassword(auth, email, password)
       }
    
    const logout = () => {
          return signOut(auth)
      }

    const setPassword = (newPassword)=>{
      updatePassword(auth.currentUser, newPassword)
    }

    const db_read = async ()=>{
      if(user)
      {
        const q = query(collection(db, "gallery"), where("userID","==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot?.forEach(async (doc) => {
          const data= await JSON.parse(JSON.stringify(doc.data()))
          setLink(data)
        });
      }
    }

    useEffect(() => {

        const getCurrentUser = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => {
          getCurrentUser();
        };
      }, []);

      useEffect(()=>{
        user?.uid && db_read()
      },[user])
  
    return(
        <userContext.Provider value={{signIn,user,Link, logout, setPassword}}>
            {children}
        </userContext.Provider>
    )
}

export const UserAuth=()=>{
    return useContext(userContext)
}