export const api = "http://localhost:3000/games";
export const user_api = "http://localhost:5000/users";
export const comment_api = "http://localhost:5000/comments";

//comment
export const comment = async ({ gameId, userEmail, content, responseFor }) => {
  try {
    const response = await fetch(`${comment_api}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameId,
        userEmail,
        content,
        responseFor,
      }),
    });
    return response;
  } catch (err) {
    throw err;
  }
};

//get comment
export const getComment = async ({gameId, responseFor}) => {
  try {
    const response = await fetch(
      responseFor
        ? `${comment_api}/get?gameId=${gameId}&responseFor=${responseFor}`
        : `${comment_api}/get?gameId=${gameId}`,
      { method: "GET" }
    );
    return response;
  } catch (err) {
    throw err;
  }
};
//đăng nhập
export const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${user_api}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return response;
  } catch (err) {
    throw err;
  }
};


export const getCurrentUser = async (token) => {
  try {
    const response = await fetch(`${user_api}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Lỗi xác thực người dùng");
    }

    const data = await response.json();
    return data.user;
  } catch (err) {
    console.error("Lỗi khi lấy người dùng hiện tại:", err.message);
    throw err;
  }
};


export const sendOrderMail = async ({ receiver, orderId }) => {
  try {
    const response = await fetch("http://localhost:5000/orders/send-order-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receiver, orderId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Lỗi khi gửi email đơn hàng");
    }

    return await response.json(); // { message: "Ok" }
  } catch (error) {
    console.error("Lỗi gửi mail:", error);
    throw error;
  }
};


//đổi mật khẩu
export const changePassword = async ({ email, currentPass, newPass }) => {
  try {
    const response = await fetch(`${user_api}/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        currentPass: currentPass,
        newPass: newPass,
      }),
    });

    return response;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

//quên mật khẩu
export const forgetPassword = async ({ email, newPassword }) => {
  try {
    const response = await fetch(`${user_api}/forget-password`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        newPassword: newPassword,
      }),
    });

    return response;
  } catch (err) {
    throw err;
  }
};

//check code xác nhận đặt lại mật khẩu
export const verifyResetCode = async ({ email, code }) => {
  try {
    const response = await fetch(`${user_api}/verify-reset-code`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        code: code,
      }),
    });

    return response;
  } catch (err) {
    throw err;
  }
};

export const getGames = async () => {
  const response = await fetch(api);
  const data = await response.json();
  return data;
};

export const getGameById = async (id) => {
  const response = await fetch(`${api}/${id}`);
  const data = await response.json();
  return data;
};

//start end
export const getGameLimit = async (page, limit) => {
  const response = await fetch(`${api}?_page=${page}&_limit=${limit}`);
  const totalCount = response.headers.get("X-Total-Count");
  const data = await response.json();
  return { data, totalCount };
};

//get game by title

export const getGameByTitle = async (title, page, limit) => {
  const response = await fetch(
    `${api}?title_like=${title}&_page=${page}&_limit=${limit}`
  );
  const totalCount = response.headers.get("X-Total-Count");
  const data = await response.json();
  return { data, totalCount };
};

//get game by genre

export const getGameByGenre = async (genre, page, limit) => {
  const response = await fetch(
    `${api}?genre=${genre}&_page=${page}&_limit=${limit}`
  );
  //lấy số lượng game bỏ qua phần tử _page và _limit
  const totalCount = response.headers.get("X-Total-Count");
  const data = await response.json();
  return { data, totalCount };
};

//sort by title

export const getGameSortByTitle = async (page, limit) => {
  const response = await fetch(
    `${api}?_sort=title&_order=asc&_page=${page}&_limit=${limit}`
  );
  const totalCount = response.headers.get("X-Total-Count");
  const data = await response.json();
  return { data, totalCount };
};

//getGame by params

export const getGameByParams = async (params) => {
  let newAPi = api;
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined) {
      if (key === "priceFrom" || key === "priceTo") {
        if (params["priceFrom"] !== null || params["priceTo"] !== null) {
          newAPi +=
            "&price=" +
            (params["priceFrom"] !== null ? params["priceFrom"] : "") +
            "-" +
            (params["priceTo"] !== null ? params["priceTo"] : "");
        }
      }
      if (key === "platform" || key === "genre") {
        newAPi += `&${key}_like=${params[key]}`;
      }

      if (key === "sort") {
        newAPi += `&_sort=${params[key].split("_")[0]}&_order=${
          params[key].split("_")[1]
        }`;
      }
      if (key === "page" || key === "limit") {
        if (key === "page") {
          newAPi += `?_page=${params[key]}`;
        } else {
          newAPi += `&_limit=${params[key]}`;
        }
      }
    }
  });

  console.log(newAPi);

  const response = await fetch(newAPi);
  const totalCount = response.headers.get("X-Total-Count");
  const data = await response.json();
  return { games: data, total: totalCount };
};

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${user_api}/allUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const addGameKey = async (gameId, newKey) => {
  const response = await fetch("http://localhost:5000/GameKey/add-game-key", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameId, newKey }),
  });
  return response.json();
};

export const getAverageRevenueByMonth = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/orders/get-average-revenue`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Lỗi khi lấy trung bình doanh thu");
    }

    const data = await response.json();
    return data.averageRevenue;
  } catch (error) {
    console.error("Lỗi khi gọi API trung bình doanh thu:", error);
    throw error;
  }
};

export const loginAdmin = async ({ email, password }) => {
  try {
    const response = await fetch(`${user_api}/admin-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Đăng nhập thất bại!");
    }

    return data.user;
  } catch (err) {
    console.error("Lỗi khi lấy người dùng hiện tại:", err.message);
    throw err;
  }
};
//end end
