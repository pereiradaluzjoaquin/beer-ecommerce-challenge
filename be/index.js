const express = require("express");
const productRoutes = require("./routes/productRoutes");
const app = express();
const port = 3001;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/products", productRoutes);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
