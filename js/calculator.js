"use strict";

/**
 * A simple calculator class that can handle input one key at a time.
 */
function Calculator() {
	this.init = function() {
		this.input = null;
		this.b = 0; // remember the previous input value
		this.operand = null;
		this.total = 0;
		this.first = true; // ready to input the first value
	}
	this.init();

	/**
	 * Set (or override) the current operand.
	 */
	this.setOperand = function(operand) {
		// Update the total before setting the new operand
		if (this.input !== null) {
			this.calc();
			this.input = null; // ready for a new input value
		}

		this.operand = operand;
		this.first = false;
		
		return this.total;
	}

	/**
	 * Calculations generally follow this simple formula:
	 *   total = a <operand> b
	 *
	 * The value of 'a' is normally the current running total and the value of 'b'
	 * is normally the most recent number value.
	 *
	 * When in doubt, the bahavior has been made to mimic the Texas Instruments 
	 * Math Explorer TI-12 calculator. In particular, the expected behavior of the
	 * following sequence is not well defined: 2 + 3 = 14 =
	 */
	this.calc = function() {
		var a = this.total;
		if (this.first && this.input) {
			a = parseFloat(this.input);
		} else if (this.input) {
			this.b = parseFloat(this.input);
		} else {
			// preform the previous operation
		}
		this.first = false;
		
		switch (this.operand) {
			case "add":
				this.total = a + this.b;
				break;
			case "subtract":
				this.total = a - this.b;
				break;
			case "multiply":
				this.total = a * this.b;
				break;
			case "divide":
				// @todo Prevent division by zero
				this.total = a / this.b;
				break;
			default:
				this.total = a;
		}
		
		// Log the calculation
		if (this.operand) {
			console.log(a + " " + this.operand + " " + this.b + " = " + this.total);
		}
		
		return this.total;
	}
}

/**
 * Press a single key. This allows you to enter numbers one digit at a time.
 *
 * @return String The appropriate display value based on the key.
 */
Calculator.prototype.press = function(key) {
	var result = "";
	
	switch (key) {
		case "c":
		case "C":
			result = this.clear();
			break;
		case "backspace":
			result = this.backspace();
			break;
		case "=":
			result = this.equals();
			break;
		case "+":
			result = this.add();
			break;
		case "-":
			result = this.subtract();
			break;
		case "*":
			result = this.multiply();
			break;
		case "/":
			result = this.divide();
			break;
		case ".":
			// Add a leading zero if necessary
			if (this.input === null) {
				this.input = "0";
			}
			// Make sure the number doesn't already have a decimal
			if (this.input === null || this.input.indexOf(".") === -1) {
				this.input += ".";
			}
			result = this.input;
			break;
		default:
			// Look for a number
			var number = parseInt(key);
			if (!isNaN(number)) {
				if (this.input === null || this.input === "0") {	
					this.input = String(number); // replace
				} else {
					this.input += String(number); // append
				}
				result = this.input;
			}
	}
	
	return result;
}

/**
 * Clear and reset all values. This is the same as pressing the "c" or "C" key.
 *
 * @return String A display value of "0"
 */
Calculator.prototype.clear = function() {
	this.init();
	return String(this.total);
}

/**
 * Remove the last input digit. If the last input was a decimal, then the
 * decimal point will be removed.
 *
 * @return String The updated display value.
 */
Calculator.prototype.backspace = function() {
	if (this.input !== null) {
		if (this.input.length <= 1) {
			this.input = "0";
		} else {
			this.input = this.input.substr(0, this.input.length - 1);
		}
		
		return this.input;
	} else {
		return "0";
	}
}

/**
 * Set the operand to add. This is the same as pressing the "+" key.
 *
 * @return String The current running total.
 */
Calculator.prototype.add = function() {
	return String(this.setOperand("add"));
}

/**
 * Set the operand to subtract. This is the same as pressing the "-" key.
 *
 * @return String The current running total.
 */
Calculator.prototype.subtract = function() {
	return String(this.setOperand("subtract"));
}

/**
 * Set the operand to multiply. This is the same as pressing the "*" key.
 *
 * @return String The current running total.
 */
Calculator.prototype.multiply = function() {
	return String(this.setOperand("multiply"));
}

/**
 * Set the operand to divide. This is the same as pressing the "/" key.
 *
 * @return String The current running total.
 */
Calculator.prototype.divide = function() {
	return String(this.setOperand("divide"));
}

/**
 * Calculate the toal value. This is the same as pressing the "=" key.
 *
 * @return String The total value.
 */
Calculator.prototype.equals = function(key) {
	this.calc();
	this.input = null; // ready for a new input value
	this.first = true; // override the first value if the user does not press an operand
	return String(this.total);
}

/**
 * Returns the current operand.
 *
 * @return String The operand.
 */
Calculator.prototype.getOperand = function() {
	return (this.operand && !this.first) ? this.operand : null;
}