import { configure } from "@storybook/react";

import "../assets/css/main.css";
import "../assets/bootstrap400/css/bootstrap-grid.css";
import "../assets/bootstrap400/css/bootstrap.css";
import "../assets/bootstrap400/css/bootstrap-reboot.css";
import "../assets/fonts/fonts.googleapis.com/style.css";

// automatically import all files ending in *.stories.js
configure(require.context("../test/stories", true, /\.stories\.js$/), module);
