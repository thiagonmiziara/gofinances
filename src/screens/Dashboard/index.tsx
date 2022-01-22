import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  DataTransactionCardProps,
} from "../../components/TransactionCard";
import * as S from "./styles";

export interface DataListProps extends DataTransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Thiago",
      amount: "R$ 1.500,00",
      category: {
        name: "Alimentação",
        icon: "dollar-sign",
      },
      date: "15/03/1987",
    },
    {
      id: "2",
      type: "negative",
      title: "Saida",
      amount: "R$ 1.500,00",
      category: {
        name: "Alimentação",
        icon: "coffee",
      },
      date: "15/03/1987",
    },
    {
      id: "3",
      type: "negative",
      title: "Shopping",
      amount: "R$ 500,00",
      category: {
        name: "Compra",
        icon: "shopping-bag",
      },
      date: "15/03/1987",
    },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.UserWrapper>
          <S.UserInfo>
            <S.UserPhoto
              source={{
                uri: "https://avatars.githubusercontent.com/u/67029929?v=4",
              }}
            />
            <S.User>
              <S.UserGreeting>Olá,</S.UserGreeting>
              <S.UserName>Thiago</S.UserName>
            </S.User>
          </S.UserInfo>
          <S.LogoutButton onPress={() => {}}>
            <S.Icon name='power' />
          </S.LogoutButton>
        </S.UserWrapper>
      </S.Header>

      <S.HighlightCards>
        <HighlightCard
          type='up'
          title='Entradas'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de abril'
        />
        <HighlightCard
          type='down'
          title='Saídas'
          amount='R$ 1.259,00'
          lastTransaction='Última saida dia 1 de abril'
        />
        <HighlightCard
          type='total'
          title='Total'
          amount='R$ 16.141,00'
          lastTransaction='01 á 16 de abril'
        />
      </S.HighlightCards>

      <S.Transactions>
        <S.Title>Listagem</S.Title>
        <S.TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </S.Transactions>
    </S.Container>
  );
}
