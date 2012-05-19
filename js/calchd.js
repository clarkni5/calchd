"use strict";

var calculator = new Calculator();

var displayOperator;
var displayValue;

$(window).ready(function(){
	adjustLayout();
	$(window).on("resize", adjustLayout);
	
	displayOperator = $(".display .operator");
	
	displayValue = $(".display .value");
	displayValue.text("0");

	
	$("body").on("click", "a[data-key]", function(e) {
		var key = $(this).data("key");
		press(key);
		e.preventDefault();
	});

	
	// Use keydown to capture the escape and backspace key
	$("body").keydown(function(e) {
		var key = null;

		if (e.which == 8) { // backspace
			key = "backspace";
		} else if (e.which == 27) { // escape
			key = "C"; // clear
		}
		
		if (key) {
			press(key);
			e.preventDefault();
		}
	});
	
	// Use keypress for everything else because it normalizes key codes
	$("body").keypress(function(e) {
		var key = null;
		
		if (e.which == 67 || e.which == 99) { // 'c' or 'C'
			key = "C"; // clear
		} else if (e.which == 61 || e.which == 13) { // equals or enter
			key = "=";
		} else if (e.which >= 48 && e.which <= 57) {
			// Numeric
			key = String.fromCharCode(e.which);
		} else if (e.which == 46) { // decimal
			key = ".";
		} else if (e.which == 43) { // add
			key = "+";
		} else if (e.which == 45) { // subtract
			key = "-";
		} else if (e.which == 42) { // multiply
			key = "*";
		} else if (e.which == 47) { // divide
			key = "/";
		}
		
		if (key) {
			press(key);
			e.preventDefault();
		}
	});
});


function adjustLayout() {
	var $keypad = $(".keypad");
	var keypadWidth = $keypad.width("auto").width();
	var keyWidth = $(".clear").outerWidth();
	
	// Make corrections to the keypad and key size to keep the them aligned
	var adjustment = keypadWidth % 4;
	if (adjustment) {
		keypadWidth = keypadWidth - adjustment;
		$keypad.width(keypadWidth);
		
		keyWidth = keypadWidth / 4;

		// Adjust the width of all the keys
		$(".keypad li").each(function() {
			var $this = $(this);
			var width = $this.hasClass("zero") ? 2 * keyWidth : keyWidth;
			$this.width(width);
		});
	}
	
	
	// Adjust keypad height to fit the window
	var bezelHeight = $(".bezel").height();
	var $keypad = $keypad;
	var keypadPosition = $keypad.position();
	var keypadHeight = bezelHeight - keypadPosition.top;
	var keyHeight = keypadHeight / 5;
	
	$keypad.height(keypadHeight);
	$(".keypad li").each(function() {
		$(this).height(keyHeight);
	});
	$(".equals").height(2 * keyHeight);
}

function press(key) {
	var result = calculator.press(key);
	
	displayValue.text(result);
	
	// Provide a visual reminder of which key was rpessed by marking the key as active
	$(".active").removeClass("active"); // remove previously active key
	$("[data-key='" + key + "']").addClass("active");
}