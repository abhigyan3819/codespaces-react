import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../../backend/firebase"; 

const fetchUserData = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);    
    const docSnapshot = await getDoc(userDocRef);    
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      return userData;
    } else {
      return null;
    }
  } catch (err) {
  }
};

const userInfo = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsub(); 
    }, []);

    return { user, loading };
};

export default userInfo;
export default fetchUserData;
