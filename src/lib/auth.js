import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { Resend } from "resend";

const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URL);
const db = client.db("better-auth-practice-2");

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "verify email",
        html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #333;">

    <p>Hi ${user.name},</p>

    <p>Welcome to JihanDev! 🎉</p>

    <p>
      We're excited to have you join our community.
    </p>

    <p>
      To complete your registration and activate your account,
      please verify your email address by clicking the button below.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a
        href="${url}"
        style="
          display: inline-block;
          background-color: #f97316;
          color: #ffffff;
          text-decoration: none;
          padding: 14px 28px;
          border-radius: 8px;
          font-weight: bold;
        "
      >
        Verify My Email
      </a>
    </div>

    <p>
      This verification link is valid for a limited time.
      If you didn't create a JihanDev account, you can safely ignore this email.
    </p>

    <p>Thank you for choosing JihanDev!</p>

    <p>Happy Shopping! 🛍️</p>

    <p>
      The JihanDev Team<br />
      Your Shopping, Made Easier.
    </p>

  </div>
`,
      });
    },
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    expiresIn: 60,
  },

  database: mongodbAdapter(db, {
    client,
  }),
});
