import React from "react";
import { categories } from "../../utils/categories";

import * as S from "./styles";

export interface DataTransactionCardProps {
  type: "up" | "down";
  name: string;
  amount: string;
  category: string;
  date: string;
}
interface TransactionCardProps {
  data: DataTransactionCardProps;
}

export function TransactionCard({ data }: TransactionCardProps) {
  const category = categories.filter((item) => item.key === data.category)[0];
  return (
    <S.Container>
      <S.Title>{data.name}</S.Title>

      <S.Amount type={data.type}>
        {data.type === "down" && "-"}
        {data.amount}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.CategoryIcon name={category.icon} />
          <S.CategoryName>{category.name}</S.CategoryName>
        </S.Category>

        <S.Date>{data.date}</S.Date>
      </S.Footer>
    </S.Container>
  );
}
