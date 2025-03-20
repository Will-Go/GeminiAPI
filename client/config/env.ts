interface EnvConfig {
  apiBaseUrl: string;
}

const envConfig: EnvConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000",
};

export default envConfig;
