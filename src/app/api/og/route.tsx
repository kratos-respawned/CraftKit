import { ImageResponse } from "next/og";
import React from "react";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(<></>, { width: 1200, height: 600 });
}
