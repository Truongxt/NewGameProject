import Game from "../models/games.js";

// GET /api/games
export const getAllGames = async (req, res) => {
  try {
    const { page = 1, limit = 10, title, genre, platform, sort, priceFrom, priceTo } = req.query;
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

export const getGameById = async (req, res) => {
  try {
    const {id} = req.query;
    const game = await Game.findOne({id: id});
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
