export const caseStatusRules = {
  isPatientInactive: (caseItem: any) => {
    // Patient is inactive if they have completed treatment or are ineligible
    return (
      caseItem.treatmentStatus === 'completed' ||
      caseItem.patientStatus === 'inactive' ||
      !caseItem.isEligibleForTreatment
    );
  },

  isCaseActive: (caseItem: any) => {
    // Case is active if there are pending tasks or unpaid balance
    return (
      caseItem.paymentStatus !== 'paid' ||
      caseItem.pendingTasks?.length > 0 ||
      caseItem.balance > 0
    );
  }
};