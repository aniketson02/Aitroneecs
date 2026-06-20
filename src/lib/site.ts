// Central site configuration — edit these to match your business.

export const siteConfig = {
  name: "Aitroneecs",
  /** WhatsApp number in international format, digits only (country code + number, no +). */
  whatsappNumber: "917350020399",
  /** Default message pre-filled when a customer taps the WhatsApp button. */
  whatsappMessage: "Hi Aitroneecs! I have a question about your products.",
  supportEmail: "support@aitroneecs.com",
};

export function whatsappLink(message = siteConfig.whatsappMessage): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
