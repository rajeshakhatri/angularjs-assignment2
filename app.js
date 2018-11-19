(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('AlreadyBoughtController', AlreadyBoughtController)
.controller('ToBuyController', ToBuyController)
.service('ShoppingListService', ShoppingListService);


/* Buy Controller*/
ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(ShoppingListService) {
  var ToBuy = this;
  /* Initalise Buy List with 5 entries. Not sure if this is the correct place to do this. do we need to do this in service function */
  ShoppingListService.addItemtoBuy("cookies", 5);
  ShoppingListService.addItemtoBuy("chips", 5);
  ShoppingListService.addItemtoBuy("coffee", 1);
  ShoppingListService.addItemtoBuy("egg whites", 2);
  ShoppingListService.addItemtoBuy("water bottle", 10);


  ToBuy.itemsBuy = ShoppingListService.getItems();
  //ToBuy.BuyMessage = ShoppingListService.getBuyMessage();

  ToBuy.removeItem = function (itemIndex) {
    ShoppingListService.removeItem(itemIndex);
    ToBuy.BuyMessage = ShoppingListService.getBuyMessage();
    //AlreadyBought.BoughtMessage = ShoppingListService.getBoughtMessage();

    /*  Logic to set the message. Unable to set the message when all entries from Bought List is removed*/
    var llength = ToBuy.itemsBuy.length
    if ( llength > 0 )
      {
       ToBuy.BuyMessage = "."
     }
    else {
      ToBuy.BuyMessage = "Everything is bought"
    }

  };
}

/* Brought Controller*/
AlreadyBoughtController.$inject = ['ShoppingListService'];
function AlreadyBoughtController(ShoppingListService) {
  var AlreadyBought = this;
  AlreadyBought.itemsBought = ShoppingListService.getItemsBought();
  //AlreadyBought.BoughtMessage = "test"

  AlreadyBought.removeItemBought = function (itemIndex) {
    ShoppingListService.removeItemBought(itemIndex);
    AlreadyBought.BoughtMessage = ShoppingListService.getBoughtMessage();
    /* Trying to set the message in To Buy List*/
    ShoppingListService.setBuytMessage(".")

    /*  Logic to set the message. Unable to set the message when all entries from Bought List is removed*/
    var llength = AlreadyBought.itemsBought.length
    if ( llength > 0 )
      {
       AlreadyBought.BoughtMessage = "."
     }
    else {
      AlreadyBought.BoughtMessage = "Nothing Brought Yet"
    }


  };


}

/* Shopping List Service*/
function ShoppingListService() {
  var service = this;

  // List of shopping items to  Buy
  var itemsBuy = [];

  // List of shopping items Bought
  var itemsBought = [];

  // Variable to set message in Bought List to Nothing bought yet
  var BoughtMessage = "";
  // Variable to set message in Bought List to Everythingn is Bought
  var BuyMessage = "";

  /* Method to add initial items to "To Buy: List */
  service.addItemtoBuy = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    itemsBuy.push(item);
  };

  /* Method to add move items to Bought List */
  service.addItemBought = function (itemName, quantity) {
      var itembought = {
        name: itemName,
        quantity: quantity
      };
      itemsBought.push(item);
    };

    /* Method to remove  items from Bought List and move it back to Buy List*/
    service.removeItemBought = function (itemIdex) {

      var item = {
        name: itemsBought[0].name,
        quantity: itemsBought[0].quantity
      };
      itemsBuy.push(item);
      itemsBought.splice(itemIdex, 1);

      var llength =  itemsBuy.length
      var llengthBought =  itemsBought.length

      if(  llength > 0)
        {
            BuyMessage = "not empty"
        }
       else {
           BuyMessage = "Empty"
       }

       // set BoughtMessage based on array length
       if(  llengthBought > 0)
         {
             BoughtMessage = "not empty"
         }
        else {
            BoughtMessage = "Empty"
        }

      };

  /* Method to remove  items from Buy List and Add it to Bought List*/
  service.removeItem = function (itemIdex) {
    var itembought = {
      name: itemsBuy[0].name,
      quantity: itemsBuy[0].quantity
    };
      itemsBought.push(itembought);
      itemsBuy.splice(itemIdex, 1);

      var llength =  itemsBuy.length
      var llengthBought =  itemsBought.length
      //console.log(" array length " + llength + "-" + llengthBought);

      if(  llength > 0)
        {
            BuyMessage = "."
        }
       else {
           BuyMessage = "Everything is bought."
       }

       // set BoughtMessage based on array length
       if(  llengthBought > 0)
         {
             BoughtMessage = "."
         }
        else {
            BoughtMessage = "Nothing is Bought"
        }


  };

  /* Method to return buy List entries*/
  service.getItems = function () {
    return itemsBuy;
  };

  /* Method to return Bought List entries*/
  service.getItemsBought = function () {
    return itemsBought;
  };

 /* Method to return Bought Message, This was to set the message to Nothing Bought Yet*/
  service.getBoughtMessage = function () {
    return BoughtMessage;
  };

/* Method to return Bought Message, This was to set the message to Everything is bought*/
  service.getBuyMessage = function () {
    return BuyMessage;
  };

  /* Method to set Buy message from Bought Controller */
  service.setBuytMessage = function (buyMessage) {
     BuyMessage = buyMessage;
  };
}

})();
