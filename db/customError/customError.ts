class CustomError {
  public name: string;
  protected status: number;
  protected message: string;

  constructor(name: string, status = 500, message = 'Problem with server') {
    this.name = name;
    this.status = status;
    this.message = message;
  }

  defineCategoryAndProductStatus() {
    if (this.name === 'CastError' || this.name === 'Not such value' || this.name === 'QueryFailedError') {
      this.status = 400;
      this.message = 'Check category or products params';
    }
    if (this.name === 'BSONTypeError' || this.name === 'Not found') {
      this.status = 404;
      this.message = 'Check category or products because such not found';
    }
    return { name: this.name, status: this.status, message: this.message };
  }

  get values() {
    return { name: this.name, status: this.status, message: this.message };
  }

  static forbiddenRequest(message: string) {
    return new CustomError('err', 403, message);
  }

  static unauthorizedRequest(message: string) {
    return new CustomError('err', 401, message);
  }
}

export default CustomError;
