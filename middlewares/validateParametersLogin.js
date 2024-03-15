const validparameters = (req, res, next) => {
  const { user } = req.body;
  if (!user.email) {
    return res.status(400).json({ error: "missing email" });
  }
  if (!user.password) {
    return res.status(400).json({ error: "missing password" });
  }
  next();
};

export { validparameters };
