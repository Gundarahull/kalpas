// GraphQL middleware runner (Express-style)
function runMiddleware(middlewares, resolver) {

  return async (parent, args, context, info) => {
    let index = -1;

    async function dispatch(i) {
      if (i <= index) throw new Error("next() called multiple times");
      index = i;

      // reached the resolver → run the final function
      if (i === middlewares.length) {
        return resolver(parent, args, context, info);
      }

      const mw = middlewares[i];
      // middleware signature: (parent, args, context, info, next)
      return mw(parent, args, context, info, () => dispatch(i + 1));
    }

    return dispatch(0);
  };
}

module.exports = { runMiddleware };

