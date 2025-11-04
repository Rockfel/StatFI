import { app } from "./setup/app.js";

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`✅ API up at http://localhost:${port}`);
});
