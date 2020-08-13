export {};

declare const global: {
  [x: string]: unknown;
};

global.hello = () => {
  return () => Logger.log('Hello!!');
};
