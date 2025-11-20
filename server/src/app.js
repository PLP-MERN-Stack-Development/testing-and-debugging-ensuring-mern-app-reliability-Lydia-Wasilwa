// const express = require('express');
// const cors = require('cors');
// const authRoutes = require("./routes/auth");
// const bugsRouter = require('./routes/bugs');
// const errorHandler = require('./middleware/errorHandler');
// app.use("/api/auth", authRoutes);

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/bugs', bugsRouter);

// // 404
// app.use((req, res, next) => {
//   res.status(404).json({ message: 'Not Found' });
// });

// // centralized error handler
// app.use(errorHandler);

// module.exports = app;
const express = require('express');
const cors = require('cors');
const authRoutes = require("./routes/auth");
const bugsRouter = require('./routes/bugs');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/bugs', bugsRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use(errorHandler);

module.exports = app;
