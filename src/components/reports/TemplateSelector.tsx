import React, { useEffect } from 'react';
import { FileText, FileSpreadsheet, File } from 'lucide-react';

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void;
}

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const { templates, isLoading, error, fetchTemplates } = useTemplates();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const getTemplateIcon = (type: string) => {
    switch (type) {
      case 'excel':
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
      case 'word':
        return <FileText className="h-5 w-5 text-blue-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  if (isLoading) {
    return <div>Loading templates...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50"
        >
          {getTemplateIcon(template.type)}
          <span className="text-sm font-medium">{template.name}</span>
        </button>
      ))}
    </div>
  );
}