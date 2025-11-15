import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * API route to revalidate blog posts cache
 * Call this endpoint (e.g., from Sanity webhook) when a blog post is published/updated
 * 
 * Example webhook URL: https://yourdomain.com/api/revalidate-blog?secret=YOUR_SECRET
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  // Verify secret to prevent unauthorized access
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    // Revalidate all blog posts cache
    revalidateTag("blog-posts");
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      message: "Blog posts cache revalidated successfully" 
    });
  } catch (err) {
    return NextResponse.json({ 
      message: "Error revalidating cache",
      error: err instanceof Error ? err.message : "Unknown error"
    }, { status: 500 });
  }
}

