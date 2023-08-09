export function toSnakeCase(val: string): string {
  let result = val.toLowerCase();
  result = result.replace(/ /g, "_");
  result = result.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  result = result.replace(/\W/g, "");
  return result;
}
export function toPascalCase(text: string): string {
  text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  text = text.replace(/[$-/:-?{-~!"^_`\[\]]/g, "_");
  let result = text.trim().split(" ");
  let unite: string = "";
  result.forEach((element) => {
    const firstLetter = element.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = element.slice(1);
    const capitalizedWord = firstLetterCap + remainingLetters;

    unite = unite + capitalizedWord;
  });

  return unite;
}

export function splitUpper(text: string): string[] {
  return text.split(/(?=[A-Z])/);
}

export function noSpace(text: string): string {
  return text.replace(" ", "")
}

export function toUpperFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function toUpperAll(text: string): string {
  const arr: string[] = text.split(" ")
  arr.forEach((_val, i) => arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1))

  return arr.join(" ")
}

export function cleanString(text: string): string {
  return text.replace(/[|&;$%@"<>()+,]/g, "")
}