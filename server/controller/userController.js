const User = require("../model/employeeModel");

const create = async (req, res) => {
    try {
      const { fname, lname, email, password } = req.body;
  
      // Check if all required fields are provided
      if (!fname || !lname || !email || !password) {
        return res.status(400).json({ msg: "Please provide all required fields" });
      }
  
      // Save user to the database
      const userData = new User({ fname, lname, email, password });
      await userData.save();
  
      res.status(200).json({ msg: "User created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };


const getAll = async(req, res) =>{
    try {

        const userData = await User.find();
        if(!userData){
            return res.status(404).json({msg:"User data not found"});
        }
        res.status(200).json(userData);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


const getOne = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json(userExist);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


const update = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(401).json({msg:"User not found"});
        }

        const updatedData = await User.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({msg: "User updated successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


const deleteUser = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "User not exist"});
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({msg: "User deleted successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      // Check if password matches
      if (user.password !== password) {
        return res.status(401).json({ msg: "Invalid email or password" });
      }
  
      // At this point, user is authenticated
      // Return user's email in the response
      res.status(200).json({ user: { email: user.email } });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

module.exports = { create, getAll, getOne, update, deleteUser, loginUser };
