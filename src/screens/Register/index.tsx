import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-native";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { Input } from "../../components/Form/Input";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import * as S from "./styles";

interface FormData {
  [name: string]: any;
}

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const { control, handleSubmit } = useForm();

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function HandleOpenModalSelectCategory() {
    setCategoryModalOpen(true);
  }

  function HandleCloseModalSelectCategory() {
    setCategoryModalOpen(false);
  }

  function handleSubmitRegister(form: FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
    console.log(data);
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        <S.Fields>
          <InputForm placeholder='Nome' control={control} name='name' />
          <InputForm placeholder='Preço' control={control} name='amount' />

          <S.TransactionTypes>
            <TransactionTypeButton
              type='up'
              title='Income'
              onPress={() => handleTransactionTypeSelect("up")}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton
              type='down'
              title='Outcome'
              onPress={() => handleTransactionTypeSelect("down")}
              isActive={transactionType === "down"}
            />
          </S.TransactionTypes>

          <CategorySelectButton
            title={category.name}
            onPress={HandleOpenModalSelectCategory}
          />
        </S.Fields>

        <Button title='Enviar' onPress={handleSubmit(handleSubmitRegister)} />
      </S.Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={HandleCloseModalSelectCategory}
        />
      </Modal>
    </S.Container>
  );
}
