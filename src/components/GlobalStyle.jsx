// GlobalStyle.jsx (혹은 .js)
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* ✅ Pretendard CDN CSS만 가져오기 */
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css");

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {
    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    background: #fff7f0;
    color: #333;
  }

  button,
  input,
  textarea,
  select {
    font-family: inherit;
  }
`;

export default GlobalStyle;
