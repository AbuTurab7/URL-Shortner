import express from "express";
import { join } from "path";
import router from "./Routes/shortner.routes.js";

const app = express();
app.set("view engine" , "ejs");
const staticPath = join(import.meta.dirname, "public");

app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));
app.use(router);


app.listen(2000, () => {
  console.log("Server is running on PORT : 2000");
});
