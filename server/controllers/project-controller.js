const knex = require("knex")(require("../knexfile"));

async function validateUser(id) {
  try {
    const data = await knex("users").where("id", id).first();
    return true;
  } catch (error) {
    console.log(`No valid user ${error}`);
    return false;
  }
}

function validDate(date) {
  const dat = new Date();
  console.log(dat.getTime());
  return (
    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(date) &&
    new Date(date) > new Date().getTime()
  );
}

//TODO protect this route
//pass user id into the header
const createProject = async (req, res) => {
  const regex = /[A-Z a-z] [0-9]/g;
  // const validDate =
  //   /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  if (
    !regex.test(req.body.title) &&
    !regex.test(req.body.description) &&
    !validDate(req.body.deadline)
  ) {
    return res.status(400).json({ message: "Incomplete body" });
  }
  try {
    const id = await knex("projects").insert(req.body);
    const data = await knex("projects").where("id", id[0]).first();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving users: ${error}`);
  }
};

//TODO protect this route
const editProject = async (req, res) => {
  const regex = /[A-Z a-z 0-9]/g;
  // const validDate =
  //   /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  const { projectId } = req.params;
  let edit = {};
  if (!regex.test(req.body.title)) {
    edit = { ...edit, title: req.body.title };
  }
  if (!regex.test(req.body.description)) {
    edit = { ...edit, description: req.body.description };
  }
  if (!validDate(req.body.title)) {
    edit = { ...edit, description: req.body.deadline };
  }

  try {
    await knex("projects").where("id", projectId).update(req.body);
    const data = await knex("projects").where("id", projectId).first();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).send(`Error editing projects ${err}`);
  }
};
async function upload(req, res) {
  const { projectId } = req.params;
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
      await knex("projects")
        .where("id", projectId)
        .update({
          thumbnail: `http://localhost:${process.env.PORT}/uploads/${uploadedFile.name}`,
        });
      const data = await knex("projects").where("id", projectId).first();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).send(`Error retrieving users projects: ${error}`);
    }
  } else res.send("No file uploaded !!");
}

const getProjectbyId = async (req, res) => {
  const { projectId } = req.params;
  console.log(projectId);
  try {
    const data = await knex("projects").where("id", projectId).first();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(`Error retrieving users projects: ${error}`);
  }
};
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
const getProjects = async (req, res) => {
  try {
    const data = await knex("projects");
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).send(`Error retrieving the projects: ${err}`);
  }
};
//TODO protect this route
const deleteProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await knex("projects").where("id", projectId).del();
    return res.status(200).json(project);
  } catch (error) {
    return res.status(404).send(`No such resource availiable ${error}`);
  }
};
const getAllThemes = async (req, res) => {
  try {
    const project = await knex.column(["deadline"]).select().from("projects");
    console.log(project);
    return res.status(200).json(project);
  } catch (error) {
    return res.status(400).send(`Error collecting themes${error}`);
  }
};
module.exports = {
  createProject,
  editProject,
  upload,
  getProjectbyId,
  getProjects,
  getProjectByUser,
  deleteProject,
  getAllThemes,
};
