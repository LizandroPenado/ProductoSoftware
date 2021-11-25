// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyA1d-4jiYKtN2EWIy-AOkC2XGqRfOT4030",
  authDomain: "buscador-repuestos.firebaseapp.com",
  projectId: "buscador-repuestos",
  storageBucket: "buscador-repuestos.appspot.com",
  messagingSenderId: "1091977589740",
  appId: "1:1091977589740:web:4d2e8340c84bab489a46c9",
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
