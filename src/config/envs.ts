/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
}

const envsSchema = joi.object({
  PORT: joi.number().required().error(new Error('PORT IS REQUIRED')),
  DATABASE_URL: joi.string().required().error(new Error('DATABASE_URL IS REQUIRED')),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  Logger.error(error.message);
  throw new Error(error.message);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  datebaseUrl: envVars.DATABASE_URL,
};
