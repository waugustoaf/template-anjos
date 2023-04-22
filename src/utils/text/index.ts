export function TextEllipsis(text?: string, size = 30) {
  if (!text) return '';

  if (text.length > size) {
    return text.slice(0, size) + '...';
  }

  return text;
}

export function beautifullyPhone(brutePhoneWithCountryCode: string) {
  if(!brutePhoneWithCountryCode) return '';

  const phone = brutePhoneWithCountryCode.replace(/\D/g, '');
  const areaCode = phone.substring(0, 2);
  const firstPart = phone.substring(2, 7);
  const secondPart = phone.substring(7, 13);

  return `(${areaCode}) ${firstPart}-${secondPart}`;
}

export function beautifullySimplePhone(brutePhoneWithCountryCode: string) {
  const phone = brutePhoneWithCountryCode.replace(/\D/g, '');
  const areaCode = phone.substring(0, 2);
  const firstPart = phone.substring(2, 7);
  const secondPart = phone.substring(7, 11);

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

