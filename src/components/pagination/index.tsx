import { useState } from 'react';
import ReactPaginate from 'react-paginate';
const Pagination = ({ onChange, total, initPageIndex }: { onChange: (pageIndex: number) => void, total: number, initPageIndex?: number }) => {
    const [pageIndex, setPageIndex] = useState(initPageIndex ?? 0);
    const pageSize = 10;
    return (
        <div className="px-6 py-4 flex justify-center relative flex">
            {total > pageSize ?
                <ReactPaginate
                    breakLabel="..."
                    activeLinkClassName="bg-rose-500 text-white border border-rose-500"
                    breakClassName="flex h-10 w-10 items-center justify-center duration-300 rounded-lg text-theme-sm font-medium text-gray-700 hover:ring-rose-500 hover:bg-rose-500 hover:text-white "
                    className="flex  gap-x-3 justify-center absolute bottom-12"
                    pageLinkClassName="flex h-10 w-10 items-center justify-center duration-300 rounded-lg text-theme-sm font-medium text-gray-700 hover:ring-rose-500 hover:bg-rose-500 hover:text-white "
                    nextLabel={
                        <button disabled={pageIndex === Math.ceil(total / pageSize) - 1} className="flex justify-center items-center rounded-lg transition duration-300  w-10 h-10  bg-white hover:bg-rose-500 hover:text-rose-300 ring-1 ring-inset ring-gray-500 hover:ring-rose-500 disabled:opacity-30">
                            <svg
                                className="fill-current"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M17.4175 9.9986C17.4178 10.1909 17.3446 10.3832 17.198 10.53L12.2013 15.5301C11.9085 15.8231 11.4337 15.8233 11.1407 15.5305C10.8477 15.2377 10.8475 14.7629 11.1403 14.4699L14.8604 10.7472L3.33301 10.7472C2.91879 10.7472 2.58301 10.4114 2.58301 9.99715C2.58301 9.58294 2.91879 9.24715 3.33301 9.24715L14.8549 9.24715L11.1403 5.53016C10.8475 5.23717 10.8477 4.7623 11.1407 4.4695C11.4336 4.1767 11.9085 4.17685 12.2013 4.46984L17.1588 9.43049C17.3173 9.568 17.4175 9.77087 17.4175 9.99715C17.4175 9.99763 17.4175 9.99812 17.4175 9.9986Z"
                                    fill=""
                                />
                            </svg>
                        </button>
                    }
                    initialPage={pageIndex}
                    onPageChange={({ selected }) => {
                        onChange(selected);
                        setPageIndex(selected);
                    }}
                    pageRangeDisplayed={2}
                    pageCount={
                        Math.ceil(total / pageSize)
                    }
                    previousLabel={
                        <button
                            disabled={pageIndex === 0}
                            className="flex justify-center items-center rounded-lg transition duration-300  w-10 h-10  bg-white hover:bg-rose-500 hover:text-rose-300 ring-1 ring-inset ring-gray-500 hover:ring-rose-500  disabled:opacity-30"
                        >
                            <svg
                                className="fill-current"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M2.58301 9.99868C2.58272 10.1909 2.65588 10.3833 2.80249 10.53L7.79915 15.5301C8.09194 15.8231 8.56682 15.8233 8.85981 15.5305C9.15281 15.2377 9.15297 14.7629 8.86018 14.4699L5.14009 10.7472L16.6675 10.7472C17.0817 10.7472 17.4175 10.4114 17.4175 9.99715C17.4175 9.58294 17.0817 9.24715 16.6675 9.24715L5.14554 9.24715L8.86017 5.53016C9.15297 5.23717 9.15282 4.7623 8.85983 4.4695C8.56684 4.1767 8.09197 4.17685 7.79917 4.46984L2.84167 9.43049C2.68321 9.568 2.58301 9.77087 2.58301 9.99715C2.58301 9.99766 2.58301 9.99817 2.58301 9.99868Z"
                                    fill=""
                                />
                            </svg>
                        </button>
                    }
                    renderOnZeroPageCount={null}
                /> : null
            }
        </div>
    )
}
export default Pagination;