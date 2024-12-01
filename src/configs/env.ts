// Type-safe access to environment variables

interface EnvConfig {
  POLYGON_API_KEY: string;
  NODE_ENV: string;
  IS_DEV: boolean;
}

export const env: EnvConfig = {
  POLYGON_API_KEY: import.meta.env.VITE_POLYGON_API_KEY || "",
  NODE_ENV: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
};

// Validate required environment variables
const validateEnv = () => {
  if (!env.POLYGON_API_KEY && env.NODE_ENV === "production") {
    console.error("Missing required VITE_POLYGON_API_KEY environment variable");
  }
};

validateEnv();
