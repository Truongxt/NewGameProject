export const api = "http://localhost:3000/games";

export const getGames = async () => {
    const response = await fetch(api);
    const data = await response.json();
    return data;
}

export const getGameById = async (id) => {
    const response = await fetch(`${api}/${id}`);
    const data = await response.json();
    return data;
}


//start end
export const getGameLimit = async (page, limit) => {
    const response = await fetch(`${api}?_page=${page}&_limit=${limit}`);
    const totalCount = response.headers.get("X-Total-Count");
    const data = await response.json();
    return { data, totalCount };
}


//get game by title

export const getGameByTitle = async (title, page, limit) => {
    const response = await fetch(`${api}?title_like=${title}&_page=${page}&_limit=${limit}`);
    const totalCount = response.headers.get("X-Total-Count");
    const data = await response.json();
    return { data, totalCount };
}


//get game by genre

export const getGameByGenre = async (genre, page, limit) => {
    const response = await fetch(`${api}?genre=${genre}&_page=${page}&_limit=${limit}`);
    //lấy số lượng game bỏ qua phần tử _page và _limit
    const totalCount = response.headers.get("X-Total-Count");
    const data = await response.json();
    return { data, totalCount };
}


//sort by title

export const getGameSortByTitle = async (page, limit) => {
    const response = await fetch(`${api}?_sort=title&_order=asc&_page=${page}&_limit=${limit}`);
    const totalCount = response.headers.get("X-Total-Count");
    const data = await response.json();
    return { data, totalCount };
}


//getGame by params

export const getGameByParams = async (params) => {
    let newAPi = api;
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined) {
            if (key === "priceFrom" || key === "priceTo") {
                if (params["priceFrom"] !== null || params["priceTo"] !== null) {
                    newAPi += "&price=" + (params["priceFrom"] !== null ? params["priceFrom"] : "") + "-" + (params["priceTo"] !== null ? params["priceTo"] : "");
                }

            }
            if (key === "platform" || key === "genre") {
                newAPi += `&${key}_like=${params[key]}`;
            }

            if (key === "sort") {
                newAPi += `&_sort=${params[key].split("_")[0]}&_order=${params[key].split("_")[1]}`;
            }
            if (key === "page" || key === "limit") {
                if (key === "page") {
                    newAPi += `?_page=${params[key]}`;
                }
                else {
                    newAPi += `&_limit=${params[key]}`;
                }
            }

        }
    });

    console.log(newAPi)

    const response = await fetch(newAPi);
    const totalCount = response.headers.get("X-Total-Count");
    const data = await response.json();
    return { games: data, total: totalCount };
}
//end end
