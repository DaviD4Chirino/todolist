/** Returns a paginated subset of the given array of data. Calculates the
 * correct range of items to display based on the currentPage and itemsPerPage
 * parameters provided.
 *
 * @param {number} currentPage - the current page number
 * @param {number} itemsPerPage - the number of items to display per page
 * @param {any[]} data - the data to paginate
 * @return {{displayData: any[], count: number}} - an object containing the
 *   paginated data and the total number of pages
 * 
 * 
 * @example
 * <ul>
        {displayData.map((num: any, i: number) => (
          <li key={i}>{num.id}</li>
        ))}
      </ul>
      <div className="flex justify-content-end">
        <Pagination
          onChange={(_, page) => setCurrentPage(page)}
          shape="rounded"
          count={count}
          siblingCount={2}
          variant="outlined"
        />
      </div>
    </ul>
 */
export default function usePagination(
  currentPage: number,
  itemsPerPage: number,
  data: any[]
): { displayData: any[]; count: number } {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayData = data.slice(indexOfFirstItem, indexOfLastItem);
  const count = data.length / displayData.length;
  return {
    displayData,
    count,
  };
}
