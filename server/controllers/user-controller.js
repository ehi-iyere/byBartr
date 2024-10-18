const firebase_admin = require("firebase-admin"); //firebase admin
var serviceAccount = require("../firebaseCred").cred;
const jsonServiceAccount = JSON.parse(JSON.stringify(serviceAccount));
firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert(serviceAccount),
});
const createUser = async (req, res) => {
  try {
    const userResponse = await firebase_admin.auth().createUser({
      email: req.body.email,
      password: req.body.password,
      emailVerified: false,
      disabled: false,
    });
    res.json(userResponse);
  } catch (error) {
    console.log(error);
  }
};

const logInUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const response = await firebase_admin.auth().listUsers();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  logInUser,
  getUsers,
};
