import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import {
  convertSubAndCodeToReduxData,
  generateVerificationCode,
  generateVerificationCodeEmail,
  initializeSupabaseClient,
  upserUserSubscriptionToDb,
  upsertVerifyCodeToDb,
} from "../../../utils";
import { SupabaseClient } from "@supabase/supabase-js";
import { CurrentUtilsIOSubscriptionData, CurrentUtilsIOVerifyCodeData } from "@redux/reducers/authSlice";

type VerificationCodeResponse = {
  message?: string,
  error?: any,
  userSubscription?: CurrentUtilsIOSubscriptionData,
  verificationCode?: CurrentUtilsIOVerifyCodeData,
}

const sendEmail = async (req: NextApiRequest, res: NextApiResponse<VerificationCodeResponse>) => {
  const {
    username,
    avatar,
    dob,
    country_of_residence,
    last_logged_in,
    created_at,
  } = req.body;
  try {
    const supabase = initializeSupabaseClient();
    // Create a transporter instance
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL_USER,
        pass: process.env.NODEMAILER_EMAIL_PASS,
      },
    });

    const code = generateVerificationCode();

    // Prepare the email message
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL_USER,
      to: username,
      subject: "Please verify your account.",
      html: generateVerificationCodeEmail(
        {
          username,
          avatar,
          dob,
          last_logged_in,
          created_at,
          country_of_residence,
        },
        code
      ),
    };

    // Send the email
    const result = await transporter.sendMail(mailOptions);

    const userSubscription = await upserUserSubscriptionToDb(supabase, {
      username,
      avatar,
      dob,
      country_of_residence,
      last_logged_in,
      created_at,
    });
    const verifyCodeData = await upsertVerifyCodeToDb(
      supabase,
      userSubscription?.id,
      code
    );
    const [userSubscriptionDataToReturn, verifyCodeDataToReturn] = await convertSubAndCodeToReduxData(userSubscription, verifyCodeData);
    
    // Respond with success message
    res
      .status(200)
      .json({
        message: "Email sent successfully.",
        userSubscription: userSubscriptionDataToReturn,
        verificationCode: verifyCodeDataToReturn,
      });
  } catch (error) {
    // Respond with error message
    res
      .status(500)
      .json({ error: "An error occurred while sending the email." });
  }
};

export default sendEmail;
