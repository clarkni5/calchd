/*

2 + 2 =
2,2 | +

22 + 2 * 4
22,2,4 | +,*

*/

var defaultValue = 0;
var operators = [];
var numbers = [];
var decimal = false;
var newNumber = true;

var display;

$(window).ready(function(){
	// Adjust keypad height to fit the window
	var bezelHeight = $(".bezel").height();
	var $keypad = $(".keypad");
	var keypadPosition = $keypad.position();
	var keypadHeight = bezelHeight - keypadPosition.top;
	var keyHeight = keypadHeight / 5;
	
	$keypad.height(keypadHeight);
	$(".keypad li").each(function() {
		$(this).height(keyHeight);
	});
	$(".equals").height(2 * keyHeight);
	
	// @todo Readjust height when the viewport size changes
	
	
	display = $(".display");
	display.text(defaultValue);
	
	$("a").click(function(e) {
		var key = $(this).text();
		press(key);
		
		e.preventDefault();
	});
	
	// Use keyup to capture the escape key
	$("body").keyup(function(e) {
		if (e.which == 27) { // escape
			press("C"); // clear
		}
	});
	
	// Use keypress for everything else because it normalizes key codes
	$("body").keypress(function(e) {
		if (e.which == 67 || e.which == 99) { // 'c' or 'C'
			press("C"); // clear
		} else if (e.which == 61 || e.which == 13) { // equals or enter
			press("=");
		} else if (e.which >= 48 && e.which <= 57) {
			// Numeric
			press(String.fromCharCode(e.which));
		} else if (e.which == 46) { // decimal
			press(".");
		} else if (e.which == 43) { // add
			press("+");
		} else if (e.which == 45) { // subtract
			press("-");
		} else if (e.which == 42) { // multiply
			press("*");
		} else if (e.which == 47) { // divide
			press("/");
		}
	});
});


function calc() {
	var result = 0;
	
	if (numbers.length) {
		result = numbers[0];

		for (var i = 0, j = 1; i < operators.length; i++, j++) {
			if (numbers[j] == undefined) {
				break;
			}

			var op = operators[i];

			switch (op) {
				case "add":
					result += numbers[j];
					break;
				case "sub":
					result -= numbers[j];
					break;
				case "prod":
					result *= numbers[j];
					break;
				case "div":
					result /= numbers[j];
					break;
				default:
					//
			}
		}
	}
	
	return result;
}

function press(key) {
	var text = display.text();
	var num = parseFloat(display.text());

	switch (key) {
		case "C":
			operators = [];
			numbers = [];
			decimal = false;
			newNumber = true;
			display.text(defaultValue);
			break;
		case "+":
			operators.push("add");
			numbers.push(num);
			newNumber = true;
			decimal = false;
			display.text(calc());
			break;
		case "-":
			operators.push("sub");
			numbers.push(num);
			newNumber = true;
			decimal = false;
			display.text(calc());
			break;
		case "*":
			operators.push("prod");
			numbers.push(num);
			newNumber = true;
			decimal = false;
			display.text(calc());
			break;
		case "/":
			operators.push("div");
			numbers.push(num);
			newNumber = true;
			decimal = false;
			display.text(calc());
			break;
		case "=":
			numbers.push(num);
			display.text(calc());
			newNumber = true;
			
			// reset
			operators = [];
			numbers = [];
			decimal = false;
			
			break;
		case "+/-":
			display.text(num * -1);
			break;
		case ".":
			if ( ! decimal) {
				if (newNumber) {
					newNumber = false;
					text = "0"; // in this case, we want this to be zero
				}
			
				display.text(text + ".");
				decimal = true;
			}
			break;
		default:
			text = (num == 0 && ! decimal) ? "" : text; // replace the default value
			
			if (newNumber) {
				newNumber = false;
				text = "";
			}
			
			display.text(text + key);
	}
}