export function TextEllipsis(text?: string, size = 30) {
  if (!text) return '';

  if (text.length > size) {
    return text.slice(0, size) + '...';
  }

  return text;
}

export function beautifullyPhone(brutePhoneWithCountryCode: string) {
  const phone = brutePhoneWithCountryCode.replace(/\D/g, '');
  const areaCode = phone.substring(2, 4);
  const firstPart = phone.substring(4, 9);
  const secondPart = phone.substring(9, 13);

  return `(${areaCode}) ${firstPart}-${secondPart}`;
}

export function removeCountryCode(brutePhoneWithCountryCode: string) {
  const phone = brutePhoneWithCountryCode.replace(/\D/g, '');

  return phone.substring(2, phone.length);
}

export function mountUrlQuery(object: any) {
  const query = Object.entries(object)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return query;
}

