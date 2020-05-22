import { getRecaptchaSiteKey } from "AppSrc/auth/registration/form";

describe("getRecaptchaSiteKey", () => {
  beforeEach(() => {
    delete global.window.location;
    global.window = Object.create(window);
  });
  it("should a proper sitekey", () => {
    global.window.location = {
      hostname: "compute.procedural.build"
    };
    let site = "https://compute.procedural.build";
    const result = getRecaptchaSiteKey();
    expect(result).toEqual("6LcpY-MUAAAAAGsdHWQsRy7VJN1iydQD95e1RRnA");
  });

  it("should not return a site key", () => {
    global.window.location = {
      hostname: "198.168.2.3"
    };
    const result = getRecaptchaSiteKey();
    expect(result).toEqual("localsite");
  });

  it("should not work on false ip", () => {
    global.window.location = {
      hostname: "195658.168.25278.3"
    };
    const result = getRecaptchaSiteKey();
    expect(result).toEqual("6LcbH3wUAAAAANJthLG_viHtCcXrDnXJ_kzH8Nga");
  });
});
