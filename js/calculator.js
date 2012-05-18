"use strict";

/**
 *
 * All calculations follow this simple formula:
 * total operand input
 *
 * A special case is made for the equals operation. Calling equals more than 
 * once will repeat the last operation.
 */
function Calculator() {
	this.init = function() {
		this.input = null;
		this.b = 0;
		this.operand = null;
		this.total = 0;
		this.first = true; // ready to input the first value
	}
	this.init();

	this.setOperand = function(operand) {
		// Apply the current operation before setting the new operand
		if (this.input !== null) {
			this.calc();
			this.input = null;
		}

		this.operand = operand;
		this.first = false;
		
		return this.total;
	}
	
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
		
		console.log("a: ", a, " b: ", this.b, " operand: ", this.operand, " total: ", this.total);
		
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
		
		return this.total;
	}
}

Calculator.prototype.press = function(key) {
	var result = "";
	
	switch (key) {
		case "c":
		case "C":
			result = this.clear();
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
			// Make sure the number doesn't already have a decimal
			if (this.input === null) {
				this.input = "0";
			}
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

Calculator.prototype.backspace = function() {
	if (this.input.length <= 1) {
		this.input = "0";
	} else {
		this.input = this.input.substr(0, this.input.length - 1);
	}
	
	return this.input;
}

Calculator.prototype.clear = function() {
	this.init();
	return this.total;
}

Calculator.prototype.add = function() {
	return this.setOperand("add");
}

Calculator.prototype.subtract = function() {
	return this.setOperand("subtract");
}

Calculator.prototype.multiply = function() {
	return this.setOperand("multiply");
}

Calculator.prototype.divide = function() {
	return this.setOperand("divide");
}

Calculator.prototype.equals = function(key) {
	this.calc();
	this.input = null;
	this.first = true; // ready to input the first value
	return this.total;
}