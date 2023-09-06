import { render } from "@testing-library/react";
import UserAccounts from "../app/_components/UserAccounts";

const mockUserData = {
  gitHubUserName: "githubuser",
  slackUserName: "slackuser",
};

describe("UserAccounts", () => {
  it("should render the component with user account data", () => {
    const { getByText, getByLabelText } = render(
      <UserAccounts data={mockUserData} />
    );

    expect(getByText("My accounts")).toBeInTheDocument();
    expect(getByLabelText("Slack")).toHaveValue("slackuser");
    expect(getByLabelText("GitHub")).toHaveValue("githubuser");
  });

});
