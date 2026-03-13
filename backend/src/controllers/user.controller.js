export const getCurrentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Current user fetched successfully',
    data: req.user,
  });
};

export const getAdminSummary = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Admin access verified',
    data: {
      role: req.user.role,
      email: req.user.email,
    },
  });
};
