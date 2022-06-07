const Users = require("../models/Usermodel");
const Blogs = require("../models/Blogmodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const cookie = require('cookie-parser')
const { sendEmail, ResendEmail } = require("./sendMail");
require("../middleware/auth");

const { google } = require("googleapis");
// const { default: User } = require('../../client/src/pages/user');
const { OAuth2 } = google.auth;
// const fetch = require('node-fetch')
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const ITEM_PER_PAGE = 3;
const { CLIENT_URL } = process.env;
const userctrl = {
  register: async (req, res) => {
    try {
      const { userid, username, email, password } = req.body;
      if ((!userid, !username || !email || !password)) {
        return res
          .status(400)
          .json({ msg: "please fill the all field", statuscode: 400 });
      }

      if (!validEmail(email)) {
        return res.status(400).json({ msg: "Invalid Email" });
      }

      const userHave = await Users.findOne({ email: email });
      if (userHave)
        return res
          .status(400)
          .json({ msg: "This Email has already been taken" });
      if (password.length < 6)
        return res.status(400).json({
          msg: "Password must be at least 6 characters",
          statuscode: 400,
        });

      const passwordHash = await bcrypt.hash(password, 12);
      const newuser = {
        userid,
        username,
        email,
        password: passwordHash,
      };
      const activation_token = createActivationToken(newuser);

      const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      sendEmail(email, url, "Verify your email address");

      res.json({
        msg: "Your Registration was Successfully ",
        msg1: "Please activate your account to start",
        statuscode: 200,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;

      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { userid, username, email, password } = user;
      const check = await Users.findOne({ email });

      if (check)
        return res
          .status(400)
          .json({ error: "This Email has already been taken" });
      const newUser = new Users({
        userid,
        username,
        email,
        password,
      });

      await newUser.save();
      res.status(200).json({ msg: "Account has been activated!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ msg: "Both field are required " });
      }
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refresh_token, {
        path: "http://localhost:5000/user/refresh_token",
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      rootuseremail = email;
      return res.status(200).json({ msg: "Login success!", statuscode: 200 });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please login now!" });

        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotpassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });
      const access_token = createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/user/reset/${access_token}`;
      ResendEmail(email, url, "Reset your password");
      res.json({
        msg: "You will receive an email with link to reset your password",
        statuscode: 200,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetpassword: async (req, res) => {
    try {
      const { password } = req.body;
      // console.log(password)
      const passwordHash = await bcrypt.hash(password, 12);
      //   console.log(passwordHash)
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );

      // console.log("it ok")
      res.json({ msg: "Password successfully Changed", statuscode: 200 });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getalluserdetail: async (req, res) => {
    try {
      const users = await Users.find().select("-password");
      // const user = await Users.find()
      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getuserdetail: async (req, res) => {
    try {
      // const user = await Users.find({email:rootuseremail});
      const user = await Users.findById(req.user.id).select("-password");
      res.json(user);
      // res.json(req.rootUser);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });

      return res.json({ msg: "logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateuser: async (req, res) => {
    try {
      // console.log("result",req.body)
      const { username, avatar, bio, profession, phone, skills, rootmail } =
        req.body;

      await Users.findOneAndUpdate(
        { email: rootmail },
        {
          username,
          avatar,
          bio,
          phone,
          profession,
          skills,
        }
      );

      res.status(200).json({ msg: "Update Success!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
  googleLogin: async (req, res) => {
    try {
      const { tokenId } = req.body;
      const verify = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.MAILING_SERVICE_CLIENT_ID,
      });

      const { given_name, email_verified, email, name, picture } =
        verify.payload;
      const password = email + process.env.GOOGLE_SECRET;
      const passwordHash = await bcrypt.hash(password, 12);

      if (!email_verified)
        return res.status(400).json({ msg: "Email verification failed." });

      const user = await Users.findOne({ email: email });
      //   console.log(user)
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ msg: "password is incorrect" });

        const refresh_token = createRefreshToken({ id: user._id });

        res.cookie("refreshtoken", refresh_token, {
          path: "http://localhost:5000/user/refresh_token",
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ msg: "Login success!" });
        rootuseremail = email;
      } else {
        const newUser = new Users({
          userid: given_name,
          username: name,
          email,
          password: passwordHash,
          avatar: picture,
        });
        console.log(newUser);
        await newUser.save();
        const refresh_token = createRefreshToken({ id: user._id });
        res.cookie("refreshtoken", refresh_token, {
          path: "http://localhost:5000/user/refresh_token",
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ msg: "Login success!" });
        rootuseremail = email;
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createpost: async (req, res) => {
    try {
      const {
        title,
        body,
        image,
        purl,
        ptype,
        description,
        user_id,
        user_avatar,
      } = req.body;
      if (
        !title ||
        !body ||
        !image ||
        !image ||
        !purl ||
        !purl ||
        !ptype ||
        !description ||
        !user_id ||
        !user_avatar
      ) {
        return res
          .status(400)
          .json({ msg: "please fill the all field", statuscode: 400 });
      }
      const newpost = new Blogs({
        title,
        body,
        image,
        image,
        purl,
        purl,
        ptype,
        description,
        user_id,
        user_avatar,
      });
      await newpost.save();

      res.status(200).json({ msg: "Your post created Successfully" });
      console.log("successfully");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updatepost: async (req, res) => {
    try {
      //  console.log("result",req.body);
      const { id, title, body, image, description, purl, ptype } = req.body;
      await Users.findOneAndUpdate(
        { _id: id },
        {
          title,
          body,
          image,
          description,
          purl,
          ptype,
        }
      );
      res.status(200).json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  allpost: async (req, res) => {
    try {
      const post = await Blogs.find();
      // const user = await Users.find()
      res.status(200).json(post);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  LikeAction: async (req, res) => {
    const { purl, like } = req.body;
    try {
      await Blogs.findOneAndUpdate({ purl }, { like });
      res.json({ msg: "like this post Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deletepost: async (req, res) => {
    const { title } = req.body;
    try {
      const resp = await Blogs.deleteOne({ title });
      res.json({ msg: "Post Deleted!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  usermessage: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const validEmail = (email) => {
  const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  return regex.test(email);
};

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userctrl;
