import { QrCode } from "@diametral/ui/components/qr-code"

// Higher error-correction levels survive more damage (a logo overlay, a torn
// corner) at the cost of a denser, less storage-efficient code.
export default function QrCodeLevels() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
        <QrCode value="diametral.com" level="L" size={120} />
        Level L
      </div>
      <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
        <QrCode value="diametral.com" level="M" size={120} />
        Level M
      </div>
      <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
        <QrCode value="diametral.com" level="H" size={120} />
        Level H
      </div>
    </div>
  )
}
