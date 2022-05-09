import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const productsFirebase = {
    getAll: () => {
        const productsCollectionRef = collection(db, "products");
        return getDocs(productsCollectionRef);
    },
    addNewProduct: (data) => {
        const productsCollectionRef = collection(db, "products");
        return addDoc(productsCollectionRef, data);
    }
}

export default productsFirebase;