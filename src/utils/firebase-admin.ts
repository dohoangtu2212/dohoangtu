import admin from "firebase-admin";

export const getAdmin: () => admin.app.App = () => {
  try {
    const app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID, //"online-classroom-de70d",
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL, // "firebase-adminsdk-m4onf@online-classroom-de70d.iam.gserviceaccount.com",
      }),
    });
    return app;
  } catch (err) {
    const currentAdmin = admin.app();
    return currentAdmin;
  }
};
