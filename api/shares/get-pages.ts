import { trace } from "@opentelemetry/api";

import { prisma } from "@/lib/prisma";

export async function getAllSavedPages() {
  return await trace
    .getTracer("html-generator")
    .startActiveSpan("getAllSavedPages", async (span) => {
      let pages = [];
      try {
        pages = await prisma.page.findMany({
          orderBy: { createdAt: "desc" },
        });
      } finally {
        span.end();
      }

      return pages;
    });
}
