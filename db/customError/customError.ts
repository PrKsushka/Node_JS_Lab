class CustomError {
  public name: string;
  protected status: number;
  protected message: string;

  constructor(name: string, status?: number, message?: string) {
    this.name = name;
    this.status = 500;
    this.message = 'Problem with server';
  }

  defineStatus() {
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
}

export default CustomError;
