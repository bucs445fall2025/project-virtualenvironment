// @desc Save Post
// @route POST api/users/register
// @access public
const asyncHandler = require("express-async-handler");
const Project_Data = require("../models/dataModel");

const storeProject = asyncHandler(async (req, res) => {
    const {create_new, project_name, resolution, layers, layer_data} = req.body;
    const user_email = req.session.user.email;
    if (!project_name || !layers || !resolution || !layer_data || !user_email){
        return res.status(400).json({error: "All Fields Mandatory"});
        }
    const projectAvailable = await Project_Data.findOne({user_email: user_email, project_name: project_name})
    if (projectAvailable && create_new){
        return res.status(400).json({error: "Project already exists."})
    }
    else if (!projectAvailable && !create_new){
        return res.status(400).json({error: "Project Not Found"})
    }

    data = {
        resolution,
        layers, 
        layer_data
    }

    if (create_new){
        try {const project = await Project_Data.create({
            user_email, project_name, data
        });
        }
        catch (error){
            return res.status(400).json({error: "Error creating Project"})
        }
        console.log(`Project Saved ${project_name}`)
        return res.status(200).json({ redirect: '/dashboard', name: project_name});
    }
    else {
        // To save an already made project.
        if (!projectAvailable){
            return res.status(400).json({ error: "This should never happen."});
        }
        projectAvailable.data = data; 
        await projectAvailable.save();
        console.log(`Project Saved Again ${project_name}`)
        return res.status(200).json({message: "save success"});
    }

});

const getProjects = asyncHandler(async (req, res) => {
    // Gets the names of all the projects to display. 
    const user_email = req.session.user.email;
    if (!user_email){
        return res.status(400).json({error: "User Not Found"})
    }
    try{
        const projects = await Project_Data.find({user_email: user_email}, {last_modified: 2 ,project_name: 1, _id: 0});
        return res.status(200).json({names: projects});
    }
    catch(error){
        res.status(200).json({error: error});
    }
})

const loadProject = asyncHandler(async (req, res) => {
    const user_email = req.session.user.email;
    const {project_name} = req.body;
    if (!user_email){
        return res.status(400).json({error: "User Not Found"})
    }
    try {
        const project = await Project_Data.findOne({user_email: user_email, project_name: project_name });
        res.status(200).json({data: project.data});
    }
    catch (error) {
        res.status(400).json({error: "Project Not Loaded"});
    }
}
)

const deleteProject = asyncHandler(async (req, res) => {
    const user_email = req.session.user.email;
    const {project_name} = req.body;
    if (!user_email){
        return res.status(400).json({error: "User Not Found"});
    }
    try {
        const result = await Project_Data.deleteOne({user_email: user_email, project_name: project_name});
        return res.status(200).json({message: "Deleted Successfully"})
    }
    catch(err){
        return res.status(400).json({error: err});
    }
})
module.exports = { storeProject, getProjects, loadProject, deleteProject }