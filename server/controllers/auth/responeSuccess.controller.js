const responseSuccess = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: req.message,
    data: req.data,
  });
};

module.exports = responseSuccess;
