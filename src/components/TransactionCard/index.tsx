import React from "react";

import * as S from "./styles";

export function TransactionCard() {
  return (
    <S.Container>
      <S.Title>Desenvolvimento de site</S.Title>

      <S.Amount>R$ 1.000,00</S.Amount>

      <S.Footer>
        <S.Category>
          <S.CategoryIcon name='dollar-sign' />
          <S.CategoryName>Vendas</S.CategoryName>
        </S.Category>
        <S.Date>15/03/2022</S.Date>
      </S.Footer>
    </S.Container>
  );
}
