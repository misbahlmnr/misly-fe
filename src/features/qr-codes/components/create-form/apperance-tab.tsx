import { FieldErrors, UseFormSetValue } from "react-hook-form";
import {
  CreateQrValues,
  QrCornerSquareType,
  QrDotType,
  QrStyle,
} from "../../types";
import {
  ColorField,
  CornerStylePicker,
  DotStylePicker,
  StylePresetPicker,
} from "../qr-editor-controls";

interface ApperanceTabProps {
  preset: QrStyle;
  applyPreset: (next: QrStyle) => void;
  dotsType: QrDotType;
  dotsColor: string;
  setValue: UseFormSetValue<CreateQrValues>;
  cornersSquareType: QrCornerSquareType;
  cornersColor: string;
  backgroundColor: string;
  errors: FieldErrors<CreateQrValues>;
}

const ApperanceTab = ({
  preset,
  applyPreset,
  dotsType,
  dotsColor,
  setValue,
  cornersSquareType,
  cornersColor,
  backgroundColor,
  errors,
}: ApperanceTabProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-headline text-xl font-bold text-on-surface">
          Appearance
        </h2>
        <p className="mt-1 font-body text-sm text-on-surface-variant">
          Start from a preset, then tune dots, corners, and colors.
        </p>
      </div>

      <StylePresetPicker
        value={preset}
        onChange={(next) => applyPreset(next)}
      />

      <DotStylePicker
        value={dotsType}
        color={dotsColor}
        onChange={(next) => setValue("dotsType", next)}
      />

      <CornerStylePicker
        value={cornersSquareType}
        color={cornersColor}
        onChange={(next) => {
          setValue("cornersSquareType", next);
          setValue("cornersDotType", next === "dot" ? "dot" : "square");
        }}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <ColorField
          label="Foreground"
          value={dotsColor}
          onChange={(value) => {
            setValue("dotsColor", value);
            setValue("cornersColor", value);
          }}
          error={errors.dotsColor?.message}
        />
        <ColorField
          label="Background"
          value={backgroundColor}
          onChange={(value) => setValue("backgroundColor", value)}
          error={errors.backgroundColor?.message}
          swatches={["#ffffff", "#f4fafd", "#e4dfff", "#161d1f"]}
        />
      </div>
    </div>
  );
};

export default ApperanceTab;
