import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThumbnailUpload = ({ thumbnail, setThumbnail }) => {
    const [previewUrl, setPreviewUrl] = useState('');
    const [isUrl, setIsUrl] = useState(false);
    const { theme } = useTheme();

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);
            setPreviewUrl(URL.createObjectURL(file));
            setIsUrl(false);
        }
    };

    const handleUrlInput = (e) => {
        const url = e.target.value;
        setThumbnail(url);
        setPreviewUrl(url);
        setIsUrl(true);
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <div className="flex-1">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="thumbnail-upload"
                    />
                    <label
                        htmlFor="thumbnail-upload"
                        className={`block w-full px-4 py-2 text-center border-2 border-dashed rounded-md cursor-pointer ${theme === 'dark'
                                ? 'hover:border-blue-400 border-gray-600 text-gray-300'
                                : 'hover:border-blue-500 border-gray-300 text-gray-700'
                            }`}
                    >
                        Upload Image
                    </label>
                </div>
                <div className="flex-1">
                    <input
                        type="url"
                        placeholder="Or enter image URL"
                        onChange={handleUrlInput}
                        className={`w-full p-2 border rounded-md ${theme === 'dark'
                                ? 'bg-gray-800 border-gray-700 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                    />
                </div>
            </div>
            {previewUrl && (
                <div className="relative w-full h-48 border rounded-md overflow-hidden">
                    <img
                        src={previewUrl}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={() => {
                            setThumbnail(null);
                            setPreviewUrl('');
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ThumbnailUpload;

