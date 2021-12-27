import React from "react";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";
import * as S from "./styles";

export function Dashboard() {
  const data = [
    {
      title: "Thiago",
      amount: "R$ 1.500,00",
      category: {
        name: "Alimentação",
        icon: "dollar-sign",
      },
      date: "15/03/1987",
    },
    {
      title: "Thiago02",
      amount: "R$ 1.500,00",
      category: {
        name: "Alimentação",
        icon: "dollar-sign",
      },
      date: "15/03/1987",
    },
    {
      title: "Thiago03",
      amount: "R$ 1.500,00",
      category: {
        name: "Alimentação",
        icon: "dollar-sign",
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
          <S.Icon name='power' />
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
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: getBottomSpace() }}
        />
      </S.Transactions>
    </S.Container>
  );
}
