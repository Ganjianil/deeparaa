export const ROLES = ["USER", "ADMIN"] as const;
export type Role = (typeof ROLES)[number];

export const LEAD_STATUSES = ["NEW", "READ", "CLOSED"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export function isAdmin(role?: string | null): boolean {
  return role === "ADMIN";
}
