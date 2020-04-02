import React from "react";
import { render } from "@testing-library/react";
import Index from "../pages/index";

test("renders CARES Act link", () => {
  const { getByText } = render(<Index />);
  const linkElement = getByText("CARES Act");
  expect(linkElement).toBeInTheDocument();
});
