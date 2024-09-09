'use client'
import Image from 'next/image';

import { Trash } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { useToast } from '@/shared/components/ui/use-toast';

interface ImageUploadProps {
    onChange: (files: any[]) => void;
    onRemove: (files: any[]) => void;
    value: any[];
}

export default function FileUpload({
    onChange,
    onRemove,
    value
}: ImageUploadProps) {
    const { toast } = useToast();

    const onDeleteFile = (name: string) => {
        const files = value;
        const filteredFiles = files.filter((item) => item.name !== name);
        onRemove(filteredFiles);
    };

    const onUpdateFile = (newFiles: any[]) => {
        onChange([...value, ...newFiles]);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const fileArray = Array.from(files);
            fileArray.forEach(uploadFile);
        }
    };

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            const uploadedFile = { ...file, url: data.url };
            onUpdateFile([uploadedFile]);
        } catch (error) {
            console.error('Error uploading file:', error);
            toast({
                title: 'Error',
                variant: 'destructive',
            });
        }
    };

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {!!value.length &&
                    value.map((item) => {
                        return (
                            <div
                                key={item.name}
                                className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
                            >
                                <div className="absolute right-2 top-2 z-10">
                                    <Button
                                        type="button"
                                        onClick={() => onDeleteFile(item.name)}
                                        variant="destructive"
                                        size="sm"
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div>
                                    <Image
                                        width={200}
                                        height={200}
                                        className="w-[200px] h-[200px] object-cover"
                                        alt="Image"
                                        src={item.url ? item.url : URL.createObjectURL(item)}
                                    />
                                </div>
                            </div>
                        )
                    })}
            </div>
            <div>
                {value.length < 1 && (
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="py-2 w-[200px] h-[200px] border border-dashed border-gray-300 rounded-md"
                    />
                )}
            </div>
        </div>
    );
}
