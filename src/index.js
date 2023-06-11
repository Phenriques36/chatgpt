import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, getDocs, addDoc, doc, deleteDoc 
} from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyC8-202Ue_lKkuscacnkqQx-_QTyvZtA7Y",
    authDomain: "salesmaster-dfb81.firebaseapp.com",
    projectId: "salesmaster-dfb81",
    storageBucket: "salesmaster-dfb81.appspot.com",
    messagingSenderId: "297399546092",
    appId: "1:297399546092:web:b24dafed36d5e9e642b5c9",
    measurementId: "G-WEGHBP966K"
  };

initializeApp(firebaseConfig)

const db = getFirestore()

const colRef = collection(db,'vegetais')

getDocs(colRef)
.then((snapshot)=> {
    let vegetais =[]
    snapshot.docs.forEach((doc) =>{
        vegetais.push({ ...doc.data(), id: doc.id })
    })
console.log(vegetais)
    
})

.catch(err =>{
    console.log(err.message)
})

const addVegetalForm = document.querySelector('.add');
addVegetalForm.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(colRef, {
    nome: addVegetalForm.nome.value,
    tipo: addVegetalForm.tipo.value,
  })
    .then(() => {
      addVegetalForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// Excluindo documentos
const deleteVegetalForm = document.querySelector('.delete');
deleteVegetalForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const docRef = doc(db, 'vegetais', deleteVegetalForm.id.value);

  deleteDoc(docRef)
    .then(() => {
      deleteVegetalForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});
