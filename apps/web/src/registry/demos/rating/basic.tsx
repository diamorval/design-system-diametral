import { Rating } from "@workspace/ui/components/rating"
import { Field, FieldLabel } from "@workspace/ui/components/field"

// Built on a radio group, so each star is a real radio: arrow keys move between
// them and the value is one number rather than a click handler per star.
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
