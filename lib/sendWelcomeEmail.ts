import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (email: string, name?: string) => {
  await resend.emails.send({
    from: "LuxTravelerz <onboarding@resend.dev>",
    to: email,
    subject: "Welcome to LuxTravelerz ✈️",
    html: `
      <div style="font-family:sans-serif">
        <h1>Welcome ${name || "Traveler"} 👋</h1>
        <p>Start booking luxury flights and hotels now.</p>
      </div>
    `,
  });
};