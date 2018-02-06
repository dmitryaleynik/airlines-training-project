export const immutableSplice = (array, start, deleteCount, ...values) => {
  if (!deleteCount) {
    deleteCount = 0;
  }
  return [
    ...array.slice(0, start),
    ...values,
    ...array.slice(start + deleteCount),
  ];
};

export const immutablePush = (array, ...values) => {
  return [...array, ...values,];
};
