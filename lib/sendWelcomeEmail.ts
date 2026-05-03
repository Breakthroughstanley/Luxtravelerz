import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const ICONS: Record<string, string> = {
  plane: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="white"/></svg>`,

  island: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 7c0 1.657-1.343 3-3 3S7 8.657 7 7s1.343-3 3-3 3 1.343 3 3z" fill="white"/><path d="M12.5 10.5C11.12 11.45 10 13.1 10 15H3c0-3.5 2.5-6.5 6-7.2" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M2 19h20M5 19c0-3 2-5.5 5-6.5M12 19c0-2 .8-4 2.5-5.5M16 19c0-1.5.5-3 1.5-4" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>`,

  globe: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="white" stroke-width="1.5"/><path d="M12 3c-2.4 2.4-3.5 5-3.5 9s1.1 6.6 3.5 9M12 3c2.4 2.4 3.5 5 3.5 9s-1.1 6.6-3.5 9M3 12h18" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>`,

  diamond: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3h12l4 6-10 12L2 9l4-6z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg>`,

  target: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="white" stroke-width="1.5"/><circle cx="12" cy="12" r="5" stroke="white" stroke-width="1.5"/><circle cx="12" cy="12" r="1" fill="white"/></svg>`,

  tag: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 2H7a2 2 0 0 0-2 2v5.5a1 1 0 0 0 .293.707l9 9a2 2 0 0 0 2.828 0l5.086-5.086a2 2 0 0 0 0-2.828l-9-9A1 1 0 0 0 12.5 2z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg>`,

  shield: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11 4.5-.85 8-5.75 8-11V6l-8-4z" stroke="white" stroke-width="1.5"/></svg>`,

  mail: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="20" height="16" rx="2" stroke="white" stroke-width="1.5"/><path d="M2 7l10 7 10-7" stroke="white" stroke-width="1.5"/></svg>`,

  instagram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="white" stroke-width="1.5"/><circle cx="12" cy="12" r="4" stroke="white" stroke-width="1.5"/></svg>`,

  twitter: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 18c6 2 12-2 12-8 0-1 2-3 3-4-1 0-3 1-4 1-1-2-4-2-5 0-2-1-4-2-6-1 0 6 3 10 10 12" stroke="white" stroke-width="1.5"/></svg>`,

  linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" stroke="white" stroke-width="1.5"/><path d="M7 10v7M12 10v7M17 10v7" stroke="white" stroke-width="1.5"/></svg>`,

  star: `<svg width="12" height="12" viewBox="0 0 24 24" fill="#6c47ff"><path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"/></svg>`,
};

