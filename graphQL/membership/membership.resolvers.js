const {
  addMemberToOrganization,
} = require("../../controllers/membership.controller");

const queries = {};
const mutations = {
  addMemberToOrganization: async (_, payload, context) => {
    if (!context.user) {
      throw new Error("You must be logged in to create an organization.");
    }
    const { membership, userToAdd, organization } =
      await addMemberToOrganization(payload, context);
      return {
        id: membership.id,
        role: membership.role,
        organization,
        user: userToAdd
      };
  },
};

const resolvers = { mutations, queries };

module.exports = resolvers;
