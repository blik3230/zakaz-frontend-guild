import css from "styled-jsx/css";

export default css`
  .ReviewersTableContainer {
    max-width: 600px;
    margin: 200px auto;
  }

  :global(.ReviewersTableContainer table) {
    width: 100%;
    table-layout: fixed;
  }
`;
