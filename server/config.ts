import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const PUBLIC_URL = process.env.PUBLIC_URL as string;
export const BIND_PORT = Number(process.env.BIND_PORT as string);
