// const OWNER_NUMBER = "+919644777267";
const OWNER_NUMBER = "+917008189412";

/**
 * Open WhatsApp chat directly with prefilled message
 * @param {string} message
 */
export const openWhatsApp = (message = "") => {
  if (typeof window === "undefined") return;

  const cleanNumber = OWNER_NUMBER.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message.trim());

  const url = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  window.open(url, "_blank", "noopener,noreferrer");
};
