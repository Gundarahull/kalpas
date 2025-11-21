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

// secured() -> dispatch(0) -> middleware1.pre
//                |
//                -> middleware1 awaits next -> dispatch(1) -> middleware2.pre
//                    |
//                    -> middleware2 awaits next -> dispatch(2) -> middleware3.pre
//                        |
//                        -> middleware3 awaits next -> dispatch(3) -> resolver runs
//                        <- middleware3 post
//                    <- middleware2 post
//                <- middleware1 post
// return final result


module.exports = { runMiddleware };

