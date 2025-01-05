import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

class FireBase {
    constructor() {
        this.firebaseConfig = {
            apiKey: "AIzaSyDXnEOkXJCHIhwPKG3EeTNJ90gNeiw8V0k",
            authDomain: "form-19562.firebaseapp.com",
            databaseURL: "https://form-19562-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "form-19562",
            storageBucket: "form-19562.firebasestorage.app",
            messagingSenderId: "430194777439",
            appId: "1:430194777439:web:9bfdcf8f26bdc6cf932aea"
        };
        this.app = initializeApp(this.firebaseConfig);
        // init real time database
        this.rltdb = getDatabase(this.app);
        this.data = {};
    }

    // get data from real time database
    getData = (callback) => {
        try {
            let databaseref = ref(this.rltdb, '/Forms');
            onValue(databaseref, (snapshot) => {
                const data = snapshot.val() || {};
                this.data = data;
                callback(data);
            });
        } catch (error) {
            console.error(error);
        }
    
    }
}

const fire = new FireBase();
export default fire;