"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";
import {
  STORAGE_BUCKET,
  StorageFolder,
  validateMediaFile,
  getStoragePublicUrl,
} from "@/lib/supabase/storage";
import { supabase } from "@/lib/supabase/client";

interface MediaUploadZoneProps {
  folder: StorageFolder;
  acceptType?: "image" | "video";
  onUploadSuccess: (publicUrl: string, filePath: string) => void;
  currentUrl?: string;
  label?: string;
  helperText?: string;
}

export const MediaUploadZone: React.FC<MediaUploadZoneProps> = ({
  folder,
  acceptType = "image",
  onUploadSuccess,
  currentUrl,
  label = "Media Photography",
  helperText,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl || null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setErrorMessage(null);

    // 1. Validation
    const validation = validateMediaFile(file, acceptType);
    if (!validation.valid) {
      setErrorMessage(validation.error || "File validation failed.");
      return;
    }

    // 2. Upload to Supabase Storage: ayra-products bucket inside designated folder
    setIsUploading(true);
    setUploadProgress(20);

    try {
      const fileExt = file.name.split(".").pop();
      const sanitizedName = file.name
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
      const filePath = `${folder}/${sanitizedName}-${Date.now()}.${fileExt}`;

      setUploadProgress(50);

      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw new Error(error.message);
      }

      setUploadProgress(100);

      const publicUrl = getStoragePublicUrl(filePath);
      setPreviewUrl(publicUrl);
      onUploadSuccess(publicUrl, filePath);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setErrorMessage(message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block font-semibold text-gray-700 text-xs">{label}</label>
        <span className="text-[10.5px] font-mono text-gray-400">
          Target: {STORAGE_BUCKET}/{folder}/
        </span>
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          errorMessage
            ? "border-rose-300 bg-rose-50/40"
            : previewUrl
            ? "border-emerald-300 bg-emerald-50/20"
            : "border-gray-200 hover:border-[#B97878] hover:bg-[#FAF7F2]/50 bg-gray-50/60"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptType === "image" ? "image/jpeg,image/png,image/webp,image/avif" : "video/mp4,video/webm"}
          onChange={handleFileSelect}
          className="hidden"
        />

        {previewUrl ? (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm shrink-0">
                <Image
                  src={previewUrl}
                  alt="Uploaded media preview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Media Uploaded to {STORAGE_BUCKET}</span>
                </div>
                <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 max-w-sm">
                  {previewUrl}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded-full text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : isUploading ? (
          <div className="py-4 space-y-2">
            <Loader2 className="w-6 h-6 text-[#B97878] animate-spin mx-auto" />
            <p className="text-xs font-semibold text-gray-700">
              Uploading to Supabase ({uploadProgress}%)...
            </p>
          </div>
        ) : (
          <div className="py-2">
            <Upload className="w-7 h-7 text-[#B97878] mx-auto mb-1.5" />
            <p className="font-semibold text-gray-800 text-xs">
              Click to browse or drag & drop media
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              {helperText ||
                (acceptType === "image"
                  ? "JPEG, PNG, WebP up to 5MB."
                  : "MP4, WebM up to 25MB.")}
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="mt-3 flex items-center justify-center gap-1.5 text-rose-600 text-xs font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
