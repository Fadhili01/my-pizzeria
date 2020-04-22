// User Interface Logic
$(document).ready(function(){
    $(".cancelOrder").last().click(function(){
        $(this).parentsUntil("#newOrders").remove();
    });
    $("button#newCreation").click(function(){        
        $("#newOrders").append(formString);
        $(".hideCheckOut").show();
        $(".cancelOrder").last().click(function(){
            $(this).parentsUntil("#newOrders").remove();
        });
    });    
    $("form#ordersForm").submit(function(event){
        event.preventDefault();
        $(".newDesign").each(function(){
            var thisName;
            var thisSize=[];
            var thisCrust=[];
            var thisToppings=[];
            thisName=$(this).find('input#creationName').val();
            $(this).find('input[name="size"]:checked').each(function(){
                thisSize.push(this.value);
            });
            $(this).find('input[name="crust"]:checked').each(function(){
                thisCrust.push(this.value);
            });
            $(this).find('input[name="topping"]:checked').each(function(){
                thisToppings.push(this.value);
            });                       
            orderNames.push(thisName);
            orderSizes.push(thisSize);
            orderCrusts.push(thisCrust);
            orderToppings.push(thisToppings);
        });
        var orderObject=new PizzaOrder(orderNames,orderSizes,orderCrusts,orderToppings);
        $("#newOrders").children().remove();
        $(".hideCheckOut").hide();
        $(".deliveryAddress").remove();
        $(".deliveryAsk").remove();
        ordersDisplay(orderObject);        
        clearOrder(orderObject);
        $(".delivery").remove();        
    });        
});

// Business Logic
function Order(name,size,crust,toppings){
    this.pizzaName=name;
    this.size=size;
    this.crust=crust;
    this.toppings=toppings;
    this.location;
}

function Location(fName,lName,house,estate,area,county){
    this.firstName=fName;
    this.lastName=lName;
    this.houseNumber=house;
    this.estate=estate;
    this.area=area;
    this.county=county;
}

Location.prototype.fullName=function(){
    return this.fName + " " + this.lName;
}

var orderNames=[];
var orderSizes=[];
var orderCrusts=[];
var orderToppings=[];
var orderPrices=[];
var grandTotalsArray=[];

function clearOrder(orderObject){
    for(var index=0; index<=orderObject.size.length+1; index+=1){
        orderObject.pizzaName.pop();
        orderObject.size.pop();
        orderObject.crust.pop();
        orderObject.toppings.pop();
        orderNames.pop();
        orderSizes.pop();
        orderCrusts.pop();
        orderToppings.pop();        
    }
}

function Large(){
    this.Neapolitan=900;
    this.Sicilian=1000;
    this.Stuffed=1050;
    this.Deepdish=1100;
    this.Glutenfree=1400;
    this.Mushrooms=70;
    this.Greenpeppers=70;
    this.Blackolives=70;
    this.Pineapple=80;
    this.Pepperoni=100;
    this.Sausage=120;
    this.Ham=110;
    this.Bacon=140;
    this.Beef=140;
    this.Pork=150;
}

function Medium(){
    this.Neapolitan=700;
    this.Sicilian=800;
    this.Stuffed=850;
    this.Deepdish=900;
    this.Glutenfree=1200;
    this.Mushrooms=60;
    this.Greenpeppers=60;
    this.Blackolives=60;
    this.Pineapple=60;
    this.Pepperoni=90;
    this.Sausage=90;
    this.Ham=100;
    this.Bacon=120;
    this.Beef=120;
    this.Pork=140;
}

function Small(){
    this.Neapolitan=500;
    this.Sicilian=600;
    this.Stuffed=650;
    this.Deepdish=700;
    this.Glutenfree=1000;
    this.Mushrooms=50;
    this.Greenpeppers=50;
    this.Blackolives=50;
    this.Pineapple=50;
    this.Pepperoni=60;
    this.Sausage=80;
    this.Ham=90;
    this.Bacon=100;
    this.Beef=100;
    this.Pork=130;
}

function totalPrice(){
    var total=0;
    orderPrices.forEach(function(orderPrice){
        total=total+orderPrice;
    });
    clearOrderPrices();
    grandTotalsArray.push(total);
    return total;
}

function grandTotalPrice(){
    var total=0;
    grandTotalsArray.forEach(function(grandTotal){
        total=total+grandTotal;
    });
    var totalAndDelivery=total+200;
    return totalAndDelivery;
}

function clearOrderPrices(){
    for(var index=0; index<=orderPrices.length+1;index+=1){
        orderPrices.pop();
    }
}

