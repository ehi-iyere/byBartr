const firebase_admin = require("firebase-admin"); //firebase admin
// var serviceAccount = require("../firebaseCred").cred;
// const jsonServiceAccount = JSON.parse(JSON.stringify(serviceAccount));
// firebase_admin.initializeApp({
//   credential: firebase_admin.credential.cert(serviceAccount),
// });

///need to pass in the users id as a heaer
const authorize = async (req, res, next) => {
  const token = req.headers.authorize.split(" ")[1];
  let { id } = req.params;
  //console.log(token);
  if (!id) id = req.headers.id;
  //console.log(id);
  try {
    const decode = await firebase_admin.auth().verifyIdToken(token);
    console.log(decode.uid, id, decode.uid === id);
    if (decode && decode.uid === id) {
      return next();
    }
    return res.status(401).json({ message: " sorry you are unauthorized " });
  } catch (error) {
    return res
      .status(401)
      .json({ message: `Internal server error because of ${error}` });
  }
};

module.exports = authorize;
