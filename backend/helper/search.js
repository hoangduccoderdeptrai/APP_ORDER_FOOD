const createVietnameseRegex = (keyword) => {
    const vietnameseMap = {
        a: "[aáàảãạâấầẩẫậăắằẳẵặ]",
        e: "[eéèẻẽẹêếềểễệ]",
        i: "[iíìỉĩị]",
        o: "[oóòỏõọôốồổỗộơớờởỡợ]",
        u: "[uúùủũụưứừửữự]",
        y: "[yýỳỷỹỵ]",
        d: "[dđ]",
    };

    // Replace character in keyword
    let processedKeyword = keyword;
    Object.keys(vietnameseMap).forEach((char) => {
        processedKeyword = processedKeyword.replace(new RegExp(char, "g"), vietnameseMap[char]);
    });

    return processedKeyword;
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
        const processedKeyword = createVietnameseRegex(objectSearch.keyword.toLocaleLowerCase());

        // Use regex to convert
        objectSearch.regex = new RegExp(processedKeyword, "i");
    }

    return objectSearch;
}

export { search };
