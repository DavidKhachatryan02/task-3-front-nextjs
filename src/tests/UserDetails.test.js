import React from "react";
import { render } from "@testing-library/react";
import UserDetails from "../app/_components/UserDetails";

const mockUserData = {
  startDate: "2023-01-01",
  dateOfBirth: "1990-01-01",
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  personalEmail: "personal@example.com",
  mobilePhone: "1234567890",
  absences: 5,
  isCoreTeamMember: true,
};

describe("UserDetails", () => {
  it("should render the component with user data", () => {
    const { getByText, getByLabelText } = render(
      <UserDetails data={mockUserData} />
    );

    expect(getByText("General Info")).toBeInTheDocument();
    expect(getByLabelText("First Name")).toHaveValue("John");
    expect(getByLabelText("Last Name")).toHaveValue("Doe");
    expect(getByLabelText("Email")).toHaveValue("johndoe@example.com");
    expect(getByLabelText("Personal Email")).toHaveValue(
      "personal@example.com"
    );
    expect(getByLabelText("Absences")).toHaveValue(5);
    expect(getByText("Core Team Member")).toBeInTheDocument();
  });
});
