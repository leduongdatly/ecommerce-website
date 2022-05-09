import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const cartFirebase = {
    getAll: () => {
        const cartCollectionRef = collection(db, "cart");
        return getDocs(cartCollectionRef);
    },

    addToCart: (data) => {
        const cartCollectionRef = collection(db, "cart");
        return addDoc(cartCollectionRef, data)
    },

    updateCartQuantity: (quantity, price, id) => {
        const cartCollectionRef = doc(db, "cart", id);
        const newField = {
            quantity: quantity,
            price: price
        }
        return updateDoc(cartCollectionRef, newField);
    },

    deleteFromCart: (id) => {
        const cartCollectionRef = doc(db, "cart", id);
        return deleteDoc(cartCollectionRef);
    }
}

export default cartFirebase;