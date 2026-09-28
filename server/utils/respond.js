const ok = (res, data, message = 'Success', status = 200) =>
  res.status(status).json({ success: true, data, message });

const fail = (res, status, code, message) =>
  res.status(status).json({ success: false, error: { code, message } });

module.exports = { ok, fail };
