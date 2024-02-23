import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAmLregDo2iXqT0s47XwXaOktiY4ofRY4w",
  authDomain: "fir-001-ts.firebaseapp.com",
  projectId: "fir-001-ts",
  storageBucket: "fir-001-ts.appspot.com",
  messagingSenderId: "623283015163",
  appId: "1:623283015163:web:82616c64569f5688a78f5e",
  measurementId: "G-39B1QVT1KX",
};

export class FirebaseService {
  app;
  static instance;

  constructor() {
    if (!this.app) {
      this.app = initializeApp(firebaseConfig);
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new FirebaseService();
    }

    return this.instance;
  }

  async signInWithGoogle() {
    const result = await FirebaseAuthentication.signInWithGoogle();

    return result.user;
  }
}
