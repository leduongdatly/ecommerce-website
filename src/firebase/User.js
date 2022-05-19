import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const userFirebase = {
    getAll: () => {
        const userCollectionRef = collection(db, "user");
        return getDocs(userCollectionRef);
    },

    addUser: (id, data) => {
        const userDoc =  doc(db, "user", id);
        return setDoc(userDoc, data);
    },

    getUserById: (id) => {
        const userDoc =  doc(db, "user", id);
        return getDoc(userDoc);
    },

    updateUser: (id, data) => {
        const userDoc =  doc(db, "user", id);
        return updateDoc(userDoc, data);
    }
}

export default userFirebase;