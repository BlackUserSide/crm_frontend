export function useNan(value: any) {
  console.log(value);

  if (isNaN(value)) {
    return 0;
  }
  return value;
}
