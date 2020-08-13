export class logger {
  static info = (ormatOrObject: string | object) => {
    console.info(ormatOrObject);
  };

  static warn = (ormatOrObject: string | object) => {
    console.warn(ormatOrObject);
  };

  static error = (ormatOrObject: string | object) => {
    console.error(ormatOrObject);
  };
}
