import dotenv from "dotenv";
import Type from "../models/type";
import { typeSchema } from "../schemas/type";

dotenv.config();

export const getAll = async (req, res) => {
  try {
    const typesOfProduct = await Type.find().populate("subCategories");
    if (typesOfProduct.length === 0) {
      return res.status(404).json({
        message: "Không có danh muc nào",
      });
    }
    return res.json({
      message: "Lấy danh sách sản phẩm thành công",
      data: typesOfProduct,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const create = async (req, res) => {
  try {
    const { error } = typeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const typeOfProduct = await Type.create(req.body);
    if (!typeOfProduct) {
      return res.json({
        message: "Thêm danh mục không thành công",
      });
    }
    return res.json({
      message: "Thêm danh mục thành công",
      typeOfProduct,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const update = async (req, res) => {
  try {
    const { error } = typeSchema.validate(req.body);
    if (error)
      return res.status(400).json({
        message: error.details[0].message,
      });
    const typeOfProduct = await Type.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!typeOfProduct) {
      return res.json({
        message: "Cập nhật sản phẩm không thành công",
      });
    }
    res.json({
      message: "Cập nhật sản phẩm thành công",
      typeOfProduct,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const typeOfProduct = await Type.findById({ _id: req.params.id }).populate(
      "products"
    );
    if (!typeOfProduct) {
      return res.json({
        message: "Không tìm thấy danh muc",
      });
    }
    res.json({
      message: "Lấy danh muc thành công",
      typeOfProduct,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const typeOfProduct = await Type.deleteOne(
      { _id: req.params.id },
      { new: true }
    );
    // if (!product) {
    //     return res.json({
    //         message: "Xóa sản phẩm không thành công",
    //     });
    // }
    res.json({
      message: "Xóa sản phẩm thành công",
      typeOfProduct,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
