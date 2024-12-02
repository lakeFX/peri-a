import React from 'react';
import ReportGenerator from '../../reports/ReportGenerator';

// Interface for template metadata (should match the ITemplate interface in FormsReportsTemplates.tsx)
interface ITemplate {
  Id: number;
  Title: string;
  Description: string;
  // ... other properties as needed
}

interface TemplateProps {
  template: ITemplate;
  onGenerateReport: (templateId: number, reportData: any) => void;
}

const Template: React.FC<TemplateProps> = ({ template, onGenerateReport }) => {
  const handleGenerateReportClick = () => {
    onGenerateReport(template.Id, { name: 'test' }); 
  };

  const handleTriggerPowerAutomateFlow = () => {
    const dummyReportData = { name: 'Test Report' };
    ReportGenerator.triggerPowerAutomateFlow(dummyReportData);
  };

  return (
    <div>
      <h2>{template.Title}</h2>
      <p>{template.Description}</p>
      <div>
        <button onClick={handleGenerateReportClick}>Generate Report</button>
        <button onClick={handleTriggerPowerAutomateFlow}>Trigger Power Automate</button>
      </div>
    </div>
  );
};

export default Template;
