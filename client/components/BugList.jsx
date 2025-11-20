// import React from 'react';
// import BugItem from './BugItem';

// export default function BugList({ bugs, onUpdate, onDelete }) {
//   if (!bugs) return <div>Loading...</div>;
//   if (bugs.length === 0) return <div>No bugs reported yet.</div>;
//   return (
//     <ul>
//       {bugs.map(b => (
//         <BugItem key={b._id} bug={b} onUpdate={onUpdate} onDelete={onDelete} />
//       ))}
//     </ul>
//   );
// }
import React from 'react';
import BugItem from './BugItem';

export default function BugList({ bugs, onUpdate, onDelete }) {
  if (!bugs) return <div className="text-center py-4 text-gray-500">Loading...</div>;
  if (bugs.length === 0) return <div className="text-center py-4 text-gray-500">No bugs reported yet.</div>;
  return (
    <ul className="space-y-4">
      {bugs.map(b => (
        <BugItem key={b._id} bug={b} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}
