interface appConfigType {
  DATABASE_URL: string;
  PORT: number;
}

import { config } from "dotenv";
config();

export const appconfig: appConfigType = {
  DATABASE_URL: process.env.DATABASE_URL || "",
  PORT: Number(process.env.PORT),
};
