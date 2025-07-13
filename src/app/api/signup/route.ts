// app/api/signup/route.ts

import { NextResponse } from "next/server";
import connectMongo from "@/utils/db";
import User from "@/models/Users";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, termsAccepted } = await req.json();

    await connectMongo();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already in use." }, { status: 400 });
    }

    const newUser = new User({ firstName, lastName, email, password, termsAccepted });
    await newUser.save();

    return NextResponse.json({ message: "User created successfully." }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
