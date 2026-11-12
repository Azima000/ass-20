export const generateSlug = (value: string) => {
  const slug = value
    .trim()                  // دي بتشيل المسافات اللي في الأول والآخر لوحدها وبكل بساطة!
    .replace(/\s+/g, "-")    // دي بتستبدل المسافات اللي في النص بشرطة (-)
    .toLocaleLowerCase();    // دي بتتحول لحروف سمول

  return slug;
}