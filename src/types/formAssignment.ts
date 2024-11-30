export type AssignmentType = 'patient' | 'contact' | 'provider';
export type AssignmentStatus = 'pending' | 'completed' | 'expired';

export interface FormAssignment {
  id: string;
  formTemplateId: string;
  assignmentType: AssignmentType;
  assignedToId: string;
  assignedById: string;
  status: AssignmentStatus;
  dueDate?: string;
  completedDate?: string;
  responses?: Record<string, any>;
  metadata: {
    sharePointId?: string;
    originalTemplateVersion: string;
    notes?: string;
  };
  createdAt: string;
  updatedAt: string;
}