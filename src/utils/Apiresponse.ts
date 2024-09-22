class Apiresponse<ApiresponsedataType> {
  statusCode: number;
  message: string;
  status: boolean;
  response: ApiresponsedataType;

  constructor(
    statusCode: number,
    response: ApiresponsedataType,
    message = "Success"
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.response = response;
    this.status = statusCode < 400;
  }
}

export { Apiresponse };
