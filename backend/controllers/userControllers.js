import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_TOKEN);
};

// login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

try {
    const user =  await userModel.findOne({email});
    if(!user){
        return res.json({success:false, message:"User doesn't Exists!"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.json({success:false,message:"Invalid Credentials!"});
    }

    const token =createToken(user._id);
    res.json({success:true, token});

} catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
}  };





// register user
export const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already Exists!" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter correct EmailId!" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter strong password!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name:name, email:email, password: hashedPassword });
    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token });
    res.json({ success: false, message: "Error registering user." });

  } 
  catch (error) {
    res.json({ success: false, message: "Error!" });

  }
};
