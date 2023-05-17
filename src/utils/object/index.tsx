export const object = {
  truthyObject,
};

function truthyObject(object: any) {
  const objectFormatted: any = {};

  Object.entries(object).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      objectFormatted[key] = value;
    }
  });

  return objectFormatted;
}
