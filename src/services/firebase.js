import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from 'firebase/database';
const apiKey = process.env.VUE_APP_apikey;
const authDomain = process.env.VUE_APP_authDomain;
const databaseURL = process.env.VUE_APP_databaseURL;
const projectId = process.env.VUE_APP_projectId;
const storageBucket = process.env.VUE_APP_storageBucket;
const messagingSenderId = process.env.VUE_APP_messagingSenderId;
const appId = process.env.VUE_APP_appId;
const measurementId = process.env.VUE_APP_measurementId;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database, ref, push, onValue };
