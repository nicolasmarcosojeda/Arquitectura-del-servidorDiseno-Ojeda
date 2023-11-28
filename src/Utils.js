import { fileURLTopath } from "url";
import { dirname } from "path";

const __filename = fileURLTopath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
