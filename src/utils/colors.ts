export function getContrastColor(hexColor: string): string {
  // Convert the hex color to RGB
  const rgb = hexToRgb(hexColor);
  if (!rgb) {
    throw new Error(`Invalid HEX color. ${hexColor}`);
  }

  const {r, g, b} = rgb;

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return white or black based on luminance
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

function hexToRgb(hex: string): {r: number; g: number; b: number} | null {
  // Ensure it's a valid hex color
  const cleanedHex = hex.replace("#", "");
  if (cleanedHex.length !== 3 && cleanedHex.length !== 6) {
    return null;
  }

  // Expand shorthand (e.g., #123 => #112233)
  const fullHex =
    cleanedHex.length === 3
      ? cleanedHex
          .split("")
          .map((c) => c + c)
          .join("")
      : cleanedHex;

  // Parse into RGB
  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);

  return {r, g, b};
}
