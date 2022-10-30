const getDatesBetweenTwo = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const currentYear = new Date().getFullYear();

  const dates = [];

  while (startDate <= endDate) {
    if (startDate.getFullYear() === currentYear) {
      dates.push(new Date(startDate));
    }
    startDate.setDate(startDate.getDate() + 1);
  }

  return dates;
};

export default getDatesBetweenTwo;
