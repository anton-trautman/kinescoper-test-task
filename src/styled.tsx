import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    color: #242424;
    background-color: #eee;

    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;


    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }


  @media (prefers-color-scheme: dark) {
    body {
      color: #eee;
      background-color: #242424;
    }
  }
`;

export const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const List = styled.ul`
  list-style-type: none;
  padding-left: 20px;
`;

export const ListItemContainer = styled.li`
  margin: 10px 0;
`;

export const ItemContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;

export const Button = styled.button`
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: opacity 200ms ease-in-out;

  &:hover {
    opacity: 0.5;
  }
`;