function ordersDisplay(orderObject){
    $(".yourOrder").show()
    
    for(var orderNum=0; orderNum<orderObject.size.length; orderNum+=1){
        var pizzaTitle=orderObject.pizzaName[orderNum];
        var orderQuantity=orderObject.size[orderNum];
        var orderLayer=orderObject.crust[orderNum];
        var orderTop=orderObject.toppings[orderNum];
        var orderPrice=priceDeterminer(orderQuantity,orderLayer,orderTop);                
        $("#output").append('<div class="col-12 col-md-6 col-lg-3 padTop">'+
                                        '<div class="order-bg-color">'+
                                            '<h5>Order: '+(orderNum+1).toString()+'</h5>'+
                                            '<h6>Pizza name</h6>'+
                                            '<p>'+pizzaTitle+'</p>'+
                                            '<h6>Size</h6>'+
                                            '<p>'+orderQuantity.join(", ")+'</p>'+
                                            '<h6>Crust</h6>'+
                                            '<p>'+orderLayer.join(", ")+'</p>'+
                                            '<h6>Toppings</h6>'+
                                            '<p>'+orderTop.join(", ")+'</p><br><br><br>'+
                                            '<div class="bottom-align">'+
                                                '<strong><h6>Price</h6></strong>'+
                                                '<p>Ksh. '+orderPrice+'<p>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>');
    }
    var orderTotals=totalPrice();
    $("#output").append('<div class="col-12 padTop">'+
                                    '<div>'+
                                        '<span id="orderTotals">Total: Ksh. '+orderTotals+'</span><br><br>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="col-12 deliveryAsk">'+
                                    '<span id="question">Would you like your orders to be delivered at an extra fee of Ksh. 350? </span>'+
                                    '<button type="button" class="btn btn-sm btn-outline-secondary yes">Yes</button>'+
                                    ' '+
                                    '<button type="button" class="btn btn-sm btn-secondary no">No</button>'+
                                '</div>');
    $(".no").click(function(){
        $(".deliveryAsk").remove();
        $(".delivery").remove();
    });
    $(".yes").click(function(){        
        $(".deliveryAsk").remove();
        $(".delivery").remove();
        $(".yourOrder").append('<div class="delivery">'+
                                    '<div class="row">'+
                                        '<div class="col-12">'+
                                            '<form id="deliveryForm">'+
                                                '<h3>Your Delivery Details</h3>'+
                                                '<div class="form-group">'+
                                                    '<input type="text" class="form-control" id="firstName" placeholder="First Name" required>'+
                                                '</div>'+
                                                '<div class="form-group">'+
                                                    '<input type="text" class="form-control" id="lastName" placeholder="Last Name" required>'+
                                                '</div>'+
                                                '<div class="form-group">'+
                                                    '<input type="text" class="form-control" id="house" placeholder="House Number" required>'+
                                                '</div>'+
                                                '<div class="form-group">'+
                                                    '<input type="text" class="form-control" id="estate" placeholder="Estate" required>'+
                                                '</div>'+
                                                '<div class="form-group">'+
                                                    '<input type="text" class="form-control" id="area" placeholder="Area" required>'+
                                                '</div>'+
                                                '<div class="form-group">'+
                                                    '<input type="text" class="form-control" id="county" placeholder="County" required>'+
                                                '</div>'+
                                                '<button type="submit" class="btn btn-secondary">Submit</button>'+
                                            '</form>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>');    
        $(document).on("submit","#deliveryForm",function(e){
            e.preventDefault();
            var inputtedFirstName=$("input#firstName").val();
            var inputtedLastName=$("input#lastName").val();
            var inputtedHouse=$("input#house").val();
            var inputtedEstate=$("input#estate").val();
            var inputtedArea=$("input#area").val();
            var inputtedCounty=$("input#county").val();
            $(".deliveryDiv").remove();
            var addressObject=new Address(inputtedFirstName,inputtedLastName,inputtedHouse,inputtedEstate,inputtedArea,inputtedCounty);
            $(".yourOrder").append('<div class="deliveryAddress">'+
                                        '<div class="row">'+
                                            '<div class="col-12">'+
                                                '<h5>Your orders will be delivered to this address after payment:</h5>'+
                                                '<p>Name: '+addressObject.fullName()+'</p>'+
                                                '<p>House: '+addressObject.house+'</p>'+
                                                '<p>Estate: '+addressObject.estate+'</p>'+
                                                '<p>Area: '+addressObject.area+'</p>'+
                                                '<p>Town: '+addressObject.town+'</p><br>'+
                                                '<p>Delivery fee: Ksh. 350</p>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="row">'+
                                            '<div class="col-12">'+
                                                '<span class="grand-total">Total + Delivery: Ksh. '+grandTotalPrice()+'</span>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>');            
            $(this).off(e);
        });
    });    
}

