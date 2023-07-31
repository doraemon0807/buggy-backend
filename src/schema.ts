import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFiles } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
// const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);
// const typeDefs = mergeTypeDefs(loadedTypes);
// const resolvers = mergeResolvers(loadedResolvers);

// const schema = makeExecutableSchema({ typeDefs, resolvers });

// export default schema;

const loadedTypes = await loadFiles(path.join(__dirname, "**/*.typeDefs.ts"), {
  requireMethod: async (path: string) => {
    return await import(pathToFileURL(path).toString());
  },
});

const loadedResolvers = await loadFiles(
  path.join(__dirname, "**/*.resolvers.ts"),
  {
    requireMethod: async (path: string) => {
      return await import(pathToFileURL(path).toString());
    },
  }
);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);
