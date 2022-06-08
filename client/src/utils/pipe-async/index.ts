export const pipeAsync =
  (...fns: ((param: any) => any)[]) =>
  (x: any) =>
    fns.reduce((chain, func) => chain.then(func), Promise.resolve(x));
