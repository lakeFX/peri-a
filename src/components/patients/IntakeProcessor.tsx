import React, { useState } from 'react';
import { Upload, Mail, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { usePatientStore } from '../../store/patientStore';
import { useTimelineStore } from '../../store/timelineStore';
import { processIntakeEmail, processIntakeForm } from '../../services/openai';
import type { Patient } from '../../types/patient';

export function IntakeProcessor() {
  const { addPatient } = usePatientStore();
  const { generateTimeline } = useTimelineStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<Partial<Patient> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEmailProcess = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const emailContent = e.target.value;
    if (!emailContent) return;

    setIsProcessing(true);
    setError(null);

    try {
      const data = await processIntakeEmail(emailContent);
      setExtractedData((prev) => ({ ...prev, ...data }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process email');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    try {
      const text = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsText(file);
      });

      const data = await processIntakeForm(text);
      setExtractedData((prev) => ({ ...prev, ...data }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!extractedData) return;

    try {
      const patientId = await addPatient(extractedData as Patient);
      await generateTimeline(patientId, 'default');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create patient record');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Mail className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium">Process Email Content</h3>
          </div>
          <textarea
            className="w-full h-48 p-3 border rounded-md"
            placeholder="Paste email content here..."
            onChange={handleEmailProcess}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <FileText className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium">Upload Intake Form</h3>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".pdf,.docx,.txt"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <span className="text-sm text-gray-600">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-gray-500 mt-1">
                PDF, DOCX, or TXT files
              </span>
            </label>
          </div>
        </div>
      </div>

      {isProcessing && (
        <div className="flex items-center justify-center text-primary-600">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          <span>Processing document...</span>
        </div>
      )}

      {error && (
        <div className="flex items-center text-red-600 bg-red-50 p-4 rounded-lg">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {extractedData && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Extracted Information</h3>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-auto">
            {JSON.stringify(extractedData, null, 2)}
          </pre>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Create Patient Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
}