import { ImageResponse } from "next/og";
import React from "react";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div tw="flex items-center justify-center w-full h-full">
        <h1 className="rr">hii</h1>
      </div>
    ),
    { width: 1200, height: 600 }
  );
}
