import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Check for secret to confirm this is a valid request
  if (
    request.nextUrl.searchParams.get("secret") !== process.env.REVALIDATE_SECRET
  ) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    // This should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    revalidatePath("/");
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
