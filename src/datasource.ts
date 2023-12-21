export class ConfigBb {
  private name: string;

  init(name: string) {
    this.name = name;
  }

  test() {
    console.log('test', process.env.PG_USER);
    return 123;
  }
}

new ConfigBb().test();
