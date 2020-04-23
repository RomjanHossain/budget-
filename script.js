const budgetController = (() => {
    const Expenses = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    const Incomes = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(current) {
            sum += current.value;
        });
        data.totals[type] = sum;
    };
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };
    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            // creating new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // creating new item based on 'inc' or 'exp'
            if (type === 'exp') {
                newItem = new Expenses(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Expenses(ID, des, val);
            }
            // push it into our data structure
            data.allItems[type].push(newItem);
            // return the new item
            return newItem;
        },
        calculateBudget: function() {

            // calculate total inc and expense
            calculateTotal('exp');
            calculateTotal('inc');
            // calculate the budget inc-exp
            data.budget = data.totals.inc - data.totals.exp;
            // calculate the parcentage of income
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

        },
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.totals.percentage
            }
        },
        testing: function() {
            console.log(data);
        }
    };

})();



// l;ol

const UIcontroller = (function() {

    const DomString = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'

    };


    return {
        getInput: () => {
            return {
                type: document.querySelector(DomString.inputType).value,
                description: document.querySelector(DomString.inputDescription).value,
                value: parseFloat(document.querySelector(DomString.inputValue).value)
            };

        },
        addListItem: function(obj, type) {
            var html, newHTML, element;
            // create HTML string with placeholder


            if (type === 'inc') {
                element = DomString.incomeContainer;
                html = `<div class="item clearfix" id="income-${obj.id}"><div class="item__description"> ${obj.description} </div><div class="right clearfix"><div class="item__value" >${obj.value}</div> <div class="item__delete" ><button class="item__delete--btn" > <i class="ion-ios-close-outline"> </i></button></div> </div> </div>`;
            } else if (type === 'exp') {
                element = DomString.expensesContainer;
                html = `<div class="item clearfix" id="expense-${obj.id}"> <div class="item__description"> ${obj.description} </div> <div class="right clearfix"><div class="item__value" >${obj.value}</div> <div class="item__percentage" >21%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"> </i></button ></div> </div> </div>`;
            }
            // insert the HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', html);

        },
        clearFields: function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DomString.inputDescription + ',' + DomString.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(c, i, d) {
                c.value = "";
            });
            fieldsArr[0].focus();
        },
        getDomStrings: () => {
            return DomString;
        }
    };
})();


// global app controller
const Controller = ((budgetctrl, UIctrl) => {

    const setEventListener = () => {
        document.querySelector(Dom.inputBtn).addEventListener('click', ctrlEventItem);
        document.addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                ctrlEventItem();
            }
        });
    };


    const Dom = UIctrl.getDomStrings();
    const updateBudget = function() {
        // 1. calculate the budget

        budgetctrl.calculateBudget();
        // 2. return the budget
        var budget = budgetctrl.getBudget();
        // 3. display the budget
        console.log(budget);
    }
    const ctrlEventItem = () => {
        var input, newItem;
        // 1. Get the field input data
        input = UIcontroller.getInput();
        // console.log(inputValue);

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget
            newItem = budgetctrl.addItem(input.type, input.description, input.value);
            // 3. add the item to the UI
            UIctrl.addListItem(newItem, input.type);
            // 4. calculate the budget


            UIctrl.clearFields();
            updateBudget();

        }

    };
    return {
        init: () => {
            console.log('applications is starting with init..........');
            setEventListener();
        }
    };


})(budgetController, UIcontroller);

// call that init F
Controller.init();
