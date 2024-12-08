class LuckyNumberController {
  getLuckyNumber(req, res) {
    const number = Math.floor(Math.random() * 100) + 1;
    let message = "";

    if (number > 80) {
      message = "Wow! That's a very lucky number!";
    } else if (number < 20) {
      message = "Don't worry, tomorrow will be better!";
    }

    res.json({
      statusCode: 200,
      number: number,
      message: message,
    });
  }
}

module.exports = new LuckyNumberController();
