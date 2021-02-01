export interface ErrorData {
  status: number;
  requestUrl: string;
  msg: string | ParameterError[];
  code: number;
  httpCode: number;
  errsInfo: number
}
export interface ParameterError {
  message: string;
  code: string;
  field: string
}