import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { date, z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();
    const decodedUser = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUser });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "user not found",
        },
        { status: 500 },
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotexpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeNotexpired && isCodeValid) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: false,
          message: "Account verified successfully",
        },
        { status: 200 },
      );
    } else if (!isCodeNotexpired) {
      return Response.json(
        {
          success: false,
          message:
            "verification code expired, please sign up again for a new code",
        },
        { status: 400 },
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "invalid verification code",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error verifying user", error);
    return Response.json(
      {
        success: false,
        message: "error verifying user",
      },
      { status: 500 },
    );
  }
}
