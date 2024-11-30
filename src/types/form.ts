export type FormType = 
  | 'intake'
  | 'soap'
  | 'consent'
  | 'questionnaire'
  | 'treatment-plan'
  | 'progress'
  | 'discharge'
  | 'lien'
  | 'authorization';

export type FormStatus = 'draft' | 'active' | 'archived';

export interface FormTemplate {
  id: string;
  title: string;
  type: FormType;
  status: FormStatus;
  version: string;
  createdAt: string;
  updatedAt: string;
  content: {
    sections: FormSection[];
    metadata: {
      sharePointId?: string;
      aiPromptTemplate?: string;
      requiredFields: string[];
    };
  };
}

export interface FormSection {
  id: string;
  title: string;
  order: number;
  fields: FormField[];
}

export type FieldType = 
  | 'text'
  | 'number'
  | 'date'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'signature';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  order: number;
  options?: string[];
  defaultValue?: string;
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
  };
}