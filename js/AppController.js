// GLOBAL APP CONTROLLER
(function() {

  var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {

      var DOM = UICtrl.getDOMstrings();
      document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

      document.addEventListener("keypress", function(event) {

        if (event.keyCode === 13 || event.which === 13) {
          event.preventDefault(); // prevents the enter key from also triggering a click event
          ctrlAddItem();
        }
      });

      document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

      document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);

    };

    var updatePercentages = function() {

      var percentages;

      // 1. calculate percentages
      budgetCtrl.calculatePercentages();

      // 2. read percentages from the budget controller
      percentages = budgetCtrl.getPercentages();

      // 3. update the UI with the new percentages
      UICtrl.displayPercentages(percentages);

    };

    var updateBudget = function() {

      var budget;

      // 1. Calculate the budget
      budgetCtrl.calculateBudget();

      // 2. Return the budget
      budget = budgetCtrl.getBudget();

      // 3. Display the budget on the UI
      UICtrl.displayBudget(budget);

    };

    var ctrlAddItem = function() {

      var input, newItem;

      // 1. Get the field input data
      input = UICtrl.getInput();

      if (input.description.length > 0 && !isNaN(input.value) && input.value > 0) {

        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);

        UICtrl.clearFields(); //clear the textboxs

        // 4. Calculate and update budget
        updateBudget();

        // 6. Calculate and update budget
        updatePercentages();

      }

    };

    var ctrlDeleteItem = function(event) {

      var itemID, splitID, type, ID;

      itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

      if (itemID) {

        splitID = itemID.split("-");
        type = splitID[0];
        ID = parseInt(splitID[1]);

        // 1. delete the item from the data structure
        budgetCtrl.deleteItem(type, ID);


        // 2. delete the item from the UI
        UICtrl.deleteListItem(itemID);


        // 3. Update the item from the UI
        updateBudget();

      }

    };

    return {
      init: function() {
        console.log("The application has started...");

        UICtrl.displayMonth();
        UICtrl.displayBudget(budgetCtrl.getBudget());
        setupEventListeners();
      }

    };

  })(budgetController, UIController);

  controller.init();
})();
