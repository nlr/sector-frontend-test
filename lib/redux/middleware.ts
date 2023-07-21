import { postsApi } from "./services/postsApi";

const middleware = [postsApi.middleware];

export { middleware };
