export const reportMargins = {
  pageMargins: [40, 40, 40, 40] as [number, number, number, number],

  header: [0, 0, 0, 20] as [number, number, number, number],
  sectionTitle: [0, 5, 0, 2] as [number, number, number, number],
  paragraph: [0, 0, 0, 5] as [number, number, number, number],
  blockAfter: [0, 5, 0, 15] as [number, number, number, number],

  colsTight: [0, 0, 0, 2] as [number, number, number, number],

  indentedBlockAfter: [10, 0, 0, 15] as [number, number, number, number],

  signatureHeader: [0, 30, 0, 0] as [number, number, number, number],
  signatureBox: [0, 20, 0, 0] as [number, number, number, number],

  decision: [0, 10, 0, 5] as [number, number, number, number],
  decisionReason: [20, 0, 0, 0] as [number, number, number, number]
} as const;
