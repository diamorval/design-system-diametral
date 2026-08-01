import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "@diametral/ui/components/description-list"
import { Snippet } from "@diametral/ui/components/snippet"

export default function SnippetInContext() {
  return (
    <DescriptionList className="w-full max-w-sm">
      <DescriptionTerm>API key</DescriptionTerm>
      <DescriptionDetail>
        <Snippet value="sk_live_51H8f2eKq7mXn9pQ2rT4vY6wZ">
          sk_live_••••••••••••wZ
        </Snippet>
      </DescriptionDetail>
    </DescriptionList>
  )
}
