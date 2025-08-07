import express from "express";

const run = async () => {
  const app = express();

  app.use(express.json());

  const server = app.listen(`${process.env.PORT ?? 3000}`, () => {
    console.info(
      `Server ready & listening to http://localhost:${
        process.env.PORT || 3000
      }`,
    );
  });

  return { app, server };
};

const main = run();

export default main;
