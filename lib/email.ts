/**
 * Sends a notification email to the Agrovio team when an invite request comes
 * in. Provider-agnostic: uses Resend if RESEND_API_KEY is set, otherwise Gmail
 * SMTP if GMAIL_USER + GMAIL_APP_PASSWORD are set, otherwise no-ops (the form
 * submission still succeeds — the row is always saved to Supabase first).
 */

export type InviteNotification = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  country?: string;
  referralSource?: string;
};

const NOTIFY_TO = process.env.NOTIFY_EMAIL || "agroviobusiness@gmail.com";

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );
}

function build(d: InviteNotification) {
  const rows: Array<[string, string | undefined]> = [
    ["Name", `${d.firstName} ${d.lastName}`],
    ["Email", d.email],
    ["Producer / Buyer", d.role],
    ["Phone", d.phone],
    ["Company", d.company],
    ["Job title", d.jobTitle],
    ["Country", d.country],
    ["Heard about us via", d.referralSource],
  ];
  const present = rows.filter(([, v]) => v && v.length > 0);

  const subject = `New invite request — ${d.firstName} ${d.lastName} (${d.role})`;
  const text = present.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `
    <div style="font-family:system-ui,Segoe UI,sans-serif;max-width:560px;color:#0a0a0a">
      <h2 style="color:#1f7a3f;margin:0 0 16px">New Agrovio invite request</h2>
      <table style="border-collapse:collapse;width:100%;font-size:15px">
        ${present
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 16px 6px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;color:#0a0a0a">${escapeHtml(v!)}</td></tr>`
          )
          .join("")}
      </table>
      <p style="margin:20px 0 0;color:#9ca3af;font-size:13px">Reply directly to this email to reach ${escapeHtml(d.email)}.</p>
    </div>`;

  return { subject, text, html };
}

export async function sendInviteNotification(d: InviteNotification): Promise<void> {
  const { subject, text, html } = build(d);

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Agrovio <onboarding@resend.dev>",
      to: [NOTIFY_TO],
      replyTo: d.email,
      subject,
      text,
      html,
    });
    if (error) throw new Error(`Resend error: ${error.message}`);
    return;
  }

  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    const nodemailer = (await import("nodemailer")).default;
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    await transport.sendMail({
      from: `Agrovio <${process.env.GMAIL_USER}>`,
      to: NOTIFY_TO,
      replyTo: d.email,
      subject,
      text,
      html,
    });
    return;
  }

  console.warn(
    "[email] No email provider configured (set RESEND_API_KEY or GMAIL_USER + GMAIL_APP_PASSWORD); skipping invite notification."
  );
}
