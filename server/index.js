const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PORT } = require('./config');
const authMiddleware = require('./middleware/auth');
const { fail } = require('./utils/respond');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/drives', authMiddleware, require('./routes/drives'));
app.use('/api/students', authMiddleware, require('./routes/students'));
app.use((req, res) => fail(res, 404, 'NOT_FOUND', 'Route not found'));

if (require.main === module) {
  app.listen(PORT, () => console.log(`Mock server running on :${PORT}`));
}

module.exports = app;
