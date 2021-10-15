//este arquivo sobrescreve o theme padrão do styledcomponents
import "styled-components";

import theme from "./theme";

declare module "styled-components" {
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType {}
}
