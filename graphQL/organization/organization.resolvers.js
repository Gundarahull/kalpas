const {
  createOrganization,
  allOrganizations,
  organizationMembers,
} = require("../../controllers/organization");

const queries = {
  organizations: async (_, payload, context) => {
    if (!context.user) {
      throw new Error("Authentication required.");
    }
    const Organizations = await allOrganizations(payload, context);
    return Organizations;
  },

  organization__Members: async (_, payload, context) => {
    console.log("what is in the patload>>>>>>>>>>>>", payload);

    if (!context.user) {
      throw new Error("Authentication required.");
    }
    const { members, user, organizationDeatils } = await organizationMembers(
      payload,
      context
    );

    return {
      id: organizationDeatils.id,
      name: organizationDeatils.name,
      members: members.map((member) => ({
        id: member.id,
        role:member.role,
        user: {
          name: member["K_User.name"],
          email: member["K_User.email"],
          id:member["K_User.email"]
        },
      })),
    };
  },
};
const mutations = {
  createOrganization: async (_, payload, context) => {
    if (!context.user) {
      throw new Error("You must be logged in to create an organization.");
    }
    const organization = await createOrganization(payload, context);
    return organization;
  },
};

const resolvers = { mutations, queries };

module.exports = resolvers;
