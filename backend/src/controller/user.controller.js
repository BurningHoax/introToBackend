import { User } from "..//models/users.models.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "all fields are important" });
    }

    //checking for exisiting user status
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    //creting a user

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
    });

    res.status(201).json({
      message: "user registered successfully",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email.toLowerCase(),
    });
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({
        message: "invalid cred",
      });
    res.status(200).json({
      message: "logged in",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    return res.status(200).json({
      message: "logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
export { registerUser, loginUser, logoutUser };
