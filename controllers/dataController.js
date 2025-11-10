// @desc Save Post
// @route POST api/users/register
// @access public
const asyncHandler = require("express-async-handler");
const Project_Data = require("../models/dataModel");

const storeProject = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name, layers, layer_data} = req.body;
    if (!name || !layers || !layer_data){
        res.status(400);
        throw new Error("All Fields Mandatory");
    }
    console.log(layers);
    // const userAvailable = await User.findOne({email});

    // if (userAvailable){
    //     res.status(400);
    //     throw new Error("Email already in use");

    // }
    // // Hash Password
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Hashed Password: ", hashedPassword);

    // const user = await User.create({
    //     username,
    //     email,
    //     password: hashedPassword
    // });
    // console.log( `User created ${user}`);
    // if (user) {
    //     res.status(201).json({_id: user.id, email: user.email});
    // } else {
    //     res.status(400);
    //     throw new Error("User Data is Not Valid");
    // }



    // res.json({message: "Register The User"})
});


module.exports = { storeProject }