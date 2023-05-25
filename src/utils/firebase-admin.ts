import admin from "firebase-admin";

export const getAdmin: () => admin.app.App = () => {
  const currentAdmin = admin.app();
  if (!!currentAdmin) return currentAdmin;

  try {
    const app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: "online-classroom-de70d",
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
        clientEmail:
          "firebase-adminsdk-m4onf@online-classroom-de70d.iam.gserviceaccount.com",
      }),
    });
    return app;
  } catch (err) {
    const currentAdmin = admin.app();
    return currentAdmin;
  }
};
