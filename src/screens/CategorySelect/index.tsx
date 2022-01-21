import React from "react";
import { FlatList } from "react-native";
import { Button } from "../../components/Form/Button";
import { categories } from "../../utils/categories";

import * as S from "./styles";

interface CategoryProps {
  key: string;
  name: string;
}

interface CategorySelectProps {
  category: CategoryProps;
  setCategory: (category: CategoryProps) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: CategorySelectProps) {
  function handleCategorySelect(category: CategoryProps) {
    setCategory(category);
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Categoria</S.Title>
      </S.Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <S.Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <S.Icon name={item.icon} />
            <S.CategoryName>{item.name}</S.CategoryName>
          </S.Category>
        )}
        ItemSeparatorComponent={() => <S.Separator />}
      />

      <S.Footer>
        <Button title='Selecionar' onPress={closeSelectCategory} />
      </S.Footer>
    </S.Container>
  );
}
