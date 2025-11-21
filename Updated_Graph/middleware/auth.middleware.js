const { ForbiddenError, AuthenticationError } = require("apollo-server");

const authentication = (parent, args, context, info, next) => {
  if (!context.user) {
    throw new AuthenticationError("Authentication required");
  }
  return next();
};

const authorize = (requiredRole) => {
  return async (parent, args, context, info, next) => {
    if (context.user.role !== requiredRole) {
      throw new ForbiddenError("You are not allowed");
    }
    return next();
  };
};

module.exports = { authorize, authentication };
