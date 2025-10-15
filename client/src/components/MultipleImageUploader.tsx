import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
import { FileMetadata, useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { Dispatch, useEffect, useState } from "react";

interface Props {
  onChange: Dispatch<React.SetStateAction<(File | FileMetadata)[]>>;
  initialFiles?: FileMetadata[];
}

export default function MultipleImageUploader({ onChange, initialFiles = [] }: Props) {
  const [existingImages, setExistingImages] = useState<FileMetadata[]>(initialFiles);

  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;
  const maxFiles = 3;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
    multiple: true,
    maxFiles,
  });

  // যখনই কিছু পরিবর্তন হবে, সব image parent এ পাঠানো হবে
  useEffect(() => {
    const imageList: (File | FileMetadata)[] = [
      ...existingImages,
      ...files.map((item) => item.file),
    ];
    onChange(imageList);
  }, [existingImages, files]);

  const handleRemoveExisting = (url: string) => {
    setExistingImages((prev) => prev.filter((img) => img.url !== url));
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || existingImages.length > 0 || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center"
      >
        <input {...getInputProps()} className="sr-only" aria-label="Upload image file" />

        {existingImages.length > 0 || files.length > 0 ? (
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-sm font-medium">
                Uploaded Files ({existingImages.length + files.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={openFileDialog}
                disabled={existingImages.length + files.length >= maxFiles}
                type="button"
              >
                <UploadIcon className="-ms-0.5 size-3.5 opacity-60" />
                Add more
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {/* Existing images */}
              {existingImages.map((img) => (
                <div
                  key={img.url}
                  className="bg-accent relative aspect-square rounded-md"
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="size-full rounded-[inherit] object-cover"
                  />
                  <Button
                    onClick={() => handleRemoveExisting(img.url)}
                    size="icon"
                    className="absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none border-background focus-visible:border-background"
                    aria-label="Remove image"
                    type="button"
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                </div>
              ))}

              {/* New uploaded files */}
              {files.map((file) => (
                <div
                  key={file.id}
                  className="bg-accent relative aspect-square rounded-md"
                >
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="size-full rounded-[inherit] object-cover"
                  />
                  <Button
                    onClick={() => removeFile(file.id)}
                    size="icon"
                    className="absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none border-background focus-visible:border-background"
                    aria-label="Remove image"
                    type="button"
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div className="bg-background mb-2 flex size-11 items-center justify-center rounded-full border">
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">Drop your images here</p>
            <p className="text-muted-foreground text-xs">
              SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
            </p>
            <Button type="button" variant="outline" className="mt-4" onClick={openFileDialog}>
              <UploadIcon className="-ms-1 opacity-60" />
              Select images
            </Button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div className="text-destructive flex items-center gap-1 text-xs" role="alert">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}
