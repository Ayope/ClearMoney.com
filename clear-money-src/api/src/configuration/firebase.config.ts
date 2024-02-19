export const FIREBASE_CONFIGURATION = () => ({
    apiKey: process.env.FirebaseApiKey as string,
    authDomain: process.env.FirebaseAuthDomain as string,
    projectId: process.env.FirebaseProjectId as string,
    storageBucket: process.env.FirebaseStorageBucket as string,
    messagingSenderId: process.env.FirebaseMessagingSenderId as string,
    appId: process.env.FirebaseAppId as string
});