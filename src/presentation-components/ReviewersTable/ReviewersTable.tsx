import React, { Fragment } from "react";
import styles from "./ReviewersTable.styles";

export interface TableMember {
  name: string;
  reviewingMembersNames: string[];
}

interface Props {
  members: TableMember[];
}

const ReviewersTable = (props: Props) => {
  const { members } = props;

  return (
    <Fragment>
      <table className="ReviewersTable">
        <thead>
          <tr>
            <td className="ReviewersTable__td">&nbsp;</td>
            {members.map((m) => (
              <td key={m.name} className="ReviewersTable__td">
                {m.name}
              </td>
            ))}
          </tr>
        </thead>
        {members.map((memberByRow, rowIndex) => {
          return (
            <tr key={memberByRow.name}>
              <td className="ReviewersTable__td">{memberByRow.name}</td>
              {members.map((memberByColumn, colIndex) => {
                if (rowIndex === colIndex) {
                  return (
                    <td className="ReviewersTable__td ReviewersTable__td_white">
                      &nbsp;
                    </td>
                  );
                }

                if (
                  memberByRow.reviewingMembersNames.includes(
                    memberByColumn.name
                  )
                ) {
                  return (
                    <td
                      key={memberByColumn.name}
                      className="ReviewersTable__td ReviewersTable__td_active"
                    >
                      &nbsp;
                    </td>
                  );
                }

                return (
                  <td key={memberByColumn.name} className="ReviewersTable__td">
                    &nbsp;
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
      <style jsx>{styles}</style>
    </Fragment>
  );
};

export default ReviewersTable;
