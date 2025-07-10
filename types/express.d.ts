declare namespace Express {
  interface Request {
    rawBody?: string;
    // rawBody?: Buffer;
  }
}
