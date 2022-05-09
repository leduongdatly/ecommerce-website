import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const colorCollectionRef = collection(db, "color");

const colorsFirebase = {
    getAll: () => {
        return getDocs(colorCollectionRef);
    },

    addColor: (data) => {
        const newField = {
            color: data
        }
        return addDoc(colorCollectionRef, newField);
    },

    deleteColor: (id) => {
        const colorDoc = doc(db, "color", id)
        return deleteDoc(colorDoc);
    },

    updateColor: (id, color) => {
        const newField = {
            color: color
        }
        const colorDoc = doc(db, "color", id)
        return updateDoc(colorDoc, newField);
    }
}

export default colorsFirebase;