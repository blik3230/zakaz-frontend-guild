import { CellItem } from "./Table.types";

export const createCellItem = (id: string, context: string) => ({
  id,
  context,
});

export const createEmptyTableData = (
  columnLength: number,
  rowLength: number
): CellItem[][] =>
  new Array(rowLength)
    .fill(null)
    .map((_, rowIndex) =>
      new Array(columnLength)
        .fill(null)
        .map((_, columnIndex) =>
          createCellItem(
            `row-index-${rowIndex} column-index-${columnIndex}`,
            "\xa0"
          )
        )
    );
