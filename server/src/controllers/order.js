import dotenv from "dotenv";
import Order from "../models/order";
import User from "../models/user";
import { orderSchema } from "../schemas/order";
dotenv.config();

export const getAll = async (req, res) => {
  const {
    _limit = 10,
    _sort = "createAt",
    _order = "ascend",
    _page = 1,
    _q = "",
  } = req.query;
  const options = {
    sort: { [_sort]: _order === "descend" ? -1 : 1 },
    limit: _limit,
    populate: [
      {
        path: "products.product_id",
        select: ["name", "price", "images"],
      },
      { path: "user", select: ["email", "name", "_id"] },
    ],
    page: _page,
    options: { $text: { $search: _q } },
  };
  try {
    const orders = await Order.paginate({}, options);
    if (orders.length === 0) {
      return res.status(404).json({
        message: "Không có don hang nào",
        data: [],
      });
    }
    return res.json({
      message: "Lấy danh sách don hang thành công",
      data: orders,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate([
      {
        path: "categories",
        select: "name",
      },
      { path: "images" },
    ]);
    if (!product) {
      return res.json({
        message: "Không tìm thấy sản phẩm",
        data: {},
      });
    }
    res.json({
      message: "Lấy sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const create = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error)
      return res.status(400).json({
        message: error.details[0].message,
      });
    const order = await Order.create({ status: "verify", ...req.body });
    if (!order) {
      return res.status(404).json({
        message: "Dat hang không thành công",
      });
    }
    await User.findByIdAndUpdate(req.body.user, {
      $addToSet: { orders: order._id },
    });
    return res.json({
      message: "Dat hang thành công",
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const update = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error)
      return res.status(400).json({
        message: error.details[0].message,
      });
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!product) {
      return res.json({
        message: "Cập nhật sản phẩm không thành công",
      });
    }
    product.categories.forEach(async (category) => {
      try {
        await Category.findByIdAndUpdate(category._id, {
          $addToSet: { products: product._id },
        });
      } catch (error) {
        return res.status(404).json({
          message: error.message,
        });
      }
    });
    await Type.findByIdAndUpdate(req.body.type, {
      $addToSet: { products: product._id },
    });
    res.json({
      message: "Cập nhật sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const product = await Product.deleteOne(
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
      product,
      status: "success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
