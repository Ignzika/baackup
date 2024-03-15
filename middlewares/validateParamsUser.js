const validateParametersUser = (req, res, next) => {
  const { user } = req.body;

  if (user.is_banned === true) {
    res.status(401).json({ error: "BanHammer says......You shall not pass" });
  }
  if (!user.rut) {
    res.status(400).json({ error: "RUT no valido" });
  }
  if (!user.name) {
    res.status(400).json({ error: "NAME no valido" });
  }
  if (!user.last_name) {
    res.status(400).json({ error: "LAST_NAME no valido" });
  }
  if (!user.postal_code) {
    res.status(400).json({ error: "POSTAL_CODE no valido" });
  }
  if (!user.password) {
    res.status(400).json({ error: "PASSWORD no valido" });
  }
  if (!user.birth_date) {
    res.status(400).json({ error: "BIRTH_DATE no valido" });
  }
  next();
};
export default { validateParametersUser };