function priceDeterminer(orderQuantity,orderLayer,orderTop){
    var large=new Large();
    var medium=new Medium();
    var small=new Small();
    var orderPrice=0;
    if (orderQuantity[0]==="Large"){
        orderPrice=orderPrice+large[orderLayer[0]];
        orderTop.forEach(function(orderTopp){
            orderPrice=orderPrice+large[orderTopp];
        });
        orderPrices.push(orderPrice);
        return orderPrice;
    }
    else if(orderQuantity[0]==="Medium"){
        orderPrice=orderPrice+medium[orderLayer[0]];
        orderTop.forEach(function(orderTopp){
            orderPrice=orderPrice+medium[orderTopp];
        });
        orderPrices.push(orderPrice);
        return orderPrice;
    }
    else if(orderQuantity[0]==="Small"){
        orderPrice=orderPrice+small[orderLayer[0]];
        orderTop.forEach(function(orderTopp){
            orderPrice=orderPrice+small[orderTopp];
        });
        orderPrices.push(orderPrice);
        return orderPrice;
    }
}

var formString = '<div class="newDesign">'+
                    '<div class="row">'+
                        '<div class="col-12 text-right">'+
                            '<span class="cancelOrder"><span class="fa fa-times-circle"></span></span>'+
                            '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="col-12 form-group">'+
                            '<input id="creationName" type="text" class="form-control" placeholder="Name your creation" required>'+
                        '</div>'+
                    '</div>'+ 
                    '<br>'+
                    '<h2>Select your preferred pizza size:</h2>'+
                        '<div class="radio">'+
                            '<input type="radio" name="size" value="Small" id="small">'+
                            '<label for="small">Small</label>'+
                        '</div>'+
                        '<div class="radio">'+
                            '<input type="radio" name="size" value="Medium" id="medium">'+
                            '<label for="medium">Medium</label>'+
                        '</div>'+
                        '<div class="radio">'+
                            '<input type="radio" name="size" value="Large" id="large">'+
                            '<label for="large">Large</label>'+
                        '</div>'+
                    '<br>'+
                    '<h2>Choose your desired crust:</h2>'+
                    '<div class="row">'+
                        '<table class="table table-borderless table-sm">'+
                            '<thead>'+
                                '<th scope="col"></th>'+
                                '<th scope="col">Small</th>'+
                                '<th scope="col">Medium</th>'+
                                '<th scope="col">Large</th>'+
                            '</thead>'+
                            '<tbody>'+
                                '<tr>'+
                                    '<td>'+
                                        '<div class="radio">'+
                                            '<input type="radio" value="Neapolitan" name="crust" id="neapolitan">'+
                                            '<label for="neapolitan">Neapolitan</label>'+
                                        '</div>'+
                                    '</td>'+
                                    '<td>500</td>'+
                                    '<td>700</td>'+
                                    '<td>900</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td>'+
                                        '<div class="radio">'+
                                            '<input type="radio" value="Sicilian" name="crust" id="sicilian">'+
                                            '<label for="sicilian">Sicilian</label>'+
                                        '</div>'+
                                    '</td>'+
                                    '<td>600</td>'+
                                    '<td>800</td>'+
                                    '<td>1000</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td>'+
                                        '<div class="radio">'+
                                            '<input type="radio" value="Stuffed" name="crust" id="stuffed">'+
                                            '<label for="stuffed">Stuffed</label>'+
                                        '</div>'+
                                    '</td>'+
                                    '<td>650</td>'+
                                    '<td>850</td>'+
                                    '<td>1050</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td>'+
                                        '<div class="radio">'+
                                            '<input type="radio" value="Deepdish" name="crust" id="deep-dish">'+
                                            '<label for="deep-dish">Deep Dish</label>'+
                                        '</div>'+
                                    '</td>'+
                                    '<td>700</td>'+
                                    '<td>900</td>'+
                                    '<td>1100</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td>'+
                                        '<div class="radio">'+
                                            '<input type="radio" value="Glutenfree" name="crust" id="gluten-free">'+
                                            '<label for="gluten-free">Gluten Free</label>'+
                                        '</div>'+
                                    '</td>'+
                                    '<td>1000</td>'+
                                    '<td>1200</td>'+
                                    '<td>1400</td>'+
                                '</tr>'+
                            '</tbody>'+
                        '</table>'+
                    '</div>'+
                    '<br>'+
                    '<h2>Add the toppings that would best suit your creation:</h2>'+
                    '<div class="row">'+
                        '<div class="col-md-6">'+
                            '<table class="table table-borderless table-sm">'+
                                '<thead>'+
                                    '<th scope="col"></th>'+
                                    '<th scope="col">Small</th>'+
                                    '<th scope="col">Medium</th>'+
                                    '<th scope="col">Large</th>'+
                                '</thead>'+
                                '<tbody>'+
                                    '<tr>'+
                                        '<td>'+
                                            '<div class="form-group form-check">'+
                                                '<input type="checkbox" name="toppings" value="Mushrooms" id="mushrooms">'+
                                                '<label for="mushrooms">Mushrooms</label>'+
                                            '</div>'+
                                       '</td>'+
                                        '<td>50</td>'+
                                        '<td>60</td>'+
                                        '<td>70</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>'+
                                            '<div class="form-group form-check">'+
                                                '<input type="checkbox" name="toppings" value="Greenpeppers" id="green-peppers">'+
                                                '<label for="green-peppers">Green Peppers</label>'+
                                            '</div>'+
                                        '</td>'+
                                        '<td>50</td>'+
                                        '<td>60</td>'+
                                        '<td>70</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>'+
                                            '<div class="form-group form-check">'+
                                                '<input type="checkbox" name="toppings" value="Blackolives" id="black-olives">'+
                                                '<label for="black-olives">Black Olives</label>'+
                                            '</div>'+
                                        '</td>'+
                                        '<td>50</td>'+
                                        '<td>60</td>'+
                                        '<td>70</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>'+
                                            '<div class="form-group form-check">'+
                                                '<input type="checkbox" name="toppings" value="Pineapples" id="pineapples">'+
                                                '<label for="pineapples">Pineapples</label>'+
                                            '</div>'+
                                        '</td>'+
                                        '<td>50</td>'+
                                        '<td>60</td>'+
                                        '<td>80</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>'+
                                            '<div class="form-group form-check">'+
                                                '<input type="checkbox" name="toppings" value="Pepperoni" id="pepperoni">'+
                                                '<label for="pepperoni">Pepperoni</label>'+
                                            '</div>'+
                                        '</td>'+
                                        '<td>60</td>'+
                                        '<td>90</td>'+
                                        '<td>100</td>'+
                                    '</tr>'+
                                '</tbody>'+
                            '</table>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<table class="table table-borderless table-sm">'+
                                '<thead>'+
                                    '<th scope="col"></th>'+
                                    '<th scope="col">Small</th>'+
                                    '<th scope="col">Medium</th>'+
                                    '<th scope="col">Large</th>'+
                                '</thead>'+
                                '<tbody>'+
                                    '<tr>'+
                                        '<td>'+
                                            '<div class="form-group form-check">'+
                                                '<input type="checkbox" name="toppings" value="Sausage" id="sausage">'+
                                                '<label for="sausage">Sausage</label>'+
                                            '</div>'+
                                        '</td>'+
                                        '<td>80</td>'+
                                        '<td>90</td>'+
                                        '<td>120</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>'+
                                            '<div class="form-group form-check">'+
                                                '<input type="checkbox" name="toppings" value="Ham" id="ham">'+
                                                '<label for="ham">Ham</label>'+
                                            '</div>'+
                                        '</td>'+
                                        '<td>90</td>'+
                                        '<td>100</td>'+
                                        '<td>110</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>'+
                                            '<div class="form-group form-check">'+
                                                '<input type="checkbox" name="toppings" value="Bacon" id="bacon">'+
                                                '<label for="bacon">Bacon</label>'+
                                            '</div>'+
                                        '</td>'+
                                        '<td>100</td>'+
                                        '<td>120</td>'+
                                        '<td>140</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>'+
                                            '<div class="form-group form-check">'+
                                                '<input type="checkbox" name="toppings" value="Beef" id="beef">'+
                                                '<label for="beef">Beef</label>'+
                                            '</div>'+
                                        '</td>'+
                                        '<td>100</td>'+
                                        '<td>120</td>'+
                                        '<td>140</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>'+
                                            '<div class="form-group form-check">'+
                                                '<input type="checkbox" name="toppings" value="Pork" id="pork">'+
                                                '<label for="pork">Pork</label>'+
                                            '</div>'+
                                        '</td>'+
                                        '<td>130</td>'+
                                        '<td>140</td>'+
                                        '<td>150</td>'+
                                    '</tr>'+
                                '</tbody>'+
                            '</table>'+
                        '</div>'+
                    '</div>'
                '</div>'