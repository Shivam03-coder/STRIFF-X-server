import { app } from "./app";
import { appconfig } from "./configs/appconfig";

(() => {
  app.get("/", (_, res) => {
    res.status(200).json({
      status: "success",
    });
  });

  const server = app.listen(appconfig.PORT, () => {
    console.log(`Server started at http://localhost:${appconfig.PORT}/`);
  });

  const gracefulShutdown = async () => {
    console.log("Shutting down gracefully...");

    if (server) {
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    } else {
      process.exit(1);
    }
  };

  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);
})();
