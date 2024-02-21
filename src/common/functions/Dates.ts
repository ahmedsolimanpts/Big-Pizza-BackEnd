function isDateWithinRange(
  dateToCheck: Date,
  startDate: Date,
  endDate: Date,
): boolean {
  return (
    dateToCheck.getTime() >= startDate.getTime() &&
    dateToCheck.getTime() <= endDate.getTime()
  );
}
