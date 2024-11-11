const { Sequelize } = require("sequelize");
const K_Membership = require("../models/membership.model");
const K_Organization = require("../models/organization.model");
const K_User = require("../models/user.model");

const addMemberToOrganization = async (payload, context) => {
  const { role, orgId, userId } = payload;

  const adminMembership = await K_Membership.findOne({
    where: {
      userId: context.user.id,
      organizationId: orgId,
      role: { [Sequelize.Op.iLike]: "admin" },
    },
    raw: true,
  });

  if (!adminMembership) {
    throw new Error("Tour not a Admin to add members.");
  }

  const organization = await K_Organization.findByPk(orgId, { raw: true });
  if (!organization) {
    throw new Error("organization not found");
  }

  // 4. Check if the user to be added exists
  const userToAdd = await K_User.findByPk(userId, { raw: true });
  if (!userToAdd) {
    throw new Error("User not found");
  }

  const membershipInstance = await K_Membership.create({
    userId: userId,
    organizationId: orgId,
    role,
  });

  const membership = membershipInstance.get({ plain: true });

  const data = {
    membership,
    userToAdd,
    organization,
  };

  return data;
};

module.exports = {
  addMemberToOrganization,
};
