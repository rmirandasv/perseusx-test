import { useCallback, useEffect, useState } from 'react'
import { addCurrentDate, getActiveRecords, PERSON_PROPERTIES, sortByProperty } from "./utils/person";

const people: Person[] = [
  {
    name: 'Ronald',
    favoriteFood: 'Burgers',
    favoriteMovie: 'Batman: The Dark Knight',
    status: 'active',
  },
  {
    name: 'Rocky',
    favoriteFood: 'Sushi',
    favoriteMovie: 'Back to The Future',
    status: 'inactive',
  },
  {
    name: 'Miroslav',
    favoriteFood: 'Sushi',
    favoriteMovie: 'American Psycho',
    status: 'active',
  },
  {
    name: 'Donny',
    favoriteFood: 'Singapore chow mei fun',
    favoriteMovie: 'The Princess Bride',
    status: 'inactive',
  },
  {
    name: 'Matt',
    favoriteFood: 'Brisket Tacos',
    favoriteMovie: 'The Princess Bride',
    status: 'active',
  }
]

function App() {
  const [activeRecords, setActiveRecords] = useState<Person[]>([]);
  const [sortedBy, setSortedBy] = useState<keyof Person | null>(null);
  const [showInactive, setShowInactive] = useState(false);

  useEffect(() => {
    const recordsWithDate = addCurrentDate(people);
    const records = getActiveRecords(recordsWithDate);
    records.forEach((record) => {
      console.log(JSON.stringify(record));
    });
    setActiveRecords(records);
  }, []);

  const sort = useCallback((property: keyof Person) => {
    if (sortedBy === property) {
      setActiveRecords([...activeRecords].reverse());
      return;
    }
    const sortedRecords = sortByProperty(activeRecords, property);
    setActiveRecords(sortedRecords);
    setSortedBy(property);
  }, [sortedBy, activeRecords]);

  const toggleInactive = useCallback(() => {
    setShowInactive(!showInactive);
    const records = showInactive ? getActiveRecords(activeRecords) : people;
    setActiveRecords(records);
  }, [showInactive, activeRecords]);

  return (
    <div className="min-h-screen bg-gray-700">
      <nav className="bg-gray-800 w-full p-4">
        <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
          <span className="text-2xl text-gray-100">PerseusX test</span>
          <a href="https://github.com/rmirandasv/perseusx-test" className="text-gray-100 text-sm">View on GitHub</a>
        </div>
      </nav>
      <div className="mt-56 flex items-center justify-center">
        <div className="max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col bg-gray-800 rounded shadow">
          <span className="text-2xl text-gray-100">People</span>
          <span className="text-gray-100 text-sm mb-4">Click on a column header to sort</span>
          <div className="flex flex-row justify-between mb-1">
            <span className="text-gray-100 text-sm">
              sorted by: {sortedBy ? PERSON_PROPERTIES[sortedBy] : 'None'}
            </span>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showInactive"
                name="showInactive"
                checked={showInactive}
                onChange={toggleInactive}
              />
              <label htmlFor="showInactive" className="text-gray-100 text-sm">
                Show Inactive
              </label>
            </div>
          </div>
          <table className="w-full bg-gray-600 rounded">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-500 text-black text-start cursor-pointer" onClick={() => sort('name')}>Name</th>
                <th  className="py-2 px-4 bg-gray-500 text-black text-start cursor-pointer" onClick={() => sort('favoriteFood')}>Favorite Food</th>
                <th  className="py-2 px-4 bg-gray-500 text-black text-start cursor-pointer" onClick={() => sort('favoriteMovie')}>Favorite Movie</th>
                <th className="py-2 px-4 bg-gray-500 text-black text-start cursor-pointer" onClick={() => sort('status')}>Status</th>
              </tr>
            </thead>
            <tbody>
              {activeRecords.length === 0 && (
                <tr>
                  <td className="py-2 px-4 text-center text-gray-100" colSpan={4}>
                    No records found
                  </td>
                </tr>
              )}
              {activeRecords.map((person) => (
                <tr key={person.name}>
                  <td className="py-2 px-4 text-gray-100">{person.name}</td>
                  <td className="py-2 px-4 text-gray-100">{person.favoriteFood}</td>
                  <td className="py-2 px-4 text-gray-100">{person.favoriteMovie}</td>
                  <td className="py-2 px-4 text-gray-100 uppercase">{person.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-1 flex justify-end">
            <span className="text-gray-100 text-sm">Total: {activeRecords.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
