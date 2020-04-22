const budgetController = (
    function() {
        let x = 234;
        const add = function(a) {
            return x - a;
        }
        return {
            publicTest: function(b) {
                console.log(add(b));
            }
        }
    }
)();

const UIcontroller = (
    function() {

    }
)();

const Controller = (function(budgetctrl, UIctrl) {
    let z = budgetctrl.publicTest(100);
    return {
        anoPub: function() {
            console.log(z);
        }
    }
})(budgetController, UIcontroller);
