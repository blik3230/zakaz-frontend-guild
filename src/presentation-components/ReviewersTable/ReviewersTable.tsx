import React, { CSSProperties } from "react";

export interface TableMember {
  name: string;
  reviewingMembersNames: string[];
}

interface Props {
  members: TableMember[];
}

const tableStyles: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const tdStyles: CSSProperties = {
  border: "1px solid #fff",
};

const activeTdStyles: CSSProperties = {
  ...tdStyles,
  background: "green",
};

const ReviewersTable = (props: Props) => {
  const { members } = props;

  return (
    <table style={tableStyles}>
      <thead>
        <tr>
          <td style={tdStyles}>&nbsp;</td>
          {members.map((m) => (
            <td key={m.name} style={tdStyles}>
              {m.name}
            </td>
          ))}
        </tr>
      </thead>
      {members.map((memberByRow, rowIndex) => {
        return (
          <tr key={memberByRow.name}>
            <td style={tdStyles}>{memberByRow.name}</td>
            {members.map((memberByColumn, colIndex) => {
              if (rowIndex === colIndex) {
                return <td style={{ background: "#fff" }}>&nbsp;</td>;
              }

              if (
                memberByRow.reviewingMembersNames.includes(memberByColumn.name)
              ) {
                return (
                  <td key={memberByColumn.name} style={activeTdStyles}>
                    &nbsp;
                  </td>
                );
              }

              return (
                <td key={memberByColumn.name} style={tdStyles}>
                  &nbsp;
                </td>
              );
            })}
          </tr>
        );
      })}
    </table>
  );
};

export default ReviewersTable;
