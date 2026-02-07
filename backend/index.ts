import app from "./src/server";
import { createServer } from "http";

const PORT = process.env.PORT || 3001;

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
      console.log("Server is running on PORT:", PORT);
    });