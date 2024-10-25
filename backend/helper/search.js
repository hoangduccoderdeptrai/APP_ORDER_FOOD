function search(keyword) {
    // Define object search
    let objectSearch = {
        keyword: "",
        regex: "",
    };

    // Get keyword from query
    objectSearch.keyword = keyword;

    // Check if has keyword
    if (objectSearch.keyword) {
        // Use regex to convert
        objectSearch.regex = new RegExp(objectSearch.keyword, "i");
    }

    return objectSearch;
}

export { search };
