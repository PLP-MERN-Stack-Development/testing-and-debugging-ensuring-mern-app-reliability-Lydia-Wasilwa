
// import React, { useEffect, useState } from 'react';
// import { fetchBugs, createBug, updateBug, deleteBug } from './api';
// import BugForm from './components/BugForm';
// import BugList from './components/BugList';
// import ErrorBoundary from './components/ErrorBoundary';

// export default function App() {
//   const [bugs, setBugs] = useState(null);
//   const [error, setError] = useState(null);

//   async function load() {
//     try {
//       const data = await fetchBugs();
//       setBugs(data);
//     } catch (err) {
//       console.error('fetchBugs error', err);
//       setError('Could not load bugs');
//       setBugs([]);
//     }
//   }

//   useEffect(() => { load(); }, []);

//   async function handleCreate(payload) {
//     const newBug = await createBug(payload);
//     setBugs(prev => [newBug, ...(prev || [])]);
//   }

//   async function handleUpdate(id, payload) {
//     const updated = await updateBug(id, payload);
//     setBugs(prev => prev.map(b => (b._id === id ? updated : b)));
//   }

//   async function handleDelete(id) {
//     await deleteBug(id);
//     setBugs(prev => prev.filter(b => b._id !== id));
//   }

//   return (
//     <ErrorBoundary>
//       <div>
//         <h1>Bug Tracker</h1>
//         {error && <div role="alert">{error}</div>}
//         <BugForm onCreate={handleCreate} />
//         <BugList bugs={bugs || []} onUpdate={handleUpdate} onDelete={handleDelete} />
//       </div>
//     </ErrorBoundary>
//   );
// }

import React, { useEffect, useState } from 'react';
import { fetchBugs, createBug, updateBug, deleteBug } from './api';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [bugs, setBugs] = useState(null);
  const [error, setError] = useState(null);

  async function load() {
    try {
      const data = await fetchBugs();
      setBugs(data);
    } catch (err) {
      console.error('fetchBugs error', err);
      setError('Could not load bugs');
      setBugs([]);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(payload) {
    const newBug = await createBug(payload);
    setBugs(prev => [newBug, ...(prev || [])]);
  }

  async function handleUpdate(id, payload) {
    const updated = await updateBug(id, payload);
    setBugs(prev => prev.map(b => (b._id === id ? updated : b)));
  }

  async function handleDelete(id) {
    await deleteBug(id);
    setBugs(prev => prev.filter(b => b._id !== id));
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Bug Tracker</h1>
          {error && (
            <div role="alert" className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          <div className="mb-8">
            <BugForm onCreate={handleCreate} />
          </div>
          <BugList bugs={bugs || []} onUpdate={handleUpdate} onDelete={handleDelete} />
        </div>
      </div>
    </ErrorBoundary>
  );
}
