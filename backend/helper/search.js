const normalizeString = (str) => {
    // Replace accented characters with non-accented equivalents
    const accentsMap = {
        a: /[àáâãäåāă]/g,
        e: /[èéêëēĕ]/g,
        i: /[ìíîïīĭ]/g,
        o: /[òóôõöōŏ]/g,
        u: /[ùúûüūŭ]/g,
        y: /[ýÿ]/g,
        d: /đ/g,
        A: /[ÀÁÂÃÄÅĀĂ]/g,
        E: /[ÈÉÊËĒĔ]/g,
        I: /[ÌÍÎÏĪĬ]/g,
        O: /[ÒÓÔÕÖŌŎ]/g,
        U: /[ÙÚÛÜŪŬ]/g,
        Y: /[ÝŸ]/g,
        D: /Đ/g,
    };

    // Normalize the string
    let normalizedStr = str.trim().toLowerCase();
    Object.keys(accentsMap).forEach((key) => {
        normalizedStr = normalizedStr.replace(accentsMap[key], key);
    });

    return normalizedStr;
};

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
        objectSearch.regex = new RegExp(keyword, "i");
    }

    return objectSearch;
}

export { search };
