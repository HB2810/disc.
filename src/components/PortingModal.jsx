import React from 'react';
export function PortingModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Porting Modal</h2>
        <p>Temporarily disabled during Next.js migration due to JSX parsing errors.</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Close</button>
      </div>
    </div>
  );
}
