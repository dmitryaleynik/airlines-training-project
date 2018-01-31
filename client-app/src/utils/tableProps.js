export const initializeTableProps = (data) => {
  const defaultPageSize = 5;
  return {
    data: data,
    minRows: data.lenth || 1,
    defaultPageSize,
    showPagination: data.length > defaultPageSize,
  };
};
