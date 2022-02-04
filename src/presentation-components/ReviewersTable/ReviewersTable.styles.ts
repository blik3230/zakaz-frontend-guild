import css from "styled-jsx/css";

export default css`
  .ReviewersTable {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border: 1px solid #fff;
  }

  .ReviewersTable__td {
    padding: 2px 10px;
    border: 1px solid #fff;
    box-shadow: inset -1px 1px 2px rgba(0, 0, 0, 0.2);
  }

  .ReviewersTable__td_white {
    background: #fff;
  }

  .ReviewersTable__td_active {
    background: green;
  }

  .ReviewersTable__td_accentedActive {
    background: #003780;
  }

  .ReviewersTable__td_clickable {
    cursor: pointer;
  }
`;
