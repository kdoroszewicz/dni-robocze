import { addBusinessDays } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { addWorkDays, getWorkDays } from "@/lib/server/workDays";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      dateStart?: string;
      dateEnd?: string;
      workDays?: number;
    };
    const { dateStart, dateEnd, workDays } = body;

    // Validate that exactly 2 out of 3 fields are provided
    const providedFields = [
      dateStart !== undefined && dateStart !== null,
      dateEnd !== undefined && dateEnd !== null,
      workDays !== undefined && workDays !== null,
    ].filter(Boolean).length;

    if (providedFields !== 2) {
      return NextResponse.json(
        {
          error:
            "Exactly two fields must be provided: dateStart, dateEnd, or workDays",
        },
        { status: 400 },
      );
    }

    let resultDateStart: Date | undefined;
    let resultDateEnd: Date | undefined;
    let resultWorkDays: number | undefined;

    // Parse dates if provided
    const parsedDateStart = dateStart ? new Date(dateStart) : undefined;
    const parsedDateEnd = dateEnd ? new Date(dateEnd) : undefined;
    const parsedWorkDays = workDays !== undefined && workDays !== null
      ? Number.parseInt(String(workDays), 10)
      : undefined;

    // Validate parsed values
    if (parsedDateStart && isNaN(parsedDateStart.getTime())) {
      return NextResponse.json(
        { error: "Invalid dateStart format" },
        { status: 400 },
      );
    }
    if (parsedDateEnd && isNaN(parsedDateEnd.getTime())) {
      return NextResponse.json(
        { error: "Invalid dateEnd format" },
        { status: 400 },
      );
    }
    if (
      parsedWorkDays !== undefined &&
      (isNaN(parsedWorkDays) || parsedWorkDays < 0)
    ) {
      return NextResponse.json(
        { error: "Invalid workDays value" },
        { status: 400 },
      );
    }

    // Calculate the missing field
    if (parsedDateStart && parsedDateEnd) {
      // Calculate workDays from dateStart and dateEnd
      resultWorkDays = getWorkDays(parsedDateEnd, parsedDateStart);
      resultDateStart = parsedDateStart;
      resultDateEnd = parsedDateEnd;
    } else if (parsedDateStart && parsedWorkDays !== undefined) {
      // Calculate dateEnd from dateStart and workDays
      resultDateStart = parsedDateStart;
      resultWorkDays = parsedWorkDays;
      resultDateEnd = addWorkDays(parsedDateStart, parsedWorkDays);
    } else if (parsedDateEnd && parsedWorkDays !== undefined) {
      // Calculate dateStart from dateEnd and workDays
      // We need to work backwards: find dateStart such that
      // getWorkDays(dateEnd, dateStart) = workDays
      resultDateEnd = parsedDateEnd;
      resultWorkDays = parsedWorkDays;

      // Use iterative approach: start with an approximation and refine
      let candidateStart = addBusinessDays(parsedDateEnd, -parsedWorkDays);
      let calculatedWorkDays = getWorkDays(parsedDateEnd, candidateStart);

      // Adjust iteratively until we get the exact number of work days
      let attempts = 0;
      while (calculatedWorkDays !== parsedWorkDays && attempts < 50) {
        const diff = parsedWorkDays - calculatedWorkDays;
        // Use addWorkDays for more accurate adjustment, but in reverse
        // Since addWorkDays only works forward, we'll use addBusinessDays for fine-tuning
        if (Math.abs(diff) > 5) {
          // Large difference: use business days approximation
          candidateStart = addBusinessDays(candidateStart, -diff);
        } else {
          // Small difference: fine-tune day by day
          candidateStart = addBusinessDays(candidateStart, diff > 0 ? -1 : 1);
        }
        calculatedWorkDays = getWorkDays(parsedDateEnd, candidateStart);
        attempts++;
      }

      resultDateStart = candidateStart;
    }

    return NextResponse.json({
      dateStart: resultDateStart?.toISOString(),
      dateEnd: resultDateEnd?.toISOString(),
      workDays: resultWorkDays,
    });
  } catch (error) {
    console.error("Calculation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
