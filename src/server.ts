import { app} from "./app";
import config from "./App/config";

async function main() {
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
}
main();
