import React from 'react';

// Pagination component to handle page navigation
const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
	const pageNumbers = [];

	// Calculate the total number of pages and create an array of page numbers
	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className="pagination-nav">
			<ul className='pagination'>
				{pageNumbers.map(number => (
					<li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
						<button onClick={() => paginate(number)} className='page-link'>
							{number}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
