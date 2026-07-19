// Shared currency formatting utilities for calculators and forms.
// Locale used only for correct digit grouping (e.g. INR's lakh/crore style) —
// the currency code, not the locale, controls which symbol and units are shown.

export const CURRENCY_LOCALES: Record<string, string> = { INR: 'en-IN' };

export const CURRENCY_NAMES: Record<string, string> = {
  USD: 'US Dollar', INR: 'Indian Rupee', GBP: 'British Pound', JPY: 'Japanese Yen',
  CNY: 'Chinese Yuan', CAD: 'Canadian Dollar', AUD: 'Australian Dollar', CHF: 'Swiss Franc',
  HKD: 'Hong Kong Dollar', IDR: 'Indonesian Rupiah', ILS: 'Israeli Shekel', ISK: 'Icelandic Krona',
  KRW: 'South Korean Won', MXN: 'Mexican Peso', MYR: 'Malaysian Ringgit', NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar', PHP: 'Philippine Peso', PLN: 'Polish Zloty', RON: 'Romanian Leu',
  SEK: 'Swedish Krona', SGD: 'Singapore Dollar', THB: 'Thai Baht', TRY: 'Turkish Lira',
  ZAR: 'South African Rand', BRL: 'Brazilian Real', CZK: 'Czech Koruna', DKK: 'Danish Krone',
  HUF: 'Hungarian Forint', EUR: 'Euro',
};

export function formatCurrency(n: number, currencyCode: string = 'USD'): string {
  const locale = CURRENCY_LOCALES[currencyCode] || 'en-US';
  return n.toLocaleString(locale, { style: 'currency', currency: currencyCode, maximumFractionDigits: 0 });
}

export function currencySymbol(currencyCode: string): string {
  const parts = new Intl.NumberFormat(CURRENCY_LOCALES[currencyCode] || 'en-US', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).formatToParts(0);
  return parts.find((p) => p.type === 'currency')?.value || currencyCode;
}
