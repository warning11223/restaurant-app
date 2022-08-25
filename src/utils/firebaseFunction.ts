import {collection, doc, getDocs, setDoc} from "firebase/firestore"
import {firestore} from "../firebase.config";
import {foodItem} from "../models/types";


export const addFile = async (data: foodItem) => {
    const file = await setDoc(
        doc(firestore, 'foodItems', `${Date.now()}`,), data, {merge: true}
    )
    return file;
}

export const getItems = async () => {
    let items: foodItem[] = [];
    const querySnapshot = await getDocs(collection(firestore, "foodItems"));
    querySnapshot.forEach((doc) => {
        items.push(<foodItem>doc.data())
    });
    return items;
}