function pagination(query, totalitems, objectPagination) {
    // Get new currentPage
    if (query.page) {
        objectPagination.currentPage = query.page;
    }

    // Skip items
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limit;

    // Calculation number page
    objectPagination.numberPages = Math.ceil(totalitems / objectPagination.limit);
}

export default pagination;
