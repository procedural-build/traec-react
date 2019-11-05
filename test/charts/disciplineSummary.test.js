import React from "react";
import { getColorFromCategory } from "AppSrc/charts/disciplineSummary";

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
