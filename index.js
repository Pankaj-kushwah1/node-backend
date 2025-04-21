import express from "express";
import connectDB from "./src/connection.js";
import cors from "cors";
import User from "./src/models/userModel.js";
const app = express();
const PORT = process.env.PORT || 3001;
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

app.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    // console.log("req.body: ", req.body);

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const alreadyRegister = await User.findOne({ email });
    console.log("alreadyRegister: ", alreadyRegister);
    if (alreadyRegister) {
      return res.status(400).json({
        success: false,
        message: "User already registered with this email",
      });
    }
    const user = {
      fullName,
      email,
      password,
    };
    const newUser = new User(user);
    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

app.use("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
