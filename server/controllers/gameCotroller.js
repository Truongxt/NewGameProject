import Game from "../models/games.js";

export const getAllGames = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      title,
      genre,
      platform,
      sort,
      priceFrom,
      priceTo,
    } = req.query;
    const query = {};

    if (title) query.title = { $regex: title, $options: "i" };
    if (genre) query.genre = { $regex: genre, $options: "i" };
    if (platform) query.platform = { $regex: platform, $options: "i" };

    if (priceFrom || priceTo) {
      query.price = {};
      if (priceFrom) query.price.$gte = Number(priceFrom);
      if (priceTo) query.price.$lte = Number(priceTo);
    }

    const sortOption = {};
    if (sort) {
      const [field, order] = sort.split("_");
      sortOption[field] = order === "desc" ? -1 : 1;
    }

    const total = await Game.countDocuments(query);
    const games = await Game.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ games, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getGameLimit = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;

    const games = await Game.find().skip(skip).limit(limit);

    return res.status(200).json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách game",
      error: error.message,
    });
  }
};

export const getGameByGenre = async (req, res) => {
  try {
    const { genre, page = 1, limit = 10 } = req.query;

    const query = {};
    if (genre) {
      query.genre = { $regex: genre, $options: "i" };
    }
    const skip = (page - 1) * limit;

    const games = await Game.find(query).skip(skip).limit(Number(limit));

    return res.status(200).json(games);
  } catch (error) {
    console.error("Error fetching games by genre:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách game theo thể loại",
      error: error.message,
    });
  }
};
export const getGameSortByTitle = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const games = await Game.find()
      .sort({ title: 1 })
      .skip(skip)
      .limit(Number(limit));

    return res.status(200).json(games);
  } catch (error) {
    console.error("Error fetching games sorted by title:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách game sắp xếp theo tiêu đề",
      error: error.message,
    });
  }
};
export const getGameByTitle = async (req, res) => {
  try {
    const { title, page = 1, limit = 10 } = req.query;

    const query = {};
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const games = await Game.find(query).skip(skip).limit(Number(limit));

    return res.status(200).json({
      data: games,
    });
  } catch (error) {
    console.error("Error fetching games by title:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách game theo tiêu đề",
      error: error.message,
    });
  }
};
export const getGameById = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findOne({ id: id });
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getGameByParams = async (req, res) => {
  try {
    const {
      title,
      genre,
      platform,
      priceFrom,
      priceTo,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Tìm kiếm theo tiêu đề
    if (title) {
      query.title = { $regex: title, $options: "i" }; // Không phân biệt chữ hoa/thường
    }

    // Tìm kiếm theo thể loại
    if (genre) {
      query.genre = { $regex: genre, $options: "i" };
    }

    // Tìm kiếm theo nền tảng
    if (platform) {
      query.platform = { $regex: platform, $options: "i" };
    }

    // Tìm kiếm theo khoảng giá
    if (priceFrom || priceTo) {
      query.price = {};
      if (priceFrom) query.price.$gte = Number(priceFrom); // Giá >= priceFrom
      if (priceTo) query.price.$lte = Number(priceTo); // Giá <= priceTo
    }

    // Sắp xếp
    const sortOption = {};
    if (sort) {
      const [field, order] = sort.split("_");
      sortOption[field] = order === "desc" ? -1 : 1; // Sắp xếp tăng dần hoặc giảm dần
    }

    // Tính toán skip và limit
    const skip = (page - 1) * limit;


    // Lấy danh sách game
    const games = await Game.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    // Trả về kết quả
    return res.status(200).json(games);
  } catch (error) {
    console.error("Error fetching games by params:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách game theo tham số",
      error: error.message,
    });
  }
};
