'use client'

import React, { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
    bucketName: string
    onUpload: (url: string) => void
    label?: string
    defaultImage?: string
    className?: string
    aspectRatio?: 'square' | 'video' | 'banner'
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    bucketName,
    onUpload,
    label = 'Upload Image',
    defaultImage,
    className = '',
    aspectRatio = 'square'
}) => {
    const [image, setImage] = useState<string | null>(defaultImage || null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)
            setError(null)
            const file = event.target.files?.[0]
            if (!file) return

            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            // Get public URL
            const { data } = supabase.storage
                .from(bucketName)
                .getPublicUrl(filePath)

            setImage(data.publicUrl)
            onUpload(data.publicUrl)
        } catch (err: any) {
            console.error('Error uploading image:', err)
            setError('Failed to upload image. Please try again.')
        } finally {
            setUploading(false)
        }
    }

    const removeImage = (e: React.MouseEvent) => {
        e.preventDefault()
        setImage(null)
        onUpload('')
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const aspectRatioClass =
        aspectRatio === 'square' ? 'aspect-square' :
            aspectRatio === 'video' ? 'aspect-video' :
                'aspect-[3/1]'

    return (
        <div className={`w-full ${className}`}>
            {label && <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>}

            <div
                onClick={() => fileInputRef.current?.click()}
                className={`
          relative border-2 border-dashed border-slate-300 rounded-lg overflow-hidden 
          transition-all duration-200 cursor-pointer hover:border-green-500 hover:bg-green-50
          flex items-center justify-center
          ${aspectRatioClass}
          ${image ? 'border-none' : ''}
        `}
            >
                {uploading ? (
                    <div className="flex flex-col items-center gap-2 text-green-600">
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <span className="text-sm font-medium">Uploading...</span>
                    </div>
                ) : image ? (
                    <div className="relative w-full h-full group">
                        <Image
                            src={image}
                            alt="Uploaded"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                onClick={removeImage}
                                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-colors"
                                type="button"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-500 p-4 text-center">
                        <div className="p-3 bg-slate-100 rounded-full">
                            <Upload className="w-6 h-6" />
                        </div>
                        <div className="text-sm">
                            <span className="font-semibold text-green-600">Click to upload</span> or drag and drop
                        </div>
                        <p className="text-xs text-slate-400">PNG, JPG, GIF up to 5MB</p>
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={uploading}
                />
            </div>

            {error && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <X className="w-4 h-4" /> {error}
                </p>
            )}
        </div>
    )
}

export default ImageUpload
