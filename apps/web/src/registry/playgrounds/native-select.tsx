import type { ComponentProps } from "react"

import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"

export default function NativeSelectPlayground(
  props: ComponentProps<typeof NativeSelect>
) {
  return (
    <NativeSelect {...props}>
      <NativeSelectOption value="fr">France</NativeSelectOption>
      <NativeSelectOption value="be">Belgium</NativeSelectOption>
      <NativeSelectOption value="ch">Switzerland</NativeSelectOption>
    </NativeSelect>
  )
}
