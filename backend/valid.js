const zod = require("zod");
const UserVAlidation = zod.object({
  UserName: zod.string().min(3).max(30),
  FirstName: zod.string().max(50),
  LastName: zod.string().max(50),
  Password: zod.string().min(6),
});
const loginValidation = zod.object({
  UserName: zod.string(),
  Password: zod.string(),
});
module.exports = {
  UserVAlidation,
  loginValidation,
};
