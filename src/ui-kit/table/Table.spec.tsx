import { render, screen } from "@testing-library/react";
import Table from "./Table";
import { CellItem } from "./Table.types";

const getMockedContentForCell = (contentPrefix: string, contentIndex: string) =>
  `${contentPrefix} #${contentIndex}`;

const createColumnItem = (length: number, contentPrefix: string): CellItem[] =>
  new Array(length).fill(null).map((_, index) => ({
    id: index.toString(),
    content: getMockedContentForCell(contentPrefix, index.toString()),
  }));

const commonColumnPrefix = "column cell";
const commonRowPrefix = "row cell";
const commonColumns: CellItem[] = createColumnItem(4, commonColumnPrefix);
const commonRows: CellItem[] = createColumnItem(4, commonRowPrefix);

describe("Table", () => {
  it("renders passed header cell content when renderHeaderCell prop is not passed", () => {
    render(<Table columnTitles={commonColumns} rowTitles={commonRows} />);

    for (const columnIndex in commonColumns) {
      expect(
        screen.getByText(
          getMockedContentForCell(commonColumnPrefix, columnIndex.toString())
        )
      ).toBeInTheDocument();
    }
  });

  it(`renders passed content to the first cell of the each row as header 
  when renderRowTitleCell is not passed`, () => {
    render(<Table columnTitles={commonColumns} rowTitles={commonRows} />);

    for (const rowIndex in commonRows) {
      expect(
        screen.getByText(
          getMockedContentForCell(commonRowPrefix, rowIndex.toString())
        )
      ).toBeInTheDocument();
    }
  });
});
