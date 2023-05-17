import User from "../models/user.js";

export const getAll = async (req, res) => {
  const {
    _limit = 10,
    _sort = "createAt",
    _order = "ascend",
    _page = 1,
  } = req.query;
  const options = {
    sort: { [_sort]: _order === "descend" ? -1 : 1 },
    limit: _limit,
    populate: "images",
    page: _page,
  };
  try {
    const users = await User.paginate({}, options);
    if (users.length === 0) {
      return res.status(404).json({
        message: "Không có nguoi dung nào",
      });
    }
    return res.json({
      message: "Lấy danh sách nguoi dung thành công",
      users,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).populate({
      path: "images",
    });
    if (!user) {
      return res.json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    res.json({
      message: "Lấy sản phẩm thành công",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

