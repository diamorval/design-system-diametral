import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"

// The platform control: no portal, no JS, and the OS picker on mobile. Reach for
// `Select` when you need custom item rendering or grouping with icons.
export default function NativeSelectBasic() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="native-select-country">Country</FieldLabel>
      <NativeSelect id="native-select-country" defaultValue="fr">
        <NativeSelectOption value="fr">France</NativeSelectOption>
        <NativeSelectOption value="be">Belgium</NativeSelectOption>
        <NativeSelectOption value="ch">Switzerland</NativeSelectOption>
      </NativeSelect>
      <FieldDescription>Used for invoicing and VAT.</FieldDescription>
    </Field>
  )
}
