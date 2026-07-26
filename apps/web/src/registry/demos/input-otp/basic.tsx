import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@diametral/ui/components/input-otp"

// There is one real input behind the slots; the slots are painted from its state.
// That is what makes paste, autofill and the OS SMS suggestion work.
export default function InputOtpBasic() {
  return (
    <InputOTP maxLength={6} aria-label="One-time code">
      <InputOTPGroup>
        {Array.from({ length: 6 }, (_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}
