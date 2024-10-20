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
const createUser = async (req, res) => {
  try {
    const userResponse = await firebase_admin.auth().createUser({
      email: req.body.email,
      password: req.body.password,

      emailVerified: false,
      disabled: false,
    });

    const docRef = db.collection("users").doc(`${userResponse.uid}`);
    try {
      await docRef.set({
        display_name: req.body.display_name,
        email: req.body.email,
        user_id: userResponse.uid,
        pronouns: req.body.pronouns,
        profile_pic: "",
        bio: "",
      });
    } catch (error) {
      res.json({ message: `Internal error because of ${error}` });
    }
    res.json(userResponse);
  } catch (error) {
    res.json({ message: `Internal error because of ${error}` });
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
    const userInfo = data.map((d) => {
      return {
        id: d.id,
        display_name: d.display_name,
        email: d.email,
        bio: d.bio,
        profilePic: d.profilePic,
        pronouns: d.pronouns,
      };
    });
    return res.status(200).json(userInfo);
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
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await knex("users").where("id", id).first();
    console.log(data);
    const userInfo = {
      id: data.id,
      display_name: data.display_name,
      email: data.email,
      bio: data.bio,
      profilePic: data.profilePic,
      pronouns: data.pronouns,
    };
    console.log(userInfo, id);

    return res.status(200).json(userInfo);
  } catch (error) {
    return res.status(400).send(`Error retrieving users: idk ${err}`);
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
  try {
    //TODO include input validation function
    if (req.pronouns) {
      // and pronoun input is valid
      try {
        await knex("users").where("id", id).update("pronouns", req.pronouns);
      } catch (error) {
        return res.status(400).send(`Error updating pronouns ${err}`);
      }
    }
    if (req.display_name) {
      // and pronoun input is valid
      try {
        await knex("users")
          .where("id", id)
          .update("display_name", req.display_name);
      } catch (error) {
        return res.status(400).send(`Error updating display_name ${err}`);
      }
    }
    if (req.profilePic) {
      // and pronoun input is valid
      try {
        await knex("users")
          .where("id", id)
          .update("profilePic", req.profilePic);
      } catch (error) {
        return res.status(400).send(`Error updating profilePic ${err}`);
      }
    }
    if (req.bio) {
      // and pronoun input is valid
      try {
        await knex("users").where("id", id).update("bio", req.bio);
      } catch (error) {
        return res.status(400).send(`Error updating bio ${err}`);
      }
    }
    const user = await knex("users").where("id", data.user_id).first();
    if (!user) {
      return res.status(404).send(`No such user`);
    }
    const { id, display_name, email, bio, profilePic, pronouns } = user;
    const userInfo = {
      id: id,
      display_name: display_name,
      email: email,
      bio: bio,
      profilePic: profilePic,
      pronouns: pronouns,
    };
    return res.status(200).json(userInfo);
  } catch (error) {
    return res.status(400).send(`Error retrieving users: idk ${err}`);
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
module.exports = {
  createUser,
  logInUser,
  getUsers,
  getUser,
  updateProfile,
  upload,
};
