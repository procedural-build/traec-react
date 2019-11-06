import React from "react";
import { getColorFromCategory, getDataCategories } from "AppSrc/charts/disciplineSummary";
import Im from "traec/immutable";

describe("getColorFromCategory", () => {
  it("should return green", () => {
    let category = "OK for Submission";
    let result = getColorFromCategory(category);
    let expectedResult = "#99EB99";
    expect(result).toEqual(expectedResult);
  });

  it("should return gray", () => {
    let category = "Not a category";
    let result = getColorFromCategory(category);
    let expectedResult = "#8c8c8c";
    expect(result).toEqual(expectedResult);
  });
});

describe("getDataCategories", () => {
  let data = Im.fromJS([
    {
      name: "Acoustic Consultant",
      "Nothing Received": 4000,
      Overdue: 2400,
      "Pending Review": 2400,
      "Requires Revision": 20,
      "OK for Submission": 20
    }
  ]);

  it("should correct list", () => {
    let result = getDataCategories(data);
    let expectedResult = ["OK for Submission", "Nothing Received", "Overdue", "Pending Review", "Requires Revision"];
    expect(result).toEqual(expectedResult);
  });

  it("should add key from second object", () => {
    data = data.push(
      Im.Map({
        name: "Air Quality Consultant",
        "Nothing Received": 4000,
        Overdue: 2400,
        "Pending Review": 2400,
        "Requires Revision": 20,
        "OK for Submission": 20,
        "Pending Approval": 10
      })
    );

    let result = getDataCategories(data);
    let expectedResult = [
      "Pending Approval",
      "Nothing Received",
      "Overdue",
      "Pending Review",
      "Requires Revision",
      "OK for Submission"
    ];
    expect(result).toEqual(expectedResult);
  });
});
