import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import uuid from "react-native-uuid";

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import * as S from "./styles";

interface FormData {
  [name: string]: any;
}

//validation schema form
const YUP_SCHEMA = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("O valor deve ser positivo")
    .required("O valor é obrigatório"),
});

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    //validationSchema: YUP_SCHEMA,
    resolver: yupResolver(YUP_SCHEMA),
  });

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function HandleOpenModalSelectCategory() {
    setCategoryModalOpen(true);
  }

  function HandleCloseModalSelectCategory() {
    setCategoryModalOpen(false);
  }

  async function handleSubmitRegister(form: FormData) {
    //validate transaction
    if (!transactionType) {
      return Alert.alert("Erro", "Selecione o tipo da transação");
    }
    // validate category
    if (category.key === "category") {
      return Alert.alert("Erro", "Selecione uma categoria");
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };
    //Armazenar no storage
    try {
      //key do storage
      const dataKey = "@gofinances:transactions";

      //pegando dados do storage
      const data = await AsyncStorage.getItem(dataKey);
      //transformando em array
      const currentData = data ? JSON.parse(data) : [];
      //adicionando novo item
      const dataFormated = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated));
      //Limpando os campos do formulário
      reset(); //função do useForm para resetar os inputs do formulário
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categotia",
      });
      //Levando pra tela de listagem após cadastrar
      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao cadastrar transação");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.Header>
          <S.Title>Cadastro</S.Title>
        </S.Header>

        <S.Form>
          <S.Fields>
            <InputForm
              placeholder='Nome'
              control={control}
              name='name'
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              placeholder='Preço'
              control={control}
              name='amount'
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
            />

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
    </TouchableWithoutFeedback>
  );
}