export const sendWelcomeEmail = async (
  email: string,
  token: string,
  name?: string
) => {
const verifyLink = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
  const siteUrl = process.env.NEXTAUTH_URL;
  const logoUrl = `${siteUrl}/logo1.png`;

  const html = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
<title>Welcome to LuxTravelerz</title>

<style>
  body {
    margin: 0;
    padding: 0;
    background-color: #f3efff;
    font-family: Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  td {
    padding: 0;
  }

  img {
    border: 0;
    display: block;
    line-height: 100%;
  }

  a {
    text-decoration: none;
  }

  .wrapper {
    width: 100%;
    table-layout: fixed;
    background-color: #f3efff;
    padding: 30px 0;
  }

  .main {
    width: 100%;
    max-width: 640px;
    background-color: #ffffff;
    margin: 0 auto;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(108,71,255,0.12);
  }

  .hero {
    background: linear-gradient(145deg, #0f0824 0%, #24104f 55%, #6c47ff 100%);
    padding: 60px 40px 50px;
    text-align: center;
  }

  .badge {
    display: inline-block;
    padding: 10px 18px;
    border-radius: 999px;
    background: rgba(255,255,255,0.10);
    border: 1px solid rgba(255,255,255,0.15);
    color: #d8cfff;
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-top: 8px;
  }

  .headline {
    color: #ffffff;
    font-size: 42px;
    line-height: 48px;
    font-weight: bold;
    margin-top: 34px;
    letter-spacing: -1px;
  }

  .headline span {
    color: #ffd166;
  }

  .subheadline {
    color: rgba(255,255,255,0.78);
    font-size: 16px;
    line-height: 28px;
    max-width: 460px;
    margin: 22px auto 0;
  }

  .content {
    padding: 42px 40px;
  }

  .verify-box {
    background: linear-gradient(135deg, #6c47ff 0%, #8b5cf6 100%);
    border-radius: 24px;
    padding: 40px 30px;
    text-align: center;
  }

  .verify-title {
    color: #ffffff;
    font-size: 28px;
    font-weight: bold;
    margin-top: 24px;
  }

  .verify-text {
    color: rgba(255,255,255,0.85);
    font-size: 15px;
    line-height: 28px;
    max-width: 420px;
    margin: 18px auto 32px;
  }

  .button {
    display: inline-block;
    background: #ffffff;
    color: #6c47ff;
    font-size: 15px;
    font-weight: bold;
    padding: 18px 34px;
    border-radius: 14px;
  }

  .fallback {
    margin-top: 20px;
    color: rgba(255,255,255,0.6);
    font-size: 12px;
    line-height: 20px;
    word-break: break-word;
  }

  .fallback a {
    color: rgba(255,255,255,0.82);
  }

  .section-title {
    font-size: 26px;
    font-weight: bold;
    color: #1b1238;
    margin: 46px 0 26px;
    letter-spacing: -0.5px;
  }

  .feature-card {
    background: #faf8ff;
    border: 1px solid #eee7ff;
    border-radius: 20px;
    padding: 26px;
  }

  .feature-title {
    font-size: 18px;
    font-weight: bold;
    color: #1b1238;
    margin-top: 18px;
  }

  .feature-text {
    font-size: 14px;
    line-height: 24px;
    color: #6b7280;
    margin-top: 10px;
  }

  .benefit-box {
    background: #faf8ff;
    border-radius: 24px;
    border: 1px solid #eee7ff;
    padding: 10px 26px;
    margin-top: 14px;
  }

  .benefit-item {
    padding: 22px 0;
    border-bottom: 1px solid #eee7ff;
  }

  .benefit-item:last-child {
    border-bottom: none;
  }

  .benefit-title {
    font-size: 16px;
    font-weight: bold;
    color: #1b1238;
    margin-bottom: 6px;
  }

  .benefit-text {
    font-size: 14px;
    line-height: 24px;
    color: #6b7280;
  }

  .stats {
    margin-top: 42px;
    border-top: 1px solid #eee7ff;
    border-bottom: 1px solid #eee7ff;
    padding: 28px 0;
  }

  .stat-number {
    color: #6c47ff;
    font-size: 34px;
    font-weight: bold;
  }

  .stat-label {
    margin-top: 6px;
    color: #8b8b9c;
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .cta {
    background: linear-gradient(145deg, #faf8ff, #f5f1ff);
    border: 1px solid #eee7ff;
    border-radius: 24px;
    padding: 40px 32px;
    text-align: center;
    margin-top: 44px;
  }

  .cta-title {
    font-size: 28px;
    font-weight: bold;
    color: #1b1238;
  }

  .cta-text {
    font-size: 15px;
    line-height: 28px;
    color: #6b7280;
    max-width: 420px;
    margin: 16px auto 30px;
  }

  .cta-button {
    display: inline-block;
    background: linear-gradient(135deg, #6c47ff, #8b5cf6);
    color: #ffffff;
    padding: 18px 36px;
    border-radius: 14px;
    font-size: 15px;
    font-weight: bold;
  }

  .footer {
    background: #120924;
    padding: 50px 30px;
    text-align: center;
  }

  .footer-text {
    color: rgba(255,255,255,0.58);
    font-size: 13px;
    line-height: 24px;
    margin-top: 20px;
  }

  .footer-link {
    color: #b79cff;
  }

  .social-space {
    padding: 0 7px;
  }

  .social-circle {
    width: 44px;
    height: 44px;
    background: rgba(255,255,255,0.08);
    border-radius: 50%;
  }

  .unsubscribe {
    margin-top: 28px;
    font-size: 11px;
    color: rgba(255,255,255,0.35);
    line-height: 22px;
  }

  .unsubscribe a {
    color: rgba(255,255,255,0.58);
  }

  @media screen and (max-width: 640px) {
    .wrapper {
      padding: 12px 0;
    }

    .main {
      border-radius: 0;
    }

    .hero {
      padding: 48px 24px 42px;
    }

    .headline {
      font-size: 34px;
      line-height: 40px;
    }

    .subheadline {
      font-size: 15px;
      line-height: 26px;
    }

    .content {
      padding: 28px 22px;
    }

    .verify-box {
      padding: 34px 22px;
    }

    .section-title {
      font-size: 24px;
    }

    .mobile-block {
      display: block !important;
      width: 100% !important;
    }

    .mobile-spacing {
      height: 14px !important;
    }

    .stats td {
      display: block;
      width: 100%;
      padding: 14px 0;
      border: none !important;
    }

    .cta {
      padding: 34px 22px;
    }

    .footer {
      padding: 42px 22px;
    }
  }
</style>
</head>

<body>
<center class="wrapper">
  <table class="main" width="100%" role="presentation">

    <!-- HERO -->
    <tr>
      <td class="hero">

        <img
          src="https://luxtravelerz.netlify.app/logo1.png"
          alt="LuxTravelerz"
          width="170"
          style="margin:0 auto;"
        />

        <div class="badge">
          PREMIUM LUXURY TRAVEL PLATFORM
        </div>

        <div class="headline">
          Welcome to <span>LuxTravelerz</span>,<br />
          ${name ? name : "Traveler"}
        </div>

        <div class="subheadline">
          Your gateway to unforgettable destinations, curated luxury stays, premium flights, and world‑class travel experiences.
        </div>
      </td>
    </tr>

    <!-- CONTENT -->
    <tr>
      <td class="content">

        <!-- VERIFY -->
        <table width="100%" role="presentation">
          <tr>
            <td class="verify-box">

              <img
                src="https://luxtravelerz.netlify.app/email-icons/mail.png"
                width="64"
                alt="Verify"
                style="margin:0 auto;"
              />

              <div class="verify-title">
                Verify Your Email
              </div>

              <div class="verify-text">
                Confirm your email address to unlock exclusive flight deals, premium travel experiences, and personalized recommendations tailored just for you.
              </div>

              <a href="${verifyLink}" class="button">
                Verify Email Address
              </a>

              <div class="fallback">
                If the button doesn't work, copy and paste this link into your browser:<br /><br />
                <a href="${verifyLink}">${verifyLink}</a>
              </div>

            </td>
          </tr>
        </table>

        <!-- FEATURES -->
        <div class="section-title">
          What awaits you
        </div>

        <table width="100%" role="presentation">
          <tr>

            <td width="50%" class="mobile-block">
              <div class="feature-card">
                <img src="https://luxtravelerz.netlify.app/email-icons/plane.png" width="42" alt="Flights" />

                <div class="feature-title">
                  Instant Flight Bookings
                </div>

                <div class="feature-text">
                  Discover and reserve premium flights in seconds with a seamless booking experience.
                </div>
              </div>
            </td>

            <td width="14" class="mobile-spacing"></td>

            <td width="50%" class="mobile-block">
              <div class="feature-card">
                <img src="https://luxtravelerz.netlify.app/email-icons/island.png" width="42" alt="Luxury" />

                <div class="feature-title">
                  Curated Luxury Escapes
                </div>

                <div class="feature-text">
                  Access handpicked stays, luxury resorts, and unforgettable travel experiences.
                </div>
              </div>
            </td>

          </tr>
        </table>

        <!-- BENEFITS -->
        <div class="section-title">
          Why travelers love LuxTravelerz
        </div>

        <div class="benefit-box">

          <div class="benefit-item">
            <div class="benefit-title">
              Personalized Recommendations
            </div>

            <div class="benefit-text">
              Smart travel suggestions and tailored itineraries designed around your interests.
            </div>
          </div>

          <div class="benefit-item">
            <div class="benefit-title">
              Exclusive Luxury Deals
            </div>

            <div class="benefit-text">
              Unlock premium rates and member-only experiences around the world.
            </div>
          </div>

          <div class="benefit-item">
            <div class="benefit-title">
              Secure & Trusted Platform
            </div>

            <div class="benefit-text">
              Your bookings and payments are protected with enterprise-grade security.
            </div>
          </div>

        </div>

        <!-- STATS -->
        <table width="100%" class="stats" role="presentation">
          <tr>

            <td align="center">
              <div class="stat-number">150+</div>
              <div class="stat-label">DESTINATIONS</div>
            </td>

            <td align="center" style="border-left:1px solid #eee7ff;border-right:1px solid #eee7ff;">
              <div class="stat-number">24/7</div>
              <div class="stat-label">SUPPORT</div>
            </td>

            <td align="center">
              <div class="stat-number">50K+</div>
              <div class="stat-label">TRAVELERS</div>
            </td>

          </tr>
        </table>

        <!-- CTA -->
        <div class="cta">

          <div class="cta-title">
            Your next adventure starts here
          </div>

          <div class="cta-text">
            Explore premium destinations, luxury stays, curated itineraries, and unforgettable travel experiences once your account is verified.
          </div>

          <a href="${siteUrl}" class="cta-button">
            Explore LuxTravelerz
          </a>

        </div>

      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td class="footer">

        <img
          src="https://luxtravelerz.netlify.app/logo1.png"
          width="150"
          alt="LuxTravelerz"
          style="margin:0 auto;"
        />

        <div class="footer-text">
          Thank you for joining LuxTravelerz.<br />
          We're excited to be part of your next journey.<br /><br />

          Contact us at
          <a href="mailto:support@luxtravelerz.com" class="footer-link">
            support@luxtravelerz.com
          </a>
        </div>

        <!-- SOCIALS -->
        <table align="center" role="presentation">
          <tr>

            <td class="social-space">
              <a href="#">
                <img
                  src="https://luxtravelerz.netlify.app/email-icons/instagram.png"
                  width="44"
                  alt="Instagram"
                  class="social-circle"
                />
              </a>
            </td>

            <td class="social-space">
              <a href="#">
                <img
                  src="https://luxtravelerz.netlify.app/email-icons/twitter.png"
                  width="44"
                  alt="Twitter"
                  class="social-circle"
                />
              </a>
            </td>

            <td class="social-space">
              <a href="#">
                <img
                  src="https://luxtravelerz.netlify.app/email-icons/linkedin.png"
                  width="44"
                  alt="LinkedIn"
                  class="social-circle"
                />
              </a>
            </td>

          </tr>
        </table>

        <div class="unsubscribe">
          You received this email because you signed up for LuxTravelerz.<br />
          <a href="${siteUrl}/unsubscribe">Unsubscribe</a>
          &nbsp;&nbsp;•&nbsp;&nbsp;
          <a href="${siteUrl}/privacy">Privacy Policy</a>
        </div>

      </td>
    </tr>

  </table>
</center>
</body>
</html>

`;

  await resend.emails.send({
    from: "LuxTravelerz <noreply@luxtravelerz.com>",
    to: email,
    subject: "Welcome to LuxTravelerz — Verify Your Email",
    html,
  });
};