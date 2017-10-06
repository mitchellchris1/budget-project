// UI CONTROLLER
var UIController = (function() {

  var DOMstrings = {

    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expensesPercLabel: ".item__percentage",
    dateLabel: ".budget__title--month"

  };

  var formatNumber = function(num, type) {

    var numSplit, intArr, dec, resultArr;

    num = Math.abs(num); // returns the absolute value of a number
    num = num.toFixed(2); // converts number into a string, keeping only two decimals

    numSplit = num.split("."); // divide inputed number in 2 parts: numbers before decimal dot, and numbers AFTER the decimal dot

    intArr = numSplit[0].split(""); // split the number into an array
    dec = numSplit[1];
    resultArr = [];

    for (var i = intArr.length - 1; i >= 0; i--) {

      // then looped backwards over each digit in the array, inserting commas in front of every 3rd digit

      if ((intArr.length - i) % 3 === 1 && i !== intArr.length - 1) {
        resultArr.unshift(",");
      }

      resultArr.unshift(intArr[i]); // adds new items to the beginning of an array

    }

    return (type === "inc" ? '+ ' : "- ") + resultArr.join("") + "." + dec;
    // used the join method to convert the array back into a string.

  };

  var nodeListForEach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  return {

    getInput: function() {

      return {

        type: document.querySelector(DOMstrings.inputType).value, // inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // converts the data type of value from string to float
      };

    },

    addListItem: function(obj, type) {

      var html, newHTML, element;

      // Create HTML string with placeholder text
      if (type === 'inc') {

        element = DOMstrings.incomeContainer;

        html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description"> %description% </div> <div class="right clearfix"> <div class="item__value"> %value% </div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';

      } else if (type === 'exp') {

        element = DOMstrings.expensesContainer;

        html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description"> %description% </div> <div class="right clearfix"> <div class="item__value"> %value% </div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';

      }

      // Replace placeholder text with actual data

      newHTML = html.replace('%id%', obj.id);
      newHTML = newHTML.replace('%description%', obj.description);
      newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));

      // Insert HTML in the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHTML);

    },

    deleteListItem: function(selectorID) {

      var el;

      el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);

    },

    clearFields: function() {

      var fields, fieldsArr;

      fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue);

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });

      fieldsArr[0].focus();

    },

    displayBudget: function(obj) {

      var type;
      obj.budget > 0 ? type = "inc" : type = "exp";

      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, "inc");
      document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, "exp");


      if (obj.percentage > 0) {

        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "%";

      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = "---";
      }

    },

    displayPercentages: function(percentages) {

      var fields;

      fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

      nodeListForEach(fields, function(current, index) {

        if (percentages[index] > 0) {
          current.textContent = percentages[index] + "%";
        } else {
          current.textContent = "---";
        }

      });

    },

    displayMonth: function() {

      var now, month, months, year;

      now = new Date();
      year = now.getFullYear();
      var formatter = new Intl.DateTimeFormat("en", {
        month: "long"
      });
      month = formatter.format(now);

      document.querySelector(DOMstrings.dateLabel).textContent = month + ' ' + year;

    },

    changedType: function() {

      var fields;

      fields = document.querySelectorAll(
        DOMstrings.inputType + "," +
        DOMstrings.inputDescription + "," +
        DOMstrings.inputValue);

      document.querySelector(DOMstrings.inputBtn).classList.toggle("red");

      nodeListForEach(fields, function(cur) {
        cur.classList.toggle("red-focus");
      });

    },

    getDOMstrings: function() {
      return DOMstrings;
    }

  };

})();
