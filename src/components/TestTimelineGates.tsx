import React from 'react';
import { TIMELINE_GATES } from '../lib/constants';

export default function TestTimelineGates() {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">Timeline Gates</h2>
      <pre className="bg-gray-50 p-4 rounded-lg overflow-auto">
        {JSON.stringify(TIMELINE_GATES, null, 2)}
      </pre>
    </div>
  );
}