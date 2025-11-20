// import React, { useState } from 'react';

// export default function BugItem({ bug, onUpdate, onDelete }) {
//   const [localStatus, setLocalStatus] = useState(bug.status);
//   const statuses = ['open','in-progress','resolved'];

//   async function changeStatus(e) {
//     const newStatus = e.target.value;
//     setLocalStatus(newStatus);
//     try {
//       await onUpdate(bug._id, { status: newStatus });
//     } catch (err) {
//       console.error('Update failed', err);
//       setLocalStatus(bug.status); // rollback
//     }
//   }

//   return (
//     <li>
//       <h3>{bug.title}</h3>
//       <p>{bug.description}</p>
//       <div>Severity: {bug.severity}</div>
//       <div>
//         Status:
//         <select value={localStatus} onChange={changeStatus} aria-label={`status-${bug._id}`}>
//           {statuses.map(s => <option key={s} value={s}>{s}</option>)}
//         </select>
//       </div>
//       <button onClick={() => onDelete(bug._id)}>Delete</button>
//     </li>
//   );
// }
import React, { useState } from 'react';

export default function BugItem({ bug, onUpdate, onDelete }) {
  const [localStatus, setLocalStatus] = useState(bug.status);
  const statuses = ['open','in-progress','resolved'];

  async function changeStatus(e) {
    const newStatus = e.target.value;
    setLocalStatus(newStatus);
    try {
      await onUpdate(bug._id, { status: newStatus });
    } catch (err) {
      console.error('Update failed', err);
      setLocalStatus(bug.status); // rollback
    }
  }

  // Determine severity color
  const severityColor = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-red-600',
  }[bug.severity] || 'text-gray-600';

  return (
    <li className="p-4 bg-white shadow-md rounded-lg mb-4 flex justify-between items-start">
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-gray-800">{bug.title}</h3>
        <p className="text-gray-600 mt-1">{bug.description}</p>
        <div className={`mt-2 text-sm font-medium ${severityColor}`}>Severity: {bug.severity}</div>
        <div className="mt-2 text-sm text-gray-700">
          Status:
          <select 
            value={localStatus} 
            onChange={changeStatus} 
            aria-label={`status-${bug._id}`}
            className="ml-2 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <button 
        onClick={() => onDelete(bug._id)}
        className="ml-4 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Delete
      </button>
    </li>
  );
}
