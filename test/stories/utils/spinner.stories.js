import React from "react";
import { Spinner } from "AppSrc/utils/entities";

export default {
  title: "Spinner"
};

export const withTitle = () => {
  return <Spinner title="Loading some data" />;
};

export const withExplanation = () => {
  return <Spinner explanation="Loading some data" />;
};

export const withTitleAndExplanation = () => {
  return <Spinner title="Loading some data" explanation="This may take a while" />;
};

export const withExplanationAndTimeout = () => {
  return <Spinner explanation="Loading some data" timedOutComment="I timed out" />;
};
