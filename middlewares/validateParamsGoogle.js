export const validparameters = (req, res, next) => {
    const { google } = req.body;
    if (!google.credential) {
      return res.status(400).json({ error: "missing credential" });
    }
    next();
  };
