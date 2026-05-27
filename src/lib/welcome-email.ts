/**
 * Branded welcome email HTML for The Clarity Project.
 * All styles are inline — required for email client compatibility.
 */
export function buildWelcomeEmail(email: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to The Clarity Project</title>
</head>
<body style="margin:0;padding:0;background:#F5F1EC;font-family:-apple-system,'Segoe UI',Arial,sans-serif;">

<div style="max-width:600px;margin:0 auto;background:#FFFFFF;">

  <!-- HEADER -->
  <div style="background:#1B2D4F;padding:40px 48px;text-align:center;">
    <div style="margin-bottom:12px;">
      <span style="font-size:20px;line-height:1.2;letter-spacing:2px;">
        <span style="color:#C74444;">╲</span><span style="color:#D4A843;margin:0 2px;">│</span><span style="color:#68B8C5;">╱</span>
      </span><br/>
      <span style="font-size:20px;line-height:1;">
        <span style="color:#2B5BA0;">─ </span><span style="display:inline-block;width:16px;height:16px;background:#F5A725;border-radius:50%;border:3px solid #1B2D4F;outline:2px solid #FFFFFF;vertical-align:middle;"></span><span style="color:#2B5BA0;"> ─</span>
      </span><br/>
      <span style="font-size:20px;line-height:1.2;letter-spacing:2px;">
        <span style="color:#68B8C5;">╱</span><span style="color:#D4A843;margin:0 2px;">│</span><span style="color:#C74444;">╲</span>
      </span>
    </div>
    <div style="color:#FFFFFF;font-size:9px;letter-spacing:5px;text-transform:uppercase;font-weight:500;margin-top:4px;">THE</div>
    <div style="color:#FFFFFF;font-size:28px;font-weight:900;letter-spacing:-0.5px;line-height:1.1;">Clarity</div>
    <div style="color:#E05530;font-size:9px;letter-spacing:5px;text-transform:uppercase;font-weight:700;">PROJECT</div>
  </div>

  <!-- LABEL BAR -->
  <div style="background:#F9F5F0;padding:12px 48px;text-align:center;border-bottom:3px solid #E05530;">
    <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:2.5px;font-weight:600;">
      Welcome &nbsp;·&nbsp; You&rsquo;re in.
    </span>
  </div>

  <!-- BODY -->
  <div style="padding:48px;background:#FFFFFF;">

    <h1 style="font-size:26px;font-weight:800;color:#1B2D4F;line-height:1.3;margin:0 0 6px 0;">
      You&rsquo;re now part of<br/>The Clarity Project.
    </h1>
    <p style="font-size:13px;color:#E05530;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 28px 0;">
      Thank you for subscribing.
    </p>

    <div style="height:2px;background:linear-gradient(to right,#E05530,#F5A725,#68B8C5,#2B5BA0);margin:0 0 28px 0;border-radius:2px;"></div>

    <p style="font-size:16px;color:#2D2A28;line-height:1.8;margin:0 0 20px 0;">
      Every week, we sit down with one person who is doing serious work on India&rsquo;s most important challenges — in education, policy, and entrepreneurship — and we write it all out in full.
    </p>

    <p style="font-size:16px;color:#2D2A28;line-height:1.8;margin:0 0 20px 0;">
      No headlines. No summaries. No PR spin. Just the actual argument — the three ideas that came out of the conversation that you can think with, share, and act on.
    </p>

    <p style="font-size:16px;color:#2D2A28;line-height:1.8;margin:0 0 32px 0;">
      The next issue will land in this inbox. Until then, here is our first conversation — with <strong style="color:#1B2D4F;">Mahesh Balakrishnan</strong>, IB Strategist and Education Architect, on why Indian schools are losing their best teachers and what the ones getting it right are doing differently.
    </p>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:36px;">
      <a href="https://theclarityproject.in" style="display:inline-block;background:#E05530;color:#FFFFFF;padding:14px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:0.3px;">
        Read Issue #01 &rarr;
      </a>
    </div>

    <!-- WHAT TO EXPECT -->
    <div style="background:#F9F5F0;border-radius:10px;padding:24px 28px;margin:0 0 32px 0;">
      <p style="font-size:11px;color:#E05530;font-weight:800;text-transform:uppercase;letter-spacing:2px;margin:0 0 14px 0;">What to expect</p>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding:6px 0;vertical-align:top;width:20px;">
            <span style="color:#E05530;font-weight:700;">→</span>
          </td>
          <td style="padding:6px 0;font-size:14px;color:#444;line-height:1.7;">
            <strong style="color:#1B2D4F;">One conversation per week</strong> — with the most insightful person we can find on that week&rsquo;s topic.
          </td>
        </tr>
        <tr>
          <td style="padding:6px 0;vertical-align:top;width:20px;">
            <span style="color:#F5A725;font-weight:700;">→</span>
          </td>
          <td style="padding:6px 0;font-size:14px;color:#444;line-height:1.7;">
            <strong style="color:#1B2D4F;">Written in full</strong> — not a summary or a transcript, but a proper article with the ideas laid out completely.
          </td>
        </tr>
        <tr>
          <td style="padding:6px 0;vertical-align:top;width:20px;">
            <span style="color:#68B8C5;font-weight:700;">→</span>
          </td>
          <td style="padding:6px 0;font-size:14px;color:#444;line-height:1.7;">
            <strong style="color:#1B2D4F;">Ideas you can use</strong> — if a newsletter doesn&rsquo;t change how you think about something, we failed.
          </td>
        </tr>
      </table>
    </div>

    <!-- SIGN OFF -->
    <p style="font-size:15px;color:#444;line-height:1.85;margin:0;">
      Glad to have you here,<br/>
      <strong style="color:#1B2D4F;font-size:16px;">Aarthik Ramkumar</strong><br/>
      <span style="font-size:13px;color:#999;">Host, The Clarity Project</span>
    </p>

  </div>

  <!-- CTA BAND -->
  <div style="background:#1B2D4F;padding:32px 48px;text-align:center;">
    <p style="color:#EDE8E2;font-size:14px;margin:0 0 6px 0;font-weight:600;">Know someone who should be reading this?</p>
    <p style="color:#A0B0C8;font-size:12px;margin:0 0 20px 0;">Forward this email. One conversation can change how someone thinks.</p>
    <a href="https://theclarityproject.in" style="display:inline-block;background:#E05530;color:#FFFFFF;padding:11px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;">
      Visit theclarityproject.in &rarr;
    </a>
  </div>

  <!-- FOOTER -->
  <div style="background:#F9F5F0;padding:20px 48px;text-align:center;border-top:1px solid #E8E0D5;">
    <p style="font-size:11px;color:#AAA;margin:0 0 4px 0;">The Clarity Project &nbsp;·&nbsp; theclarityproject.in</p>
    <p style="font-size:11px;color:#BBB;margin:0;">
      You&rsquo;re receiving this because ${email} subscribed at theclarityproject.in.<br/>
      <a href="*|UNSUB|*" style="color:#BBB;text-decoration:underline;">Unsubscribe</a>
    </p>
  </div>

</div>
</body>
</html>`
}
