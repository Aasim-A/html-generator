import { trace } from "@opentelemetry/api";

import { prisma } from "@/lib/prisma";

export async function getAllSavedPages() {
  return await trace
    .getTracer("html-generator")
    .startActiveSpan("getAllSavedPages", async (span) => {
      try {
        const pages = await prisma.page.findMany({
          orderBy: { createdAt: "desc" },
        });
        return pages;
      } finally {
        span.end();
      }
    });
}
