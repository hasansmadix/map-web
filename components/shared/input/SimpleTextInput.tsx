"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { fieldControlClassName, fieldLabelClassName } from "@/components/shared/input/field-styles";

interface SimpleTextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
}

export function SimpleTextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className,
  disabled = false,
}: SimpleTextInputProps) {
  return (
    <div className="space-y-1">
      <Label className={fieldLabelClassName}>{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        className={cn(fieldControlClassName, className)}
        disabled={disabled}
      />
    </div>
  );
}
