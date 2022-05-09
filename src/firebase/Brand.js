import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const brandCollectionRef = collection(db, "brand");

const brandFirebase = {
    getAll: () => {
        return getDocs(brandCollectionRef);
    },

    addBrand: (data) => {
        const newField = {
            brand: data
        }
        return addDoc(brandCollectionRef, newField);
    },

    deleteBrand: (id) => {
        const brandDoc = doc(db, "brand", id)
        return deleteDoc(brandDoc);
    },

    updateBrand: (id, brand) => {
        const newField = {
            brand: brand
        }
        const brandDoc = doc(db, "brand", id)
        return updateDoc(brandDoc, newField);
    }
}

export default brandFirebase;