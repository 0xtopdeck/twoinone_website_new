/**
 * Server-side verification of a Cloudflare Turnstile token against the
 * siteverify endpoint, using the secret key from TURNSTILE_SECRET_KEY.
 * Returns true only if Cloudflare confirms the token is valid.
 */
export async function verifyTurnstile(
  token: string | null | undefined,
  ip?: string | null
): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not set");
    return false;
  }
  const params = new URLSearchParams({ secret, response: token });
  if (ip) params.append("remoteip", ip);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verification request failed:", err);
    return false;
  }
}
