import Notice from "../Models/notification.js";
import Project from "../Models/projectModel.js";
import User from "../Models/userModel.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { userId } = req.user;
    const { projectCode, title, team, stage, startDate, endDate, priority, assets } =
      req.body;

    let text = "New project has been assigned to you";
    if (team?.length > 1) {
      text = text + ` and ${team?.length - 1} others.`;
    }

    text =
      text +
      ` The project priority is set as ${priority} priority. The project start date is ${new Date(
        startDate
      ).toDateString()}. Thank you!!!`;

    const activity = {
      type: "assigned",
      activity: text,
      by: userId,
    };

    const project = await Project.create({
      projectCode,
      title,
      team,
      stage: stage.toLowerCase(),
      startDate,
      endDate,
      priority: priority.toLowerCase(),
      assets,
      activities: activity,
    });

    await Notice.create({
      team,
      text,
      project: project._id,
    });

    res
      .status(200)
      .json({
        status: true,
        project,
        message: "Project created successfully.",
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Duplicate a project
export const duplicateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    const newProject = await Project.create({
      ...project._doc,
      name: project.name + " - Duplicate",
    });

    newProject.team = project.team;
    newProject.tasks = project.tasks;
    newProject.assets = project.assets;
    newProject.priority = project.priority;
    newProject.stage = project.stage;

    await newProject.save();

    let text = "New project has been assigned to you";
    if (project.team.length > 1) {
      text = text + ` and ${project.team.length - 1} others.`;
    }

    text =
      text +
      ` The project priority is set as ${project.priority} priority. Thank you!!!`;

    await Notice.create({
      team: project.team,
      text,
      project: newProject._id,
    });

    res
      .status(200)
      .json({ status: true, message: "Project duplicated successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Post activity to a project
export const postProjectActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const { type, activity } = req.body;

    const project = await Project.findById(id);

    const data = {
      type,
      activity,
      by: userId,
    };

    project.activities.push(data);

    await project.save();

    res
      .status(200)
      .json({ status: true, message: "Activity posted successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Get dashboard statistics for projects
export const dashboardStatistics = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;

    const allProjects = isAdmin
      ? await Project.find({ isTrashed: false })
          .populate({
            path: "team",
            select: "name role title email",
          })
          .sort({ _id: -1 })
      : await Project.find({
          isTrashed: false,
          team: { $all: [userId] },
        })
          .populate({
            path: "team",
            select: "name role title email",
          })
          .sort({ _id: -1 });

    const users = await User.find({ isActive: true })
      .select("name title role isAdmin createdAt")
      .limit(10)
      .sort({ _id: -1 });

    const groupedProjects = allProjects.reduce((result, project) => {
      const stage = project.stage;

      if (!result[stage]) {
        result[stage] = 1;
      } else {
        result[stage] += 1;
      }

      return result;
    }, {});

    const groupData = Object.entries(
      allProjects.reduce((result, project) => {
        const { priority } = project;

        result[priority] = (result[priority] || 0) + 1;
        return result;
      }, {})
    ).map(([name, total]) => ({ name, total }));

    const totalProjects = allProjects?.length;
    const last10Projects = allProjects?.slice(0, 10);

    const summary = {
      totalProjects,
      last10Projects,
      users: isAdmin ? users : [],
      projects: groupedProjects,
      graphData: groupData,
    };

    res.status(200).json({
      status: true,
      message: "Successfully",
      ...summary,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const { stage, isTrashed } = req.query;

    let query = { isTrashed: isTrashed ? true : false };

    if (stage) {
      query.stage = stage;
    }

    let queryResult = Project.find(query)
      .populate({
        path: "team",
        select: "name title email",
      })
      .sort({ _id: -1 });

    const projects = await queryResult;

    res.status(200).json({
      status: true,
      projects,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Get a single project
export const getProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id)
      .populate({
        path: "team",
        select: "name title role email",
      })
      .populate({
        path: "activities.by",
        select: "name",
      });

    res.status(200).json({
      status: true,
      project,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Create a task under a project
export const createTask = async (req, res) => {
  try {
    const { title, tag, date } = req.body;
    const { id } = req.params; 

    const newTask = {
      title,
      date,
      tag,
    };

    const project = await Project.findById(id);
    project.tasks.push(newTask); 

    await project.save();

    res.status(200).json({ status: true, message: "Task added successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, startDate, endDate, team, stage, priority, assets } =
      req.body;

    const project = await Project.findById(id);

    project.name = name;
    project.startDate = startDate;
    project.endDate = endDate;
    project.priority = priority.toLowerCase();
    project.assets = assets;
    project.stage = stage.toLowerCase();
    project.team = team;

    await project.save();

    res
      .status(200)
      .json({ status: true, message: "Project updated successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Trash a project
export const trashProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    project.isTrashed = true;

    await project.save();

    res
      .status(200)
      .json({ status: true, message: `Project trashed successfully.` });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Delete or restore a project
export const deleteRestoreProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { actionType } = req.query;

    if (actionType === "delete") {
      await Project.findByIdAndDelete(id);
    } else if (actionType === "deleteAll") {
      await Project.deleteMany({ isTrashed: true });
    } else if (actionType === "restore") {
      const project = await Project.findById(id);
      project.isTrashed = false;
      await project.save();
    } else if (actionType === "restoreAll") {
      await Project.updateMany(
        { isTrashed: true },
        { $set: { isTrashed: false } }
      );
    }

    res
      .status(200)
      .json({ status: true, message: `Operation performed successfully.` });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
