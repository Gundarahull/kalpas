const { raw } = require("body-parser");
const K_Membership = require("../models/membership.model");
const K_Organization = require("../models/organization.model");
const K_User = require("../models/user.model");
const createOrganization = async (payload, context) => {
  const { name } = payload;
  if (!name) {
    throw new Error("Organization name is required");
  }
  const organizationName = name.toUpperCase();

  //Organization Check
  const organizationCheck = await K_Organization.findOne({
    where: { name: organizationName },
  });
  if (organizationCheck) {
    throw new Error("Organization already exists");
  }

  try {
    const organization = await K_Organization.create(
      {
        name: organizationName,
        createdById: context.user.id,
      },
      { raw: true }
    );
    console.log("organization coming??????????", organization);

    return organization;
  } catch (error) {
    console.error("Error creating organization:", error);
    throw new Error("Failed to create organization.");
  }
};

const allOrganizations = async (payload, context) => {
  const Organizations = await K_Organization.findAll({
    attributes: ["id", "name"],
    raw: true,
  });
  if (!Organizations) {
    throw new Error("No Organizations are found");
  }
  return Organizations;
};

const organizationMembers = async (payload, context) => {
  const { id: organizationId } = payload;

  console.log("organizationId>>>>>>>>>>>>>>>>>>", organizationId);

  // Verify the logged-in user is a member of the organization
  const membership = await K_Membership.findOne({
    where: {
      userId: context.user.id,
      organizationId: organizationId,
    },
  });

  if (!membership) {
    throw new Error(
      "Access denied: Only members of the organization can view the list."
    );
  }
  // Fetch all members of the organization
  const members = await K_Membership.findAll({
    where: { organizationId: organizationId },
    include: [
      {
        model: K_User,
        attributes: ["id", "name", "email"],
      },
    ],
    raw: true,
  });

  const organizationDeatils = await K_Organization.findByPk(organizationId, {
    raw: true,
  });
  

  const user = await K_User.findAll(
    {
      where: {
        id: context.user.id,
      },
    },
    {
      raw: true,
    }
  );

  const data={ members, user, organizationDeatils }
  return data;
};

module.exports = {
  createOrganization,
  allOrganizations,
  organizationMembers,
};
