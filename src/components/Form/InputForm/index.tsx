import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input";

import * as S from "./styles";

interface InputFormProps extends TextInputProps {
  control: Control;
  name: string;
}

export function InputForm({ control, name, ...rest }: InputFormProps) {
  return (
    <S.Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input {...rest} onChangeText={onChange} value={value} />
        )}
        name={name}
      />
    </S.Container>
  );
}
