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

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
  <title>Welcome to LuxTravelerz</title>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { font-family: 'Georgia', 'Times New Roman', serif; background-color: #f4f0ff; color: #1a1035; line-height: 1.6; }

    .wrapper { background-color: #f4f0ff; padding: 40px 20px; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 28px; overflow: hidden; box-shadow: 0 24px 80px rgba(108,71,255,0.14), 0 0 0 1px rgba(108,71,255,0.06); }

    /* Header */
    .header-bg { background: linear-gradient(160deg, #0f0824 0%, #1a0d3d 60%, #2d1160 100%); padding: 52px 48px 0; text-align: center; position: relative; overflow: hidden; }
    .header-glow { position: absolute; top: -80px; left: 50%; transform: translateX(-50%); width: 500px; height: 300px; background: radial-gradient(ellipse, rgba(108,71,255,0.35) 0%, transparent 70%); pointer-events: none; }
    .header-dots { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 28px 28px; pointer-events: none; }

    .logo-wrap { margin-bottom: 12px; position: relative; z-index: 1; }
    .logo-img { height: 114px; width: 115px; }

    .badge-wrap { margin-bottom: 28px; position: relative; z-index: 1; }
    .badge { display: inline-block; background: rgba(108,71,255,0.2); border: 1px solid rgba(155,114,255,0.4); color: #c4b5fd; padding: 8px 20px; border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; font-family: 'Helvetica Neue', Arial, sans-serif; }

    .headline { font-size: 40px; font-weight: 700; line-height: 1.12; color: #ffffff; margin-bottom: 20px; letter-spacing: -0.03em; position: relative; z-index: 1; }
    .headline-gradient { background: linear-gradient(90deg, #c4b5fd, #ffd166, #9b72ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .subheadline { font-size: 16px; line-height: 1.75; color: rgba(255,255,255,0.6); max-width: 420px; margin: 0 auto 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-weight: 400; position: relative; z-index: 1; }

    /* Scallop divider */
    .scallop { display: block; height: 32px; background: linear-gradient(160deg, #0f0824 0%, #2d1160 100%); position: relative; }
    .scallop-inner { display: block; height: 32px; background: #ffffff; border-radius: 28px 28px 0 0; }

    /* Verify */
    .verify-wrap { padding: 0 48px 44px; }
    .verify-card { background: linear-gradient(135deg, #6c47ff 0%, #8b5cf6 50%, #7c3aed 100%); border-radius: 24px; padding: 44px 40px; text-align: center; position: relative; overflow: hidden; }
    .verify-card-shine { position: absolute; top: -40%; left: -20%; width: 60%; height: 160%; background: linear-gradient(105deg, rgba(255,255,255,0.12) 0%, transparent 60%); transform: rotate(-5deg); pointer-events: none; }
    .verify-card-dots { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px); background-size: 20px 20px; pointer-events: none; }

    .verify-icon-wrap { width: 72px; height: 72px; background: rgba(255,255,255,0.15); border: 1.5px solid rgba(255,255,255,0.25); border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; position: relative; z-index: 1; }
    .verify-title { font-size: 26px; font-weight: 700; color: #ffffff; margin-bottom: 14px; letter-spacing: -0.02em; position: relative; z-index: 1; }
    .verify-body { font-size: 15px; line-height: 1.75; color: rgba(255,255,255,0.85); max-width: 380px; margin: 0 auto 32px; font-family: 'Helvetica Neue', Arial, sans-serif; position: relative; z-index: 1; }

    .verify-btn { display: inline-block; background: #ffffff; color: #6c47ff; text-decoration: none; padding: 17px 44px; border-radius: 14px; font-size: 15px; font-weight: 700; letter-spacing: -0.01em; font-family: 'Helvetica Neue', Arial, sans-serif; box-shadow: 0 8px 32px rgba(0,0,0,0.2); position: relative; z-index: 1; }
    .verify-link-fallback { margin-top: 18px; font-size: 12px; color: rgba(255,255,255,0.5); font-family: 'Helvetica Neue', Arial, sans-serif; position: relative; z-index: 1; }
    .verify-link-fallback a { color: rgba(255,255,255,0.7); word-break: break-all; }

    /* Section */
    .section { padding: 0 48px; }
    .section-title { font-size: 20px; font-weight: 700; color: #1a1035; margin-bottom: 22px; letter-spacing: -0.02em; }

    /* Feature grid */
    .features-table { width: 100%; border-collapse: separate; border-spacing: 12px; margin-bottom: 8px; }
    .feature-td { width: 50%; vertical-align: top; }
    .feature-card { background: linear-gradient(145deg, #fafaff, #f5f3ff); border: 1.5px solid #ede9fe; border-radius: 20px; padding: 26px 22px; }
    .feature-icon-cell { width: 48px; height: 48px; background: linear-gradient(135deg, #6c47ff, #9b72ff); border-radius: 14px; text-align: center; vertical-align: middle; }
    .feature-name { font-size: 15px; font-weight: 700; color: #1a1035; margin: 14px 0 6px; letter-spacing: -0.01em; }
    .feature-desc { font-size: 13px; line-height: 1.6; color: #6b7280; font-family: 'Helvetica Neue', Arial, sans-serif; }

    /* Benefits */
    .benefits-card { background: linear-gradient(145deg, #fafaff, #f5f3ff); border: 1.5px solid #ede9fe; border-radius: 22px; padding: 32px 30px; margin-bottom: 36px; }
    .benefit-row { margin-bottom: 22px; }
    .benefit-row:last-child { margin-bottom: 0; }
    .benefit-icon-cell { width: 42px; height: 42px; background: linear-gradient(135deg, #6c47ff, #9b72ff); border-radius: 13px; text-align: center; vertical-align: middle; }
    .benefit-name { font-size: 15px; font-weight: 700; color: #1a1035; margin-bottom: 3px; letter-spacing: -0.01em; }
    .benefit-desc { font-size: 13px; line-height: 1.6; color: #6b7280; font-family: 'Helvetica Neue', Arial, sans-serif; }

    /* Stats */
    .stats-row { border-top: 1.5px solid #ede9fe; border-bottom: 1.5px solid #ede9fe; padding: 32px 0; margin-bottom: 36px; }
    .stat-cell { text-align: center; }
    .stat-num { font-size: 34px; font-weight: 800; color: #6c47ff; letter-spacing: -0.03em; margin-bottom: 6px; }
    .stat-lbl { font-size: 11px; color: #9ca3af; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; font-family: 'Helvetica Neue', Arial, sans-serif; }

    /* CTA box */
    .cta-card { background: linear-gradient(145deg, #fafaff, #f5f3ff); border: 1.5px solid #ede9fe; border-radius: 22px; padding: 40px 36px; text-align: center; margin-bottom: 48px; }
    .cta-title { font-size: 22px; font-weight: 700; color: #1a1035; margin-bottom: 12px; letter-spacing: -0.02em; }
    .cta-body { font-size: 14px; line-height: 1.75; color: #6b7280; max-width: 380px; margin: 0 auto 28px; font-family: 'Helvetica Neue', Arial, sans-serif; }
    .cta-btn { display: inline-block; background: linear-gradient(135deg, #6c47ff, #9b72ff); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 14px; font-size: 15px; font-weight: 700; letter-spacing: -0.01em; font-family: 'Helvetica Neue', Arial, sans-serif; box-shadow: 0 6px 24px rgba(108,71,255,0.28); }

    /* Stripe divider */
    .stripe { height: 8px; background: linear-gradient(90deg, #6c47ff 0%, #9b72ff 25%, #ffd166 50%, #9b72ff 75%, #6c47ff 100%); }

    /* Footer */
    .footer { background: #0f0824; padding: 44px 48px; text-align: center; }
    .footer-logo { height: 36px; width: auto; margin-bottom: 20px; opacity: 0.9; }
    .footer-text { font-size: 13px; line-height: 1.8; color: rgba(255,255,255,0.4); margin-bottom: 28px; font-family: 'Helvetica Neue', Arial, sans-serif; }
    .footer-link { color: #9b72ff; text-decoration: none; }
    .social-btn { display: inline-block; width: 44px; height: 44px; background: rgba(108,71,255,0.25); border: 1px solid rgba(155,114,255,0.3); border-radius: 50%; text-align: center; text-decoration: none; vertical-align: middle; }
    .unsubscribe { font-size: 11px; color: rgba(255,255,255,0.2); margin-top: 24px; font-family: 'Helvetica Neue', Arial, sans-serif; }
    .unsubscribe a { color: rgba(255,255,255,0.35); text-decoration: underline; }

    @media only screen and (max-width: 600px) {
      .wrapper { padding: 16px 12px; }
      .header-bg { padding: 40px 28px 0; }
      .headline { font-size: 30px; }
      .verify-wrap { padding: 0 24px 36px; }
      .verify-card { padding: 36px 28px; }
      .section { padding: 0 28px; }
      .features-table { border-spacing: 8px; }
      .feature-td { display: block; width: 100%; }
      .footer { padding: 36px 28px; }
      .stats-row td { display: block; padding: 12px 0; }
    }
  </style>
</head>
<body>
<div class="wrapper">
<div class="container">

  <!-- ═══ HEADER ═══ -->
  <div class="header-bg">
    <div class="header-glow"></div>
    <div class="header-dots"></div>

    <div class="logo-wrap">
         <img src="https://luxtravelerz.netlify.app/logo1.png" alt="LuxTravelerz" width="250" height="192" style="margin-top:-9px;" />
    </div>

    <div class="badge-wrap">
      <span class="badge"><img src="https://luxtravelerz.netlify.app/email-icons/star.png" width="22" height="22" style="margin-top:9px;"/>&nbsp;&nbsp;Premium Travel Platform&nbsp;&nbsp;<img src="https://luxtravelerz.netlify.app/email-icons/star.png" width="22" height="22" style="margin-top:9px;" /></span>
    </div>

    <h1 class="headline">
      Welcome to<br>
      <span class="headline-gradient">LuxTravelerz</span>,<br>
      ${name ? name : "Traveler"}
    </h1>

    <p class="subheadline">
      Your exclusive gateway to unforgettable destinations,
      curated luxury experiences, and world-class travel planning.
    </p>

    <!-- Scallop: dark -> white -->
    <div class="scallop" style="margin-top:44px;">
      <div class="scallop-inner"></div>
    </div>
  </div>

  <!-- ═══ VERIFY ═══ -->
  <div class="verify-wrap" style="padding-top:36px;">
    <div class="verify-card">
      <div class="verify-card-shine"></div>
      <div class="verify-card-dots"></div>

      <!-- Mail icon via table for Outlook -->
      <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto 24px;position:relative;z-index:1;">
        <tr>
          <td width="72" height="72" align="center" valign="middle" style="background:rgba(255,255,255,0.15);border:1.5px solid rgba(255,255,255,0.25);border-radius:36px;">
      <img src="https://luxtravelerz.netlify.app/email-icons/mail.png" width="52" height="62" margin="50" />
          </td>
        </tr>
      </table>

      <h2 class="verify-title">One Last Step to Get Started</h2>
      <p class="verify-body">
        Verify your email to unlock full access to premium travel experiences,
        exclusive deals, and personalized itineraries crafted just for you.
      </p>

      <a href="${verifyLink}" class="verify-btn">Verify Your Email Address</a>

      <p class="verify-link-fallback">
        Button not working?<br>
        <a href="${verifyLink}">${verifyLink}</a>
      </p>
    </div>
  </div>

  <!-- ═══ FEATURES ═══ -->
  <div class="section" style="margin-bottom:36px;">
    <p class="section-title">What awaits you at LuxTravelerz</p>

    <table role="presentation" class="features-table" cellpadding="0" cellspacing="0">
      <tr>
        <td class="feature-td">
          <div class="feature-card">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td class="feature-icon-cell" width="48" height="48" style="border-radius:14px;">
                <img src="https://luxtravelerz.netlify.app/email-icons/plane.png" width="32" height="32" style="margin-top:14px;" />
                </td>
              </tr>
            </table>
            <p class="feature-name">Instant Bookings</p>
            <p class="feature-desc">Reserve flights, hotels, and experiences in seconds with one tap.</p>
          </div>
        </td>
        <td class="feature-td">
          <div class="feature-card">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td class="feature-icon-cell" width="48" height="48" style="border-radius:14px;">
                 <img src="https://luxtravelerz.netlify.app/email-icons/island.png" width="22" height="22" />
                </td>
              </tr>
            </table>
            <p class="feature-name">Curated Experiences</p>
            <p class="feature-desc">Handpicked luxury stays and unforgettable adventures worldwide.</p>
          </div>
        </td>
      </tr>
      <tr>
        <td class="feature-td">
          <div class="feature-card">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td class="feature-icon-cell" width="48" height="48" style="border-radius:14px;">
             <img src="https://luxtravelerz.netlify.app/email-icons/globe.png" width="22" height="22"  style="margin-top:10px;"/>
                </td>
              </tr>
            </table>
            <p class="feature-name">150+ Destinations</p>
            <p class="feature-desc">Explore premium locations across every continent on the globe.</p>
          </div>
        </td>
        <td class="feature-td">
          <div class="feature-card">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td class="feature-icon-cell" width="48" height="48" style="border-radius:14px;">
             <img src="https://luxtravelerz.netlify.app/email-icons/diamond.png" width="22" height="22" />
                </td>
              </tr>
            </table>
            <p class="feature-name">VIP Treatment</p>
            <p class="feature-desc">Priority support, lounge access, and exclusive member benefits.</p>
          </div>
        </td>
      </tr>
    </table>
  </div>

  <!-- ═══ BENEFITS ═══ -->
  <div class="section">
    <div class="benefits-card">

      <!-- Benefit 1 -->
      <div class="benefit-row">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="42" valign="middle">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="benefit-icon-cell" width="42" height="42" style="border-radius:13px;">
                    <img src="https://luxtravelerz.netlify.app/email-icons/target.png" width="22" height="22" style="margin-top:8px;"/>
                  </td>
                </tr>
              </table>
            </td>
            <td width="16"></td>
            <td valign="middle">
              <p class="benefit-name">Personalised Recommendations</p>
              <p class="benefit-desc">AI-powered itineraries tailored exactly to your travel preferences.</p>
            </td>
          </tr>
        </table>
      </div>

      <!-- Benefit 2 -->
      <div class="benefit-row">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="42" valign="middle">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="benefit-icon-cell" width="42" height="42" style="border-radius:13px;">
                  <img src="https://luxtravelerz.netlify.app/email-icons/tag.png" width="22" height="22" style="margin-top:8px;" />
                  </td>
                </tr>
              </table>
            </td>
            <td width="16"></td>
            <td valign="middle">
              <p class="benefit-name">Best Price Guarantee</p>
              <p class="benefit-desc">Exclusive deals and competitive pricing on every luxury booking.</p>
            </td>
          </tr>
        </table>
      </div>

      <!-- Benefit 3 -->
      <div class="benefit-row">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="42" valign="middle">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="benefit-icon-cell" width="42" height="42" style="border-radius:13px;">
               <img src="https://luxtravelerz.netlify.app/email-icons/shield.png" width="22" height="22" style="margin-top:8px;" />
                  </td>
                </tr>
              </table>
            </td>
            <td width="16"></td>
            <td valign="middle">
              <p class="benefit-name">Secure &amp; Trusted</p>
              <p class="benefit-desc">Bank-level security protecting every booking and payment you make.</p>
            </td>
          </tr>
        </table>
      </div>

    </div>
  </div>

  <!-- ═══ STATS ═══ -->
  <div class="section">
    <table role="presentation" class="stats-row" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td class="stat-cell">
          <p class="stat-num">150+</p>
          <p class="stat-lbl">Destinations</p>
        </td>
        <td class="stat-cell" style="border-left:1.5px solid #ede9fe;border-right:1.5px solid #ede9fe;">
          <p class="stat-num">24/7</p>
          <p class="stat-lbl">Support</p>
        </td>
        <td class="stat-cell">
          <p class="stat-num">50K+</p>
          <p class="stat-lbl">Happy Travelers</p>
        </td>
      </tr>
    </table>
  </div>

  <!-- ═══ CTA BOX ═══ -->
  <div class="section">
    <div class="cta-card">
      <h3 class="cta-title">Your next adventure starts here</h3>
      <p class="cta-body">
        Once verified, explore curated travel experiences designed for modern luxury seekers around the globe.
      </p>
      <a href="${siteUrl}" class="cta-btn">Explore LuxTravelerz</a>
    </div>
  </div>

  <!-- ═══ STRIPE ═══ -->
  <div class="stripe"></div>

  <!-- ═══ FOOTER ═══ -->
  <div class="footer">
    <img src="https://luxtravelerz.netlify.app/logo1.png" width="250" height="192" style="margin-top:-9px;" />

    <p class="footer-text">
      Thank you for joining LuxTravelerz. We're thrilled to be part of your next journey.<br>
      Questions? Reach us at <a href="mailto:support@luxtravelerz.com" class="footer-link">support@luxtravelerz.com</a>
    </p>

    <!-- Social icons -->
    <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto;">
      <tr>
        <td style="padding:0 8px;">
          <a href="#" class="social-btn" title="Instagram" style="line-height:44px;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
              <tr><td width="44" height="44" align="center" valign="middle"><img src="https://luxtravelerz.netlify.app/email-icons/instagram.png" width="22" height="22" style="margin-top:9px;" /></td></tr>
            </table>
          </a>
        </td>
        <td style="padding:0 8px;">
          <a href="#" class="social-btn" title="Twitter / X" style="line-height:44px;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
              <tr><td width="44" height="44" align="center" valign="middle"><img src="https://luxtravelerz.netlify.app/email-icons/twitter.png" width="22" height="22" style="margin-top:9px;" /></td></tr>
            </table>
          </a>
        </td>
        <td style="padding:0 8px;">
          <a href="#" class="social-btn" title="LinkedIn" style="line-height:44px;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
              <tr><td width="44" height="44" align="center" valign="middle"><img src="https://luxtravelerz.netlify.app/email-icons/linkedin.png" width="22" height="22" style="margin-top:9px;"/></td></tr>
            </table>
          </a>
        </td>
      </tr>
    </table>

    <p class="unsubscribe">
      You received this because you signed up at LuxTravelerz.com<br>
      <a href="${siteUrl}/unsubscribe">Unsubscribe</a> &nbsp;·&nbsp; <a href="${siteUrl}/privacy">Privacy Policy</a>
    </p>
  </div>

</div>
</div>
</body>
</html>`;

  await resend.emails.send({
    from: "LuxTravelerz <noreply@luxtravelerz.com>",
    to: email,
    subject: "Welcome to LuxTravelerz — Verify Your Email",
    html,
  });
};