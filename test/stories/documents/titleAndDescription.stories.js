import React from "react";
import { TitleAndDescription } from "../../../src/documents/titleAndDescription";
import Im from "traec/immutable";
import { Card } from "../decorators";
import { action } from "@storybook/addon-actions";

export default {
  title: "Title and Description",
  decorators: [storyFn => Card(storyFn)]
};

export const withTitle = () => {
  let description = Im.Map({ title: "I'm a Test Document", text: null });
  return <TitleAndDescription description={description} />;
};

export const withTitleAndText = () => {
  let description = Im.Map({ title: "I'm a Test Document", text: "I have a description" });
  return <TitleAndDescription description={description} />;
};
