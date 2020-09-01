class AppErr {
  constructor(statusCode, message) {
    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startWith('4') ? 'fail' : 'error';
    this.isOperational = true;
  }
}

export default AppErr;
