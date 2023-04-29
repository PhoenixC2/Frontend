import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

export default function Paginate(props) {
	// Here we use item offsets; we could also use page offsets
	// following the API or data you're working with.
	const [itemOffset, setItemOffset] = useState(0);

	// Simulate fetching items from another resources.
	// (This could be items from props; or items loaded in a local state
	// from an API endpoint with useEffect and useState)
	const endOffset = itemOffset + props.itemsPerPage;
	const currentItems = props.data.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(props.data.length / props.itemsPerPage);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		const newOffset =
			(event.selected * props.itemsPerPage) % props.data.length;
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setItemOffset(newOffset);
	};

	return (
		<>
			<props.content data={currentItems} />

			<ReactPaginate
				className="pagination"
				previousClassName="page-item"
				previousLinkClassName="page-link"
				previousAriaLabel="previous"
				nextClassName="page-item"
				nextLinkClassName="page-link"
				pageClassName="page-item"
				pageLinkClassName="page-link"
				activeClassName="active"
				nextAriaLabel="next"
				breakLabel="..."
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				renderOnZeroPageCount={null}
			/>
		</>
	);
}
