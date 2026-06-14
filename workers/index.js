import { handleGoImport } from "./go-import.js";
import { handleRepos } from "./repos.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/x/")) {
      return handleGoImport(request);
    }

    return handleRepos(request, env);
  },
};
