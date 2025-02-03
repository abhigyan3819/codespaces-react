import { useEffect, useState } from "react";
import { auth } from "../../backend/firebase";
import { onAuthStateChanged } from "firebase/auth";

const userInfo = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe(); 
    }, []);

    return { user, loading };
};

export default userInfo;
