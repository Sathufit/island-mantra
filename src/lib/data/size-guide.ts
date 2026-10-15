export interface SizeTable {
  id: "women" | "men" | "kids";
  title: string;
  columns: string[];
  rows: string[][];
}

// Standard measurements from the customer's brief — replace with Island
// Mantra's own garment measurements before going live.
export const sizeTables: SizeTable[] = [
  {
    id: "women",
    title: "Women – Body Measurements (cm)",
    columns: ["Size", "Bust", "Waist", "Hips"],
    rows: [
      ["UK 6 / XS", "80", "62", "87"],
      ["UK 8 / S", "84", "66", "91"],
      ["UK 10 / M", "88", "70", "95"],
      ["UK 12 / L", "93", "75", "100"],
      ["UK 14 / XL", "98", "80", "105"],
      ["UK 16 / XXL", "103", "85", "110"],
    ],
  },
  {
    id: "men",
    title: "Men – Body Measurements (cm)",
    columns: ["Size", "Chest", "Waist"],
    rows: [
      ["S", "91 – 96", "76 – 81"],
      ["M", "97 – 102", "82 – 87"],
      ["L", "103 – 108", "88 – 93"],
      ["XL", "109 – 114", "94 – 99"],
      ["XXL", "115 – 120", "100 – 105"],
    ],
  },
  {
    id: "kids",
    title: "Kids – By Age (cm)",
    columns: ["Age", "Height", "Chest"],
    rows: [
      ["2 – 3 years", "92 – 98", "52 – 54"],
      ["3 – 4 years", "98 – 104", "54 – 56"],
      ["5 – 6 years", "110 – 116", "57 – 60"],
      ["7 – 8 years", "122 – 128", "61 – 64"],
      ["9 – 10 years", "134 – 140", "66 – 69"],
      ["11 – 12 years", "146 – 152", "71 – 75"],
    ],
  },
];

export const howToMeasure = [
  { label: "Bust / chest", text: "measure around the fullest part, keeping the tape level under your arms." },
  { label: "Waist", text: "measure around the narrowest part of your natural waistline." },
  { label: "Hips", text: "measure around the fullest part, with your feet together." },
  { label: "Height (kids)", text: "measure standing straight against a wall, without shoes." },
];

export const measureTip = "Tip: measure over light clothing and keep the tape snug, not tight.";
