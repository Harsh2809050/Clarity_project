import { buildWelcomeEmail } from './welcome-email'

/**
 * Send the branded welcome email via Zoho Mail SMTP.
 * Transporter is lazy-initialised so missing env vars never crash the build.
 * Errors are caught and logged — email failure never blocks the subscribe response.
 */
export async function sendWelcomeEmail(toEmail: string): Promise<void> {
  const host = process.env.ZOHO_SMTP_HOST
  const port = parseInt(process.env.ZOHO_SMTP_PORT ?? '465', 10)
  const user = process.env.ZOHO_SMTP_USER
  const pass = process.env.ZOHO_SMTP_PASS

  if (!host || !user || !pass) {
    console.warn('[mailer] Zoho SMTP env vars not set — skipping welcome email.')
    return
  }

  try {
    // Lazy import keeps Nodemailer away from build-time evaluation
    const nodemailer = await import('nodemailer')

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,   // true for port 465 (SSL), false for 587 (STARTTLS)
      auth: { user, pass },
    })

    await transporter.sendMail({
      from: `"The Clarity Project" <${user}>`,
      to: toEmail,
      subject: 'Welcome to The Clarity Project 🎙',
      html: buildWelcomeEmail(toEmail),
    })

    console.log(`[mailer] Welcome email sent to ${toEmail}`)
  } catch (err) {
    console.error('[mailer] Failed to send welcome email:', err)
  }
}
