import React, { useState, useEffect } from "react";
import { spfi, SPFx } from "@pnp/sp"; // Import spfi and SPFx

// Import other components
import Template from "./Template";
import ReportGenerator from "../reports/ReportGenerator"; // Import ReportGenerator component

// Interface for template metadata
interface ITemplate {
  Id: number;
  Title: string;
  Description: string;
  // ... other properties as needed
}

const FormsReportsTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<ITemplate[]>([]);

  // Create an instance of spfi to use for SharePoint API calls
  const sp = spfi({ context: {} }).using(SPFx());

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const templates: ITemplate[] = await sp.web.lists
          .getByTitle("Templates") // SharePoint list name for templates
          .items.get();
        setTemplates(templates);
      } catch (error) {
        console.error("Error fetching templates:", error);
        // Handle error, e.g., display an error message to the user
      }
    };

    fetchTemplates();
  }, []);

  const triggerPowerAutomateFlow = (reportData: any) => {
    // Call the triggerPowerAutomateFlow function from ReportGenerator
    ReportGenerator.triggerPowerAutomateFlow(reportData);
  };

  const handleGenerateReport = (templateId: number, reportData: any) => {
    console.log(
      "Generating report for template:",
      templateId,
      "with data:",
      reportData,
    );
    // Add your report generation logic here
  };

  return (
    <div>
      <h1>Report Templates</h1>
      {templates.map((template) => (
        <Template
          key={template.Id}
          template={template}
          onGenerateReport={handleGenerateReport}
          triggerPowerAutomateFlow={triggerPowerAutomateFlow}
        />
      ))}
    </div>
  );
};

export default FormsReportsTemplates;
