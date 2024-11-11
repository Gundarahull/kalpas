const { createHmac, randomBytes } = require("node:crypto");
const jwt = require("jsonwebtoken");
const K_User = require("../models/user.model");
const K_Membership = require("../models/membership.model");
const K_Organization = require("../models/organization.model");

const secret_key = "12345qwertyasdfgzxcvb";

const userRegistration = async (payload) => {
  const { name, email, password } = payload;
  console.log("the payload>>>>>>>", payload);

  if (!name || !email || !password) {
    throw new Error("name,email,password three required");
  }
  //we can use bycrypt
  //but using crypto-----------
  const user = await K_User.findOne({
    where: { email },
    raw: true,
  });
  if (user) {
    throw new Error("Email already exists");
  }

  const salt = randomBytes(32).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const new_user = await K_User.create(
    {
      name,
      email,
      password: hashedPassword,
      salt,
    },
    { raw: true }
  );

  return new_user;
};

const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await K_User.findOne({ where: { email }, raw: true });
  if (!user) {
    throw new Error("Email not found");
  }

  const isValidPassword = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");

  if (isValidPassword !== user.password) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ id: user.id, email: user.email }, secret_key, {
    expiresIn: "24h",
  });

  const data = {
    token,
    user,
  };

  return data;
};

const me = async (payload, context) => {
  const user = await K_User.findByPk(context.user.id, {
    include: [
      {
        model: K_Membership,
        include: [
          {
            model: K_Organization,
            attributes: ["id", "name"],
          },
        ],
      },
    ],
    attributes: ["id", "name", "email"],
  });

  const organizations = user.K_Memberships.map(
    (membership) => membership.K_Organization
  );
  const data = {
    user,
    organizations,
  };
  return data;
};

module.exports = {
  userRegistration,
  loginUser,
  me,
};
