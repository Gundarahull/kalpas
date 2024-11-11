const {
  userRegistration,
  loginUser,
  me,
} = require("../../controllers/users.controller");

const queries = {
  me: async (_, payload, context) => {
    if (!context.user) {
      throw new Error("Authentication required.");
    }
    const { user, organizations } = await me(payload, context);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      organizations,
    };
  },
};

const mutations = {
  registerUser: async (_, payload) => {
    const user = await userRegistration(payload);
    return user;
  },

  loginUser: async (_, payload) => {
    const { token, user } = await loginUser(payload);
    return { token, user };
  },
};

const resolvers = { mutations, queries };

module.exports = resolvers;
