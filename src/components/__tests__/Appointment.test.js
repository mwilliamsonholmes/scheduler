import React from "react";

import { render } from "@testing-library/react";

// import Application from "components/Application";
import Appointment from "components/Appointment/index.js"

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  })
});

