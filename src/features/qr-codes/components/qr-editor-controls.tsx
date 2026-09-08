import { FileCode2, FileImage, ImageIcon, Link2, Palette, Type } from "lucide-react"

import { FieldError } from "@/components/shared/field-error"
import { Input } from "@/components/ui/input"
import type {
  QrCornerSquareType,
  QrDotType,
  QrEditorTab,
  QrStyle,
} from "@/features/qr-codes/types"
import { cn } from "@/lib/utils"

export const editorTabs: {
  id: QrEditorTab
  label: string
  icon: typeof Type
}[] = [
  { id: "content", label: "Content", icon: Type },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "branding", label: "Branding", icon: ImageIcon },
]

const colorSwatches = [
  "#161d1f",
  "#5341cd",
  "#006b54",
  "#735c00",
  "#ba1a1a",
  "#ffffff",
]

const presets: {
  id: QrStyle
  label: string
  hint: string
  color: string
  rounded: boolean
}[] = [
  {
    id: "default",
    label: "Classic",
    hint: "Ink modules",
    color: "#161d1f",
    rounded: false,
  },
  {
    id: "brand",
    label: "Brand",
    hint: "Misly purple",
    color: "#5341cd",
    rounded: false,
  },
  {
    id: "circular",
    label: "Circular",
    hint: "Soft corners",
    color: "#161d1f",
    rounded: true,
  },
]

const dotStyles: { value: QrDotType; label: string }[] = [
  { value: "square", label: "Square" },
  { value: "rounded", label: "Rounded" },
  { value: "dots", label: "Dots" },
  { value: "extra-rounded", label: "Soft" },
  { value: "classy", label: "Classy" },
  { value: "classy-rounded", label: "Classy+" },
]

const cornerStyles: { value: QrCornerSquareType; label: string }[] = [
  { value: "square", label: "Square" },
  { value: "dot", label: "Dot" },
  { value: "extra-rounded", label: "Soft" },
]

