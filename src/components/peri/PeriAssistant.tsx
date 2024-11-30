import React, { useState, useRef } from 'react';
import * as icons from 'lucide-react';
import { usePatientStore } from '../../store/patientStore';
import { useCaseStore } from '../../store/caseStore';
import { useTimelineStore } from '../../store/timelineStore';
import { getOpenAI } from '../../services/openai';
import { generateExcelReport } from '../../lib/reports/excel';

export default function PeriAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversation, setConversation] = useState<Array<{
    role: 'user' | 'assistant';
    content: string;
    data?: any;
  }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { patients } = usePatientStore();
  const { cases } = useCaseStore();
  const { events } = useTimelineStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isProcessing) return;

    setIsProcessing(true);
    const userQuery = query;
    setQuery('');
    setConversation(prev => [...prev, { role: 'user', content: userQuery }]);

    try {
      const openai = getOpenAI();
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are Peri, an AI assistant for a personal injury EHR system. 
                     Analyze the provided data and respond to queries.
                     Available data: ${JSON.stringify({ patients, cases, events })}`,
          },
          { role: 'user', content: userQuery },
        ],
        temperature: 0.3,
      });

      const response = completion.choices[0]?.message?.content || 'Sorry, I could not process your request.';
      const processedData = processResponse(response);
      
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: response,
        data: processedData
      }]);
    } catch (error) {
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error processing your request.' 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const processResponse = (response: string) => {
    try {
      if (response.includes('```json')) {
        const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[1]);
        }
      }
    } catch (error) {
      console.error('Error parsing response data:', error);
    }
    return null;
  };

  const exportData = async (data: any) => {
    const buffer = generateExcelReport(data, {
      title: 'Peri Generated Report',
      author: 'PERI System',
      date: new Date(),
      type: 'custom',
    });

    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'peri-report.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700"
      >
        <icons.MessageSquare className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[600px] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Peri Assistant</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversation.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p>{msg.content}</p>
                    {msg.data && (
                      <div className="mt-2">
                        <button
                          onClick={() => exportData(msg.data)}
                          className="inline-flex items-center px-2 py-1 text-xs bg-white text-gray-700 rounded hover:bg-gray-50"
                        >
                          <icons.FileSpreadsheet className="h-4 w-4 mr-1" />
                          Export Excel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask Peri anything..."
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <icons.Send className="h-5 w-5" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}