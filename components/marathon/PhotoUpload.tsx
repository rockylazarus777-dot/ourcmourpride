"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { FieldError } from "./FormFields";
import { validatePhotoFile, ALLOWED_PHOTO_MIME_TYPES, MAX_PHOTO_SIZE_BYTES } from "@/lib/marathon/validation";

const MAX_SIZE_LABEL = `${MAX_PHOTO_SIZE_BYTES / (1024 * 1024)}MB`;

interface PhotoUploadProps {
  file: File | null;
  onSelect: (file: File | null) => void;
  rejectionError: string;
  onRejectionError: (message: string) => void;
  disabled?: boolean;
}

export default function PhotoUpload({
  file,
  onSelect,
  rejectionError,
  onRejectionError,
  disabled,
}: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0] ?? null;
    e.target.value = ""; // allow re-picking the same file after removing it

    if (!picked) return;

    const error = validatePhotoFile(picked);
    if (error) {
      onSelect(null);
      onRejectionError(error);
      return;
    }

    onRejectionError("");
    onSelect(picked);
  };

  const handleRemove = () => {
    onSelect(null);
    onRejectionError("");
  };

  return (
    <div>
      {previewUrl && file ? (
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element -- transient local object URL, not an app asset */}
          <img
            src={previewUrl}
            alt="Selected photo preview"
            className="w-20 h-20 rounded-xl object-cover border-2 border-navy/15"
          />
          <div className="flex-1 min-w-0">
            <p className="font-inter text-sm text-navy truncate">{file.name}</p>
            <button
              type="button"
              onClick={handleRemove}
              disabled={disabled}
              className="mt-1.5 inline-flex items-center gap-1 text-xs font-poppins font-semibold text-maroon-600 hover:underline disabled:opacity-50"
            >
              <X size={12} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className={[
            "w-full flex items-center justify-center gap-2 border-2 border-dashed font-poppins font-semibold text-sm py-4 rounded-xl transition-all duration-200 disabled:opacity-50",
            rejectionError
              ? "border-red-400 bg-red-50/50 text-maroon-600"
              : "border-navy/20 text-navy/60 hover:border-primary/40 hover:text-primary",
          ].join(" ")}
        >
          <ImagePlus size={16} /> Choose Photo
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_PHOTO_MIME_TYPES.join(",")}
        onChange={handleChange}
        className="hidden"
      />

      <p className="text-navy/40 text-xs font-inter mt-1.5">
        Optional — Upload a recent passport-size photograph. JPG, PNG or WebP, up to {MAX_SIZE_LABEL}.
      </p>
      <FieldError message={rejectionError} />
    </div>
  );
}
