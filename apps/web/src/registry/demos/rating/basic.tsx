import { Rating } from "@diametral/ui/components/rating"
import { Field, FieldLabel } from "@diametral/ui/components/field"

export default function RatingBasic() {
  return (
    <div className="flex flex-col gap-8">
      <Field className="max-w-sm">
        <FieldLabel>How was the handover?</FieldLabel>
        <Rating defaultValue={4} />
      </Field>
      <Rating max={10} defaultValue={7} />
    </div>
  )
}
