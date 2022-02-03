import css from "styled-jsx/css";

export default css`
  .ReviewersTableContainer {
    max-width: 480px;
    margin: 20px auto;
  }

  :global(.ReviewersTableContainer table) {
    width: 100%;
    table-layout: fixed;
  }
`;
