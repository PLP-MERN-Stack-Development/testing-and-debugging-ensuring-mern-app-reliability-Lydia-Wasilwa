// import React, { useState } from 'react';

// export default function BugForm({ onCreate }) {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [severity, setSeverity] = useState('low');
//   const [error, setError] = useState(null);

//   function validate() {
//     if (title.trim().length < 3) {
//       setError('Title must be at least 3 characters');
//       return false;
//     }
//     setError(null);
//     return true;
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!validate()) return;
//     try {
//       await onCreate({ title, description, severity });
//       setTitle(''); setDescription(''); setSeverity('low');
//     } catch (err) {
//       setError(err.message || 'Failed to create');
//       console.error('BugForm submit error:', err);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} aria-label="bug-form">
//       {error && <div role="alert">{error}</div>}
//       <div>
//         <label>Title
//           <input value={title} onChange={e => setTitle(e.target.value)} />
//         </label>
//       </div>
//       <div>
//         <label>Description
//           <textarea value={description} onChange={e => setDescription(e.target.value)} />
//         </label>
//       </div>
//       <div>
//         <label>Severity
//           <select value={severity} onChange={e => setSeverity(e.target.value)}>
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </label>
//       </div>
//       <button type="submit">Report Bug</button>
//     </form>
//   );
// }
import React, { useState } from 'react';

export default function BugForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('low');
  const [error, setError] = useState(null);

  function validate() {
    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters');
      return false;
    }
    setError(null);
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await onCreate({ title, description, severity });
      setTitle(''); setDescription(''); setSeverity('low');
    } catch (err) {
      setError(err.message || 'Failed to create');
      console.error('BugForm submit error:', err);
    }
  }

  // Define common styles for input elements
  const inputStyle = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <form onSubmit={handleSubmit} aria-label="bug-form" className="space-y-4 max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      {error && (
        <div role="alert" className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            className={inputStyle}
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description
          <textarea 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            rows={3}
            className={inputStyle}
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Severity
          <select 
            value={severity} 
            onChange={e => setSeverity(e.target.value)}
            className={inputStyle}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>
      <button 
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Report Bug
      </button>
    </form>
  );
}
