// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// TODO ваш конфиг аппа
const firebaseConfig = {
  apiKey: 'AIzaSyC5CFA5H0D0mhrbIsZXpuDqNmj80mbPkB4',
  authDomain: 'test1-13c8b.firebaseapp.com',
  projectId: 'test1-13c8b',
  storageBucket: 'test1-13c8b.appspot.com',
  messagingSenderId: '937722111925',
  appId: '1:937722111925:web:aeee007ca4d724c05bdbfc',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
