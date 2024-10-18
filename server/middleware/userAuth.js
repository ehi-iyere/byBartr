const firebase_admin = require("firebase-admin"); //firebase admin
var serviceAccount = require("../firebaseCred").cred;
const jsonServiceAccount = JSON.parse(JSON.stringify(serviceAccount));
firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert(serviceAccount),
});

const authozize = async (req, res, next) => {
  const token = req.headers.authozize.split(" ")[1];
  try {
    const decode = firebase_admin.auth().verifyIdToken(token);
    if (decode) return next();
    return res.json({ message: " sorry you are unauthorized " });
  } catch (error) {
    return res.json({ message: `Internal server error because of ${error}` });
  }
};

module.exports(authozize);
