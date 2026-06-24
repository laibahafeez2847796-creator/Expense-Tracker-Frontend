const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  Food: { bg: "bg-teal-500/20", text: "text-teal-300" },
  Transport: { bg: "bg-purple-500/20", text: "text-purple-300" },
  Entertainment: { bg: "bg-red-500/20", text: "text-red-300" },
  Shopping: { bg: "bg-blue-500/20", text: "text-blue-300" },
  Bills: { bg: "bg-orange-500/20", text: "text-orange-300" },
  Health: { bg: "bg-emerald-500/20", text: "text-emerald-300" },
  Marketing: { bg: "bg-indigo-500/20", text: "text-indigo-300" },
  Sales: { bg: "bg-rose-500/20", text: "text-rose-300" },
  Operations: { bg: "bg-amber-500/20", text: "text-amber-300" },
  Finance: { bg: "bg-cyan-500/20", text: "text-cyan-300" },
};

const FALLBACK_COLORS = [
  { bg: "bg-teal-500/20", text: "text-teal-300" },
  { bg: "bg-purple-500/20", text: "text-purple-300" },
  { bg: "bg-red-500/20", text: "text-red-300" },
  { bg: "bg-blue-500/20", text: "text-blue-300" },
  { bg: "bg-orange-500/20", text: "text-orange-300" },
  { bg: "bg-pink-500/20", text: "text-pink-300" },
];

export function formatAmount(amount: number, currency = "€"): string {
  return `${currency}${new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;
}

export function getCategoryStyle(category: string) {
  if (CATEGORY_STYLES[category]) return CATEGORY_STYLES[category];
  const index =
    category.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    FALLBACK_COLORS.length;
  return FALLBACK_COLORS[index];
}

export function abbreviateCategory(category: string): string {
  const words = category.trim().split(/\s+/);
  if (words.length === 1) return category.slice(0, 2).toUpperCase();
  return words.map((w) => w[0]?.toUpperCase() ?? "").join("");
}

export function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}
