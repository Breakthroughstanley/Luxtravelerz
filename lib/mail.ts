import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (
  email: string,
  token: string,
  name?: string
) => {
  const verifyLink = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  await resend.emails.send({
    from: "LuxTravelerz <noreply@luxtravelerz.com>",
    to: email,
    subject: "Welcome to LuxTravelerz - Verify Your Email ✈️",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to LuxTravelerz</title>

        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background: linear-gradient(135deg, #f6f7ff 0%, #fef8f1 100%);
            padding: 40px 20px;
            color: #1f2937;
            line-height: 1.6;
          }

          .container {
            max-width: 640px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 32px;
            overflow: hidden;
            box-shadow: 
              0 20px 60px rgba(108, 71, 255, 0.12),
              0 0 0 1px rgba(108, 71, 255, 0.04);
          }

          .top-gradient {
            height: 6px;
            background: linear-gradient(
              90deg,
              #6c47ff 0%,
              #9b72ff 33%,
              #ffd166 66%,
              #6c47ff 100%
            );
            animation: shimmer 3s linear infinite;
            background-size: 200% 100%;
          }

          @keyframes shimmer {
            0% { background-position: 0% 0%; }
            100% { background-position: 200% 0%; }
          }

          .header {
            padding: 50px 45px 35px;
            text-align: center;
            background: 
              radial-gradient(circle at 20% 20%, rgba(108, 71, 255, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 209, 102, 0.04) 0%, transparent 50%),
              #ffffff;
            position: relative;
          }

          .logo {
            width: 100px;
            height: auto;
            margin-bottom: 28px;
            filter: drop-shadow(0 4px 8px rgba(108, 71, 255, 0.08));
          }

          .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #f3efff, #fef9f0);
            border: 1.5px solid rgba(108, 71, 255, 0.15);
            color: #6c47ff;
            padding: 10px 22px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            margin-bottom: 26px;
          }

          .badge::before {
            content: '✦';
            font-size: 14px;
          }

          .title {
            font-size: 36px;
            line-height: 1.15;
            font-weight: 800;
            color: #111827;
            margin-bottom: 18px;
            letter-spacing: -0.02em;
          }

          .gradient-text {
            background: linear-gradient(135deg, #6c47ff 0%, #9b72ff 50%, #ffd166 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            display: inline-block;
          }

          .subtitle {
            font-size: 17px;
            line-height: 1.7;
            color: #6b7280;
            max-width: 500px;
            margin: 0 auto 16px;
          }

          .verify-section {
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
            margin: 0 45px;
            padding: 45px 40px;
            border-radius: 24px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }

          .verify-section::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
            animation: float 6s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(-10px, 10px) rotate(5deg); }
          }

          .verify-section > * {
            position: relative;
            z-index: 1;
          }

          .verify-icon {
            width: 64px;
            height: 64px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            font-size: 28px;
            border: 2px solid rgba(255, 255, 255, 0.3);
          }

          .verify-title {
            font-size: 28px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 14px;
            letter-spacing: -0.02em;
          }

          .verify-text {
            font-size: 16px;
            line-height: 1.7;
            color: rgba(255, 255, 255, 0.95);
            margin-bottom: 32px;
            max-width: 420px;
            margin-left: auto;
            margin-right: auto;
          }

          .verify-button {
            display: inline-block;
            padding: 18px 48px;
            background: #ffffff;
            color: #6c47ff;
            text-decoration: none;
            border-radius: 16px;
            font-weight: 700;
            font-size: 16px;
            box-shadow: 
              0 8px 24px rgba(0, 0, 0, 0.15),
              0 0 0 1px rgba(255, 255, 255, 0.1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            letter-spacing: -0.01em;
          }

          .verify-button:hover {
            transform: translateY(-2px);
            box-shadow: 
              0 12px 32px rgba(0, 0, 0, 0.2),
              0 0 0 1px rgba(255, 255, 255, 0.15);
          }

          .content {
            padding: 50px 45px 45px;
          }

          .section-title {
            font-size: 22px;
            font-weight: 800;
            color: #111827;
            margin-bottom: 24px;
            letter-spacing: -0.02em;
          }

          .features-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 18px;
            margin-bottom: 40px;
          }

          .feature-card {
            background: linear-gradient(135deg, #fafaff 0%, #ffffff 100%);
            border: 1.5px solid #ede9fe;
            border-radius: 20px;
            padding: 28px 24px;
            transition: all 0.3s ease;
          }

          .feature-card:hover {
            transform: translateY(-4px);
            border-color: #c4b5fd;
            box-shadow: 0 8px 24px rgba(108, 71, 255, 0.08);
          }

          .feature-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            margin-bottom: 16px;
            box-shadow: 0 4px 12px rgba(108, 71, 255, 0.2);
          }

          .feature-title {
            font-size: 17px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 8px;
            letter-spacing: -0.01em;
          }

          .feature-text {
            font-size: 14px;
            line-height: 1.6;
            color: #6b7280;
          }

          .benefits {
            background: linear-gradient(135deg, #fafaff, #ffffff);
            border: 1.5px solid #ede9fe;
            border-radius: 24px;
            padding: 35px 32px;
            margin-bottom: 40px;
          }

          .benefit-item {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 20px;
          }

          .benefit-item:last-child {
            margin-bottom: 0;
          }

          .benefit-icon {
            width: 40px;
            height: 40px;
            min-width: 40px;
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
          }

          .benefit-content {
            flex: 1;
          }

          .benefit-title {
            font-size: 16px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 4px;
          }

          .benefit-text {
            font-size: 14px;
            line-height: 1.6;
            color: #6b7280;
          }

          .stats-bar {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            padding: 35px 0;
            border-top: 1.5px solid #ede9fe;
            border-bottom: 1.5px solid #ede9fe;
          }

          .stat {
            text-align: center;
          }

          .stat-number {
            font-size: 32px;
            font-weight: 800;
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 8px;
            letter-spacing: -0.02em;
          }

          .stat-label {
            font-size: 13px;
            color: #6b7280;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .cta-box {
            margin-top: 40px;
            padding: 40px;
            border-radius: 24px;
            background: 
              radial-gradient(circle at top left, rgba(108, 71, 255, 0.04) 0%, transparent 50%),
              radial-gradient(circle at bottom right, rgba(255, 209, 102, 0.05) 0%, transparent 50%),
              linear-gradient(135deg, #fafaff, #ffffff);
            border: 1.5px solid #ede9fe;
            text-align: center;
          }

          .cta-title {
            font-size: 24px;
            font-weight: 800;
            color: #111827;
            margin-bottom: 12px;
            letter-spacing: -0.02em;
          }

          .cta-text {
            font-size: 15px;
            line-height: 1.7;
            color: #6b7280;
            margin-bottom: 28px;
            max-width: 450px;
            margin-left: auto;
            margin-right: auto;
          }

          .cta-button {
            display: inline-block;
            padding: 16px 40px;
            border-radius: 14px;
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
            color: #ffffff;
            text-decoration: none;
            font-weight: 700;
            font-size: 15px;
            box-shadow: 0 6px 20px rgba(108, 71, 255, 0.25);
            transition: all 0.3s ease;
          }

          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 28px rgba(108, 71, 255, 0.3);
          }

          .geometric-pattern {
            height: 90px;
            background: linear-gradient(
              90deg,
              #6c47ff 0%, #6c47ff 11.11%,
              #9b72ff 11.11%, #9b72ff 22.22%,
              #ffd166 22.22%, #ffd166 33.33%,
              #f5f3ff 33.33%, #f5f3ff 44.44%,
              #6c47ff 44.44%, #6c47ff 55.55%,
              #ffd166 55.55%, #ffd166 66.66%,
              #9b72ff 66.66%, #9b72ff 77.77%,
              #f5f3ff 77.77%, #f5f3ff 88.88%,
              #6c47ff 88.88%, #6c47ff 100%
            );
            opacity: 0.8;
          }

          .footer {
            padding: 45px;
            text-align: center;
            background: linear-gradient(135deg, #fafaff, #ffffff);
          }

          .footer-logo {
            width: 80px;
            height: auto;
            margin-bottom: 20px;
            opacity: 0.9;
          }

          .footer-text {
            font-size: 14px;
            line-height: 1.8;
            color: #6b7280;
            margin-bottom: 24px;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
          }

          .footer-link {
            color: #6c47ff;
            text-decoration: none;
            font-weight: 600;
          }

          .footer-link:hover {
            text-decoration: underline;
          }

          .socials {
            margin-top: 24px;
            display: flex;
            gap: 12px;
            justify-content: center;
          }

          .social-link {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
            color: white;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(108, 71, 255, 0.2);
          }

          .social-link:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(108, 71, 255, 0.3);
          }

          .divider {
            margin: 24px 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, #ede9fe 50%, transparent);
          }

          @media only screen and (max-width: 600px) {
            body {
              padding: 20px 12px;
            }

            .container {
              border-radius: 24px;
            }

            .header,
            .content,
            .footer {
              padding-left: 28px;
              padding-right: 28px;
            }

            .verify-section {
              margin: 0 28px;
              padding: 35px 28px;
            }

            .title {
              font-size: 28px;
            }

            .verify-title {
              font-size: 24px;
            }

            .features-grid {
              grid-template-columns: 1fr;
            }

            .stats-bar {
              grid-template-columns: 1fr;
              gap: 24px;
            }

            .cta-box {
              padding: 32px 24px;
            }

            .logo {
              width: 80px;
            }

            .footer-logo {
              width: 65px;
            }
          }
        </style>
      </head>

      <body>
        <div class="container">

          <!-- Top Animated Gradient -->
          <div class="top-gradient"></div>

          <!-- Header -->
          <div class="header">
            <img
              src="${process.env.NEXTAUTH_URL}/logo.png"
              alt="LuxTravelerz"
              class="logo"
            />

            <div class="badge">
              Premium Travel Platform
            </div>

            <h1 class="title">
              Welcome to
              <span class="gradient-text">LuxTravelerz</span>,<br>
              ${name || "Traveler"} ✈️
            </h1>

            <p class="subtitle">
              Your exclusive gateway to unforgettable destinations,
              luxury experiences, and world-class travel planning.
            </p>
          </div>

          <!-- Verification Section -->
          <div class="verify-section">
            <div class="verify-icon">✉️</div>
            
            <h2 class="verify-title">
              One Last Step to Get Started
            </h2>
            
            <p class="verify-text">
              Verify your email address to unlock full access to premium travel experiences, 
              exclusive deals, and personalized itineraries.
            </p>
            
            <a href="${verifyLink}" class="verify-button">
              Verify Your Email Address
            </a>
          </div>

          <!-- Main Content -->
          <div class="content">

            <h2 class="section-title">What awaits you at LuxTravelerz</h2>

            <div class="features-grid">
              <div class="feature-card">
                <div class="feature-icon">✈️</div>
                <div class="feature-title">Instant Bookings</div>
                <div class="feature-text">
                  Reserve flights, hotels, and experiences in seconds
                </div>
              </div>

              <div class="feature-card">
                <div class="feature-icon">🏝️</div>
                <div class="feature-title">Curated Experiences</div>
                <div class="feature-text">
                  Handpicked luxury stays and unforgettable adventures
                </div>
              </div>

              <div class="feature-card">
                <div class="feature-icon">🌍</div>
                <div class="feature-title">150+ Destinations</div>
                <div class="feature-text">
                  Explore premium locations around the globe
                </div>
              </div>

              <div class="feature-card">
                <div class="feature-icon">💎</div>
                <div class="feature-title">VIP Treatment</div>
                <div class="feature-text">
                  Priority support and exclusive member benefits
                </div>
              </div>
            </div>

            <div class="benefits">
              <div class="benefit-item">
                <div class="benefit-icon">🎯</div>
                <div class="benefit-content">
                  <div class="benefit-title">Personalized Recommendations</div>
                  <div class="benefit-text">
                    AI-powered suggestions tailored to your travel preferences
                  </div>
                </div>
              </div>

              <div class="benefit-item">
                <div class="benefit-icon">💰</div>
                <div class="benefit-content">
                  <div class="benefit-title">Best Price Guarantee</div>
                  <div class="benefit-text">
                    Exclusive deals and competitive pricing on luxury travel
                  </div>
                </div>
              </div>

              <div class="benefit-item">
                <div class="benefit-icon">🛡️</div>
                <div class="benefit-content">
                  <div class="benefit-title">Secure & Trusted</div>
                  <div class="benefit-text">
                    Bank-level security for all your bookings and payments
                  </div>
                </div>
              </div>
            </div>

            <div class="stats-bar">
              <div class="stat">
                <div class="stat-number">150+</div>
                <div class="stat-label">Destinations</div>
              </div>

              <div class="stat">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Support</div>
              </div>

              <div class="stat">
                <div class="stat-number">50K+</div>
                <div class="stat-label">Happy Travelers</div>
              </div>
            </div>

            <div class="cta-box">
              <div class="cta-title">
                Your next adventure starts here
              </div>

              <div class="cta-text">
                Once verified, explore curated travel experiences designed for modern luxury seekers.
              </div>

              <a href="${process.env.NEXTAUTH_URL}" class="cta-button">
                Explore LuxTravelerz
              </a>
            </div>

          </div>

          <!-- Geometric Pattern -->
          <div class="geometric-pattern"></div>

          <!-- Footer -->
          <div class="footer">
            <img
              src="${process.env.NEXTAUTH_URL}/logo.png"
              alt="LuxTravelerz"
              class="footer-logo"
            />

            <div class="footer-text">
              Thank you for joining LuxTravelerz. We're excited to be part of your next journey. 
              Need help? Contact us at <a href="mailto:support@luxtravelerz.com" class="footer-link">support@luxtravelerz.com</a>
            </div>

            <div class="socials">
              <a href="#" class="social-link" title="Instagram">📷</a>
              <a href="#" class="social-link" title="Twitter">🐦</a>
              <a href="#" class="social-link" title="LinkedIn">💼</a>
            </div>
          </div>

        </div>
      </body>
      </html>
    `,
  });
};