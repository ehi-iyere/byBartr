const firebase_admin = require("firebase-admin"); //firebase admin
var serviceAccount = require("../firebaseCred").cred;
const jsonServiceAccount = JSON.parse(JSON.stringify(serviceAccount));
firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert(serviceAccount),
});
const knex = require("knex")(require("../knexfile"));
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");
const db = getFirestore();
async function validateUser(id) {
  try {
    const data = await knex("users").where("id", id).first();
    return true;
  } catch (error) {
    console.log(`No valid user ${error}`);
    return false;
  }
}

const createUser = async (req, res) => {
  const regex = /[A-Z a-z]/g;
  const validPronoun = /[A-Z a-z][/]{1}[A-Z a-z]/g;
  if (
    !req.body.email ||
    !req.body.password ||
    !regex.test(req.body.display_name) ||
    !validPronoun.test(req.body.pronouns)
  ) {
    console.log(
      regex.test(req.body.display_name),
      validPronoun.test(req.body.pronouns)
    );
    return res.status(400).send("Invalid request");
  }
  try {
    const userResponse = await firebase_admin.auth().createUser({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.display_name,
      emailVerified: false,
      disabled: false,
    });
    //adding a user to firebase db
    // const docRef = db.collection("users").doc(`${userResponse.uid}`);
    // try {
    //   await docRef.set({
    // display_name: req.body.display_name,
    // email: req.body.email,
    // user_id: userResponse.uid,
    // pronouns: req.body.pronouns,
    // profile_pic: "",
    // bio: "",
    //   });
    // } catch (error) {
    //   res.json({ message: `Internal error because of ${error}` });
    // }

    await knex("users").insert({
    
      display_name: req.body.display_name,
      email: req.body.email,
      id: userResponse.uid,
      pronouns: req.body.pronouns,
    });
    const user = await knex("users").where("id", userResponse.uid);
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Internal error because of ${error}` });
  }
};

const logInUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
//Get Users firebase db
// const getUsers = async (req, res) => {
//   try {
//     const response = await firebase_admin.auth().listUsers();
//     res.json(response);
//   } catch (error) {
//     console.log(error);
//   }
// };

//get users knex
const getUsers = async (req, res) => {
  try {
    const data = await knex("users");
    // const userInfo = data.map((d) => {
    //   return {
    //     id: d.id,
    //     display_name: d.display_name,
    //     email: d.email,
    //     bio: d.bio,
    //     profilePic: d.profilePic,
    //     pronouns: d.pronouns,
    //   };
    // });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(`Error retrieving users: idk ${err}`);
  }
};
//get a user firestore
// const getUserDetails = async (req, res) => {
//   let response = [];
//   try {
//     const snapshot = await db.collection("users").get();
//     snapshot.forEach((doc) => {
//       console.log(doc.id, "=>", doc.data());
//       let key = doc.id;
//       console.log(key);
//       response.push(doc.data());
//     });
//     res.json(response);
//   } catch (error) {
//     res.json(`server error because ${error}`);
//   }
// };

//get users knex
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await knex("users").where("id", id).first();
    

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(`Error retrieving users: idk ${error}`);
  }
};

const getUserByName = async (req, res) => {
  const { email } = req.params;
  try {
    const data = await knex("users").where("email", email).first();
    const projects = await knex("projects").where("user_id", data.id);
    

    return res.status(200).json(data,projects);
  } catch (error) {
    return res.status(400).send(`Error retrieving users: idk ${error}`);
  }
};

//update profile firestore
// const updateProfile = async (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   const docRef = db.collection("users").doc(id);

//   if (!(await docRef.get()).exists) return res.status(404).send(`No such user`);
//   try {
//     const doc = await docRef.get();
//     // TODO include input validation here
//     if (req.body.bio) {
//       try {
//         await docRef.update({ bio: req.body.bio });
//       } catch (error) {
//         res.json({ message: `Internal error due to ${error}` });
//       }
//     }
//     //TODO implement photo upload and firebase storage
//     if (req.body.profile_pic) {
//       try {
//         await docRef.update({ profile_pic: req.body.profile_pic });
//       } catch (error) {
//         res.json({ message: `Internal error due to ${error}` });
//       }
//     }
//     if (req.body.display_name) {
//       try {
//         await docRef.update({ display_name: req.body.display_name });
//       } catch (error) {
//         res.json({ message: `Internal error due to ${error}` });
//       }
//     }
//     if (req.body.pronouns) {
//       try {
//         await docRef.update({ pronouns: req.body.pronouns });
//       } catch (error) {
//         res.json({ message: `Internal error due to ${error}` });
//       }
//     }
//     res.json(doc.data());
//   } catch (error) {
//     res.status(400).send(`Internal error due to ${error}`);
//   }
// };

const updateProfile = async (req, res) => {
  const { id } = req.params;
  const regex = /[A-Z]/g;
  const validPronoun = /[A-Z a-z][/]{1}[A-Z a-z]/g;
  let edit = {};
  // if (!validateUser(id)) {
  //   return res.status(404).send(`No such user`);
  // }
  if (validPronoun.test(req.body.pronouns)) {
    edit = { ...edit, pronouns: req.body.pronouns };
  }
  if (regex.test(req.body.display_name)) {
    edit = { ...edit, display_name: req.body.req.body.display_name };
  }
  if (req.body.bio.match(regex)) {
    edit = { ...edit, bio: req.body.bio };
  }
  try {
    await knex("users").where("id", id).update(edit);

    const user = await knex("users").where("id", id).first();

    // const { id, display_name, email, bio, profilePic, pronouns } = user;
    // const userInfo = {
    //   id: id,
    //   display_name: display_name,
    //   email: email,
    //   bio: bio,
    //   profilePic: profilePic,
    //   pronouns: pronouns,
    // };
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).send(`Error retrieving users:  ${error}`);
  }
};

async function upload(req, res) {
  const { id } = req.params;
  // When a file has been uploaded
  if (req.files && Object.keys(req.files).length !== 0) {
    // Uploaded path
    const uploadedFile = req.files.file;

    const uploadPath =
      path.dirname(__dirname) + "/public/uploads/" + uploadedFile.name;

    uploadedFile.mv(uploadPath, function (err) {
      if (err) {
        console.log(err);
        return res.send("Failed !!");
      }
    });
    try {
      await knex("users")
        .where("id", id)
        .update({
          profilepic: `http://localhost:${process.env.PORT}/uploads/${uploadedFile.name}`,
        });
      const data = await knex("users").where("id", id).first();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).send(`Error retrieving users projects: ${error}`);
    }
  } else res.send("No file uploaded !!");
}
const getProjectByUser = async (req, res) => {
  const { user_id } = req.params;
  //console.log(projectId);
  try {
    const data = await knex("projects").where("user_id", user_id).first();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(`Error retrieving users projects: ${error}`);
  }
};
module.exports = {
  createUser,
  logInUser,
  getUsers,
  getUserById,
  getUserByName,
  updateProfile,
  upload,
};
