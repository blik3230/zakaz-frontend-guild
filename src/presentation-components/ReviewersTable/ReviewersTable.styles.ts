import css from "styled-jsx/css";

export default css`
  .ReviewersTable {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border: 1px solid #fff;
  }

  .ReviewersTable__td {
    border: 1px solid #fff;
  }

  .ReviewersTable__td_white {
    background: #fff;
  }

  .ReviewersTable__td_active {
    background: green;
  }
`;
