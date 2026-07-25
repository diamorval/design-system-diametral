import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@diametral/ui/components/input-otp"

// The props are declared narrowly rather than derived from the component: its
// type is a `render` XOR `children` union, and spreading a derived `Omit<…>`
// through it loses the discrimination. `maxLength` is required and numeric, so it
// is coerced here and declared `always` in the config.
export default function InputOtpPlayground({
  maxLength = "6",
  ...rest
}: {
  maxLength?: string
  disabled?: boolean
}) {
  const length = Number(maxLength)
  const props = { ...rest, maxLength: length }

  return (
    <InputOTP {...props}>
      <InputOTPGroup>
        {Array.from({ length }, (_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}
