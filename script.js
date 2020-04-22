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
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
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
                value: document.querySelector(DomString.inputValue).value
            };

        },
        addListItem: function(obj, type) {
            var html, newHTML, element;
            // create HTML string with placeholder


            if (type === 'inc') {
                element = DomString.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description"> %D% </div><div class="right clearfix"><div class="item__value" > %value% </div> <div class="item__delete" ><button class="item__delete--btn" > <i class="ion-ios-close-outline"> </i></button></div> </div> </div>'
            } else if (type === 'exp') {
                element = DomString.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description"> %D% </div> <div class="right clearfix"><div class="item__value" > %value% </div> <div class="item__percentage" >21%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"> </i></button ></div> </div> </div>'
            }

            // replace the placeholder text with actual data
            newHTML = html.replace('%id%', obj.id);
            newHTML = html.replace('%D%', obj.description);
            newHTML = html.replace('%value%', obj.value);
            // insert the HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

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
    const ctrlEventItem = () => {
        var input, newItem;
        // 1. Get the field input data
        input = UIcontroller.getInput();
        // console.log(inputValue);

        // 2. Add the item to the budget
        newItem = budgetctrl.addItem(input.type, input.description, input.value);
        // 3. add the item to the UI
        UIctrl.addListItem(newItem, input.type);
        // 4. calculate the budget

        // 5. display the budget on the UI

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
