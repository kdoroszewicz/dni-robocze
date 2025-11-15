import { expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "../app/page";
// user event from @testing-library/user-event
import userEvent from "@testing-library/user-event";

describe("Main page", () => {
  it("should render the heading", () => {
    const currentYear = new Date().getFullYear();

    render(<Page />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: `Kalkulator Dni Roboczych ${currentYear}`,
    });
    expect(heading).toBeInTheDocument();
  });

  it("should fill the form and calculate the number of work days", async () => {
    const user = userEvent.setup();
    render(<Page />);

    const startDateInput = screen.getByLabelText("Od kiedy");
    const endDateInput = screen.getByLabelText("Do kiedy");
    await user.clear(startDateInput);
    await user.type(startDateInput, "2025-01-01");
    await user.type(endDateInput, "2025-01-31");
    await user.keyboard("{tab}");
    const workDaysInput = screen.getByLabelText("Dni robocze");
    expect(workDaysInput).toHaveValue("21");
  });
});
