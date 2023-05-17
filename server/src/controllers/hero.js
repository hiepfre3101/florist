import Hero from "../models/hero.js";
import { heroSchema } from "../schemas/hero.js";

export const getAll = async (req, res) => {
  try {
    const heros = await Hero.find();
    if (heros.length === 0) {
      return res.status(404).json({
        message: "Không có banner nào!",
      });
    }
    return res.json({
      message: "Lấy danh sách banner thành công",
      data:heros,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const create = async (req, res) => {
  try {
    const { error } = heroSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const hero = await Hero.create(req.body);
    if (!hero) {
      return res.json({
        message: "Thêm banner không thành công",
      });
    }
    return res.json({
      message: "Thêm banner thành công",
      hero,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
