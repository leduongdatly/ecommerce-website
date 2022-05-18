import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const productsFirebase = {
    getAll: () => {
        const productsCollectionRef = collection(db, "products");
        return getDocs(productsCollectionRef);
    },
    addNewProduct: (data) => {
        const productsCollectionRef = collection(db, "products");
        return addDoc(productsCollectionRef, data);
    },
    updateProduct: (data, id) => {
        const productsDoc = doc(db, "products", id);
        return updateDoc(productsDoc, data);
    },
    deleteProduct: (id) => {
        const productsDoc = doc(db, "products", id);
        return deleteDoc(productsDoc);
    },
}

export default productsFirebase;