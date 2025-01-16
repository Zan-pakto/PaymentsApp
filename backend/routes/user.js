const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { UserVAlidation, loginValidation } = require("../valid");
const { User, Account } = require("../db");
const { jwtsecret } = require("../config");
const authMiddlware = require("./authenticate");
const router = express.Router();
router.post("/signup", async (req, res) => {
  const parseData = UserVAlidation.safeParse(req.body);
  if (!parseData.success) {
    return res.status(411).json({
      msg: "wrong inputs",
    });
  }
  const existingUser = await User.findOne({ UserName: req.body.UserName });
  if (existingUser) {
    return res.status(300).json({
      msg: "User already exist",
    });
  }
  const Users = await User.create({
    UserName: req.body.UserName,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Password: req.body.Password,
  });
  const userId = Users._id;
  await Account.create({
    userId,
    balance: 1 + Math.random() * 1000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    jwtsecret
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});
router.post("/signin", authMiddlware, async (req, res) => {
  const parse = loginValidation.safeParse(req.body);
  if (!parse.success) {
    return res.status(411).json({
      msg: "incorrect inputs",
    });
  }
  const exist = User.findOne({
    where: { UserName: req.body.UserName, Password: req.body.Password },
  });
  if (exist) {
    const token = jwt.sign(
      {
        userid: User._id,
      },
      jwtsecret
    );
    return res.json({
      toke: token,
    });
  }
  res.status(411).json({
    message: "Error while logging in",
  });
});
const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});
router.put("/", authMiddlware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        FirstName: {
          $regex: filter,
        },
      },
      {
        LastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      UserName: user.UserName,
      FirstName: user.FirstName,
      LastName: user.LastName,
      _id: user._id,
    })),
  });
});
module.exports = router;
