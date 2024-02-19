export const MONGO_CONFIGURATION = () => ({
  mongoConnectionString: process.env.MONGO_CONNECTION_STRING as string,
});
