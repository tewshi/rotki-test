interface CurrencyOptions {
  currency?: string;
  locale?: string;
  style?: string;
  fractionDigits?: string;
}

/**
 * Format number value to specified currency format
 * @param {number} amount
 * @param {CurrencyOptions} options
 */
export const formatCurrency = (
  amount: number | string,
  options: CurrencyOptions = {
    currency: "USD",
    style: "currency",
    fractionDigits: "6",
    locale: "en-US",
  }
) => {
  let precision = amount.toString().includes(".")
    ? amount.toString().split(".")[1].length
    : 2;

  if (Number(options.fractionDigits) >= 0) {
    precision = Number(options.fractionDigits);
  }

  return new Intl.NumberFormat(options.locale, {
    style: options.style,
    currency: options.currency,
    maximumFractionDigits: precision,
    minimumFractionDigits: precision,
  }).format(Number(amount));
};

/**
 * Format date and time
 * @param timestamp
 */
export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};
