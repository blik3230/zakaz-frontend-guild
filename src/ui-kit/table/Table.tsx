import React, { Fragment, ReactElement } from "react";
import { NBSP_HTML } from "../../constants/strings";
import { CellItem } from "./Table.types";
import { createEmptyTableData } from "./TableHelpers";

interface TableProps {
  columnTitles?: CellItem[];
  rowTitles?: CellItem[];
  data?: CellItem[][];

  renderColumnTitleCell?: (
    columnIndex: number
  ) => ReactElement<HTMLTableCellElement>;

  renderRowTitleCell?: (rowIndex: number) => ReactElement<HTMLTableCellElement>;

  renderItemCell?: (
    rowIndex: number,
    columnIndex: number
  ) => ReactElement<HTMLTableCellElement>;
}

const Table = (props: TableProps) => {
  const {
    columnTitles,
    rowTitles,
    data = columnTitles && rowTitles
      ? createEmptyTableData(columnTitles.length, rowTitles.length)
      : [],
    renderColumnTitleCell,
    renderRowTitleCell,
    renderItemCell,
  } = props;

  return (
    <table>
      {columnTitles && (
        <thead>
          <tr>
            {(typeof renderRowTitleCell === "function" || rowTitles) && (
              <th>&nbsp;</th>
            )}

            {columnTitles.map((item, columnIndex) => {
              if (typeof renderColumnTitleCell === "function") {
                return renderColumnTitleCell(columnIndex);
              }

              return (
                <th key={item.id}>
                  {item.content !== undefined ? (
                    item.content
                  ) : (
                    <Fragment>&nbsp;</Fragment>
                  )}
                  rowTitleCells
                </th>
              );
            })}
          </tr>
        </thead>
      )}

      <tbody>
        {data.map((row, rowIndex) => {
          const trKey = rowTitles
            ? rowTitles[rowIndex].id
            : columnTitles
            ? columnTitles[0].id
            : rowIndex;

          return (
            <tr key={trKey}>
              {typeof renderRowTitleCell === "function"
                ? renderRowTitleCell(rowIndex)
                : rowTitles && (
                    <td>{rowTitles[rowIndex]?.content ?? NBSP_HTML}</td>
                  )}

              {row.map((cellItem, columnIndex) => {
                if (typeof renderItemCell === "function") {
                  return renderItemCell(rowIndex, columnIndex);
                }

                return (
                  <td key={cellItem.id}>
                    {cellItem.content !== undefined
                      ? cellItem.content
                      : NBSP_HTML}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
