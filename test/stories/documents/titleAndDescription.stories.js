import React from "react";
import { TitleAndDescription } from "../../../src/documents/titleAndDescription";
import Im from "traec/immutable";
import { Card } from "../decorators";

export default {
  title: "Title and Description",
  decorators: [storyFn => Card(storyFn)]
};

export const withTitle = () => {
  let description = Im.Map({ title: "I'm a Test Document", text: null });
  return (
    <TitleAndDescription cref={"74cb4d17-f957-42f9-86bb-acacb1a31b60"} documents={null} description={description} />
  );
};

export const withTitleAndText = () => {
  let description = Im.Map({ title: "I'm a Test Document", text: "I have a description" });
  return <TitleAndDescription cref={"1"} documents={null} description={description} />;
};