export function EditorTabs({
  value,
  onChange,
}: {
  value: QrEditorTab
  onChange: (tab: QrEditorTab) => void
}) {
  return (
    <div className="flex rounded-xl bg-surface-container-lowest p-1 ink-border shadow-hard">
      {editorTabs.map((item) => {
        const active = value === item.id
        const Icon = item.icon

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 font-label text-sm font-bold transition-[transform,box-shadow,background-color,border-color]",
              active
                ? "bg-primary-container text-on-primary-container ink-border shadow-hard-pressed"
                : "border-2 border-transparent text-on-surface-variant hover:border-on-surface hover:text-on-surface hover:shadow-hard-pressed"
            )}
          >
            <Icon className="size-4 shrink-0" strokeWidth={2.25} />
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export function SourceToggle({
  value,
  onChange,
}: {
  value: "existing" | "new"
  onChange: (value: "existing" | "new") => void
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {(
        [
          { id: "existing", label: "Existing link", hint: "Pick a short link" },
          { id: "new", label: "New URL", hint: "Paste any destination" },
        ] as const
      ).map((option) => {
        const active = value === option.id

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "rounded-xl px-4 py-3 text-left transition-[transform,box-shadow,background-color]",
              active
                ? "bg-primary-fixed ink-border shadow-hard-pressed"
                : "bg-surface-container-lowest ink-border hover:shadow-hard-pressed"
            )}
          >
            <span className="block font-label text-sm font-bold text-on-surface">
              {option.label}
            </span>
            <span className="mt-0.5 block font-body text-xs text-on-surface-variant">
              {option.hint}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export function StylePresetPicker({
  value,
  onChange,
}: {
  value: QrStyle
  onChange: (value: QrStyle) => void
}) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {presets.map((preset) => {
        const active = value === preset.id

        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onChange(preset.id)}
            className={cn(
              "overflow-hidden rounded-xl text-left transition-[transform,box-shadow]",
              active
                ? "ink-border shadow-hard-pressed"
                : "ink-border hover:shadow-hard-pressed"
            )}
          >
            <div className="flex h-20 items-center justify-center bg-surface-bright">
              <MiniModules color={preset.color} rounded={preset.rounded} />
            </div>
            <div className="border-t-2 border-on-surface px-3 py-2">
              <span className="block font-label text-sm font-bold text-on-surface">
                {preset.label}
              </span>
              <span className="block font-body text-[11px] text-on-surface-variant">
                {preset.hint}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export function DotStylePicker({
  value,
  color,
  onChange,
}: {
  value: QrDotType
  color: string
  onChange: (value: QrDotType) => void
}) {
  return (
    <div>
      <p className="mb-2 font-label text-sm font-bold text-on-surface">
        Dot style
      </p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {dotStyles.map((item) => {
          const active = value === item.value

          return (
            <button
              key={item.value}
              type="button"
              title={item.label}
              onClick={() => onChange(item.value)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-lg px-2 py-2 transition-[transform,box-shadow]",
                active
                  ? "bg-surface-container-high ink-border shadow-hard-pressed"
                  : "bg-surface-container-lowest ink-border hover:shadow-hard-pressed"
              )}
            >
              <DotPreview type={item.value} color={color} />
              <span className="font-label text-[10px] font-bold text-on-surface-variant">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function CornerStylePicker({
  value,
  color,
  onChange,
}: {
  value: QrCornerSquareType
  color: string
  onChange: (value: QrCornerSquareType) => void
}) {
  return (
    <div>
      <p className="mb-2 font-label text-sm font-bold text-on-surface">
        Corner style
      </p>
      <div className="grid grid-cols-3 gap-2">
        {cornerStyles.map((item) => {
          const active = value === item.value

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onChange(item.value)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2.5 transition-[transform,box-shadow]",
                active
                  ? "bg-surface-container-high ink-border shadow-hard-pressed"
                  : "bg-surface-container-lowest ink-border hover:shadow-hard-pressed"
              )}
            >
              <CornerPreview type={item.value} color={color} />
              <span className="font-label text-xs font-bold text-on-surface">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ColorField({
  label,
  value,
  onChange,
  error,
  swatches = colorSwatches,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  swatches?: string[]
}) {
  return (
    <div className="space-y-2">
      <span className="block font-label text-sm font-bold text-on-surface">
        {label}
      </span>
      <div className="flex items-center gap-3">
        <label className="relative size-12 shrink-0 cursor-pointer overflow-hidden rounded-lg ink-border">
          <span
            className="absolute inset-0"
            style={{ backgroundColor: value }}
          />
          <input
            type="color"
            value={normalizeHex(value)}
            onChange={(event) => onChange(event.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
            aria-label={label}
          />
        </label>
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          className="font-mono uppercase"
        />
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
        {swatches.map((swatch) => {
          const active = value.toLowerCase() === swatch.toLowerCase()

          return (
            <button
              key={swatch}
              type="button"
              title={swatch}
              onClick={() => onChange(swatch)}
              className={cn(
                "size-7 rounded-md ink-border",
                active && "shadow-hard-pressed"
              )}
              style={{ backgroundColor: swatch }}
              aria-label={`Use ${swatch}`}
            />
          )
        })}
      </div>
      <FieldError message={error} />
    </div>
  )
}

export function FormatToggle({
  value,
  onChange,
}: {
  value: "png" | "svg"
  onChange: (value: "png" | "svg") => void
}) {
  const items = [
    { id: "png" as const, label: "PNG", icon: FileImage },
    { id: "svg" as const, label: "SVG", icon: FileCode2 },
  ]

  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item) => {
        const active = value === item.id
        const Icon = item.icon

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 font-label text-sm font-bold transition-[transform,box-shadow]",
              active
                ? "bg-surface-container-high ink-border shadow-hard-pressed"
                : "bg-surface-container-lowest ink-border hover:shadow-hard-pressed"
            )}
          >
            <Icon className="size-4" strokeWidth={2.25} />
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

export function DestinationChip({ url }: { url: string }) {
  return (
    <div className="flex w-full items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 ink-border">
      <Link2 className="size-4 shrink-0 text-primary" strokeWidth={2.25} />
      <span className="truncate font-label text-sm font-bold text-primary">
        {url}
      </span>
    </div>
  )
}

function MiniModules({ color, rounded }: { color: string; rounded: boolean }) {
  const cells = [
    [1, 1, 1, 0, 1],
    [1, 0, 1, 1, 0],
    [1, 1, 1, 0, 1],
    [0, 1, 0, 1, 1],
    [1, 0, 1, 1, 0],
  ]

  return (
    <svg viewBox="0 0 5 5" className="size-12" aria-hidden>
      {cells.map((row, y) =>
        row.map((on, x) =>
          on ? (
            <rect
              key={`${x}-${y}`}
              x={x + 0.12}
              y={y + 0.12}
              width="0.76"
              height="0.76"
              rx={rounded ? 0.38 : 0.08}
              fill={color}
            />
          ) : null
        )
      )}
    </svg>
  )
}

function DotPreview({ type, color }: { type: QrDotType; color: string }) {
  const rx =
    type === "dots"
      ? 0.5
      : type === "extra-rounded"
        ? 0.4
        : type === "rounded" || type === "classy-rounded"
          ? 0.28
          : 0.08

  return (
    <svg viewBox="0 0 3 3" className="size-6" aria-hidden>
      {[0, 1, 2].flatMap((y) =>
        [0, 1, 2].map((x) => (
          <rect
            key={`${x}-${y}`}
            x={x + 0.15}
            y={y + 0.15}
            width="0.7"
            height="0.7"
            rx={type === "classy" && (x + y) % 2 === 0 ? 0.35 : rx}
            fill={color}
          />
        ))
      )}
    </svg>
  )
}

function CornerPreview({
  type,
  color,
}: {
  type: QrCornerSquareType
  color: string
}) {
  if (type === "dot") {
    return (
      <svg viewBox="0 0 16 16" className="size-6 shrink-0" aria-hidden>
        <circle cx="8" cy="8" r="6" fill="none" stroke={color} strokeWidth="2" />
        <circle cx="8" cy="8" r="2.5" fill={color} />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 16 16" className="size-6 shrink-0" aria-hidden>
      <rect
        x="2"
        y="2"
        width="12"
        height="12"
        rx={type === "extra-rounded" ? 4 : 1}
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
      <rect
        x="5.5"
        y="5.5"
        width="5"
        height="5"
        rx={type === "extra-rounded" ? 1.5 : 0.5}
        fill={color}
      />
    </svg>
  )
}

function normalizeHex(value: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value) ? value : "#161d1f"
}
