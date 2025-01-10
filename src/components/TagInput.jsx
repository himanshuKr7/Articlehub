import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const TagInput = ({ tags, setTags, suggestions = [] }) => {
    const [input, setInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const inputRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (input) {
            setFilteredSuggestions(
                suggestions.filter(suggestion =>
                    suggestion.toLowerCase().includes(input.toLowerCase()) &&
                    !tags.includes(suggestion)
                )
            );
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [input, suggestions, tags]);

    const addTag = (tag) => {
        if (tag && !tags.includes(tag)) {
            setTags([...tags, tag]);
            setInput('');
            setShowSuggestions(false);
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="relative">
            <div className={`flex flex-wrap gap-2 p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                }`}>
                {tags.map(tag => (
                    <span
                        key={tag}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                            }`}
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className={`hover:text-blue-600 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-500'}`}
                        >
                            <X size={14} />
                        </button>
                    </span>
                ))}
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag(input);
                        }
                    }}
                    className={`flex-1 min-w-[120px] outline-none ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                        }`}
                    placeholder="Add tags..."
                />
            </div>
            {showSuggestions && filteredSuggestions.length > 0 && (
                <div className={`absolute z-10 w-full mt-1 border rounded-md shadow-lg ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                    }`}>
                    {filteredSuggestions.map(suggestion => (
                        <button
                            key={suggestion}
                            type="button"
                            onClick={() => addTag(suggestion)}
                            className={`w-full px-4 py-2 text-left ${theme === 'dark'
                                    ? 'hover:bg-gray-700 text-gray-200'
                                    : 'hover:bg-gray-100 text-gray-800'
                                }`}
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TagInput;

