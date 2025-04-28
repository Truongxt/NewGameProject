import GameKey from "../models/GameKey.js";

export const getAll = async (req, res) => {
  try {
    const keyGamesObject = await GameKey.find();

    return res.status(500).json(keyGamesObject);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi thêm tìm key game"});
  }
};

export const checkKeyGame = async (req, res) => {
  try {
    const { gameId } = req.query;

    const keyGamesObject = await GameKey.findOne({ gameId });

    return res.status(500).json({ quantity: keyGamesObject.gameKeys.length });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi thêm tìm key game"});
      console.log("Lỗi check key game")
  }
};

export const addGameKey = async (req, res) => {
  try {
    const { gameId, newKey } = req.body;

    // Kiểm tra xem gameId đã tồn tại chưa
    let gameKey = await GameKey.findOne({ gameId });

    if (!gameKey) {
      // Nếu chưa tồn tại, tạo mới
      gameKey = new GameKey({ gameId, gameKeys: [newKey] });
    } else {
      // Nếu đã tồn tại, kiểm tra xem key đã tồn tại chưa
      if (gameKey.gameKeys.includes(newKey)) {
        return res.status(400).json({ message: "Key đã tồn tại!" });
      }

      console.log(newKey);
      console.log(gameKey);
      // Thêm key mới vào mảng
      gameKey.gameKeys.push(newKey);
    }

    await gameKey.save();
    res.status(200).json({ message: "Thêm key game thành công!", gameKey });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi thêm key game", error: error.message });
  }
};
