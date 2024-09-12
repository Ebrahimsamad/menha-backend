const logger = require('../utils/winstonLogs');

module.exports = (req, res, next) => {
  logger.info(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};
