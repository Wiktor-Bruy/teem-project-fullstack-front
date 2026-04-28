import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/update/avatar`,
      {
        method: "PUT",
        body: formData,
        headers: {

          Authorization: req.headers.get("authorization") || "",
        },
      }
    );

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update avatar" },
      { status: 500 }
    );
  }
}