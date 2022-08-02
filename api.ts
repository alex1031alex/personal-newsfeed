import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PartnerArticle } from './types';

const PARTNERS_POST_COLLECTION = 'partners-posts';
export const initializeAPI = () => {
  const firebaseApp = initializeApp({
    apiKey: 'AIzaSyB1s0tnVvvYyZYFGrfxm177UeX_RKD1GdQ',
    authDomain: 'karpov-news-e31c6.firebaseapp.com',
    projectId: 'karpov-news-e31c6',
    storageBucket: 'karpov-news-e31c6.appspot.com',
    messagingSenderId: '779406088579',
    appId: '1:779406088579:web:ec10b955c64a726b617eb6',
  });

  getAuth(firebaseApp);
  getFirestore(firebaseApp);
  getStorage(firebaseApp);

  return firebaseApp;
};

export const getPartnersArticles = async () => {
  const db = getFirestore();
  const articles: PartnerArticle[] = [];

  try {
    const querySnapshot = await getDocs(collection(db, PARTNERS_POST_COLLECTION));

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<PartnerArticle, 'id'>;
      articles.push({
        id: doc.id,
        ...data,
      });
    });
  } catch (error) {
    return Promise.reject(error);
  }

  return articles;
};

export const createPartnersArticle = async (data: Omit<PartnerArticle, 'id' | 'created'>): Promise<any> => {
  const db = getFirestore();

  try {
    await addDoc(collection(db, PARTNERS_POST_COLLECTION), data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPartnersArticle = async (id: string): Promise<PartnerArticle> => {
  const db = getFirestore();
  const docRef = doc(db, PARTNERS_POST_COLLECTION, id);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<PartnerArticle, 'id'>;

      return {
        id: docSnap.id,
        ...data,
      };
    } else {
      throw Error('No such document');
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updatePartnersArticle = async (id: string, data: Omit<PartnerArticle, 'id' | 'created'>): Promise<any> => {
  const db = getFirestore();
  const ref = doc(db, PARTNERS_POST_COLLECTION, id);

  try {
    await updateDoc(ref, data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deletePartnersArticle = async (id: string): Promise<any> => {
  const db = getFirestore();
  const ref = doc(db, PARTNERS_POST_COLLECTION, id);

  try {
    await deleteDoc(ref);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadFile = async (file: File): Promise<string> => {
  const storage = getStorage();
  const storageRef = ref(storage, file.name);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const url = getDownloadURL(snapshot.ref);

    return url;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMainPartnerArticle = async (): Promise<PartnerArticle | null> => {
  const db = getFirestore();
  let article = null;

  try {
    const q = query(collection(db, PARTNERS_POST_COLLECTION), orderBy('created', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<PartnerArticle, 'id'>;
      article = {
        id: doc.id,
        ...data,
      };
    });
  } catch (error) {
    return Promise.reject(error);
  }

  return article;
};
