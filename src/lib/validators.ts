export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function sanitize(input: string) {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
}