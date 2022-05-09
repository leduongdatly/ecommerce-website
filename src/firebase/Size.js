import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const sizeCollectionRef = collection(db, "size");

const sizeFirebase = {
    getAll: () => {
        return getDocs(sizeCollectionRef);
    },

    addSize: (data) => {
        const newField = {
            size: data
        }
        return addDoc(sizeCollectionRef, newField);
    },

    deleteSize: (id) => {
        const sizeDoc = doc(db, "size", id)
        return deleteDoc(sizeDoc);
    },

    updateSize: (id, size) => {
        const newField = {
            size: size
        }
        const sizeDoc = doc(db, "size", id)
        return updateDoc(sizeDoc, newField);
    }
}

export default sizeFirebase;