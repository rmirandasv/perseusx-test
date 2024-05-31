const addCurrentDate = (people: Person[]): Person[] => {
  return people.map((person) => {
    return {
      ...person,
      date: new Date(),
    };
  });
};

const getActiveRecords = (people: Person[]): Person[] => {
  return people.filter((person) => person.status === "active");
};

const sortByProperty = (people: Person[], property: keyof Person): Person[] => {
  return [...people].sort((a, b) => {
    const aValue = a[property];
    const bValue = b[property];

    // this validation is necessary because the property might not exist
    // in this case, the date property is optional in the Person interface
    if (aValue === undefined) return 1;
    if (bValue === undefined) return -1;

    return aValue > bValue ? 1 : -1;
  });
}

const PERSON_PROPERTIES: Record<keyof Person, string> = {
  name: "Name",
  favoriteFood: "Favorite Food",
  favoriteMovie: "Favorite Movie",
  status: "Status",
  date: "Date",
};

export { addCurrentDate, getActiveRecords, sortByProperty, PERSON_PROPERTIES };
