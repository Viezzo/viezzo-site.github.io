$(document).ready(function() {

    window.displayMode = "Classic";

    window.cocktailDatabase = {
        cocktails : []
    };
    
    window.ingredientDatabase = {
        ingredients : []
    };

    class Cocktail {
        constructor(name, ingredients, garnish, source,
            ASour, ASweet, ABitter, AStrength, AReview, 
            LSour, LSweet, LBitter, LStrength, LReview) {
            this.name = name;
            this.garnish = garnish;
            this.source = source;
            this.ASour = ASour;
            this.ASweet = ASweet;
            this.ABitter = ABitter;
            this.AStrength = AStrength;
            this.AReview = AReview;
            this.LSour = LSour;
            this.LSweet = LSweet;
            this.LBitter = LBitter;
            this.LStrength = LStrength;
            this.LReview = LReview;
            this.sour = (ASour + LSour) / 2;
            this.sweet = (ASweet + LSweet) / 2;
            this.bitter = (ABitter + LBitter) / 2;
            this.strength = (AStrength + LStrength) / 2;
            this.ingredientsList = this.getIngredientsList(ingredients);
            this.picture = this.getPictureName(name);
            this.abv = this.getStrength(ingredients);
            this.base = this.getBase(ingredients);
            this.cost = this.getCost(ingredients);
        }
    
        getCost(theIngredients){
            var theList = theIngredients.split(',');
            
            var finalPrice = 0;
            var totalVolume = 0;
            for (var i = 0; i < theList.length; i++){
                var nameRegex = /\s(.*)/g;
                var thisName = theList[i].trim().match(nameRegex).toString().trim().toLowerCase();
                var volumeRegex = /^\d*\.?\d*/g
                var thisVolume = parseFloat(theList[i].trim().match(volumeRegex));
                var thisObj = getIngredientObject(thisName);
                //if there was an error, append that for easy readability
                if (thisObj === undefined)
                    finalPrice += thisName + ' NOT FOUND';
                else { //otherwise, calculate the %
                    var thisPricePerUnit = thisObj.price;
                    var thisPrice = thisPricePerUnit * thisVolume;
                    if ((thisName.includes('dashes') || thisName.includes('dash') )&& thisName.includes('bitters')){
                        finalPrice += thisPrice/32;       
                        totalVolume += thisVolume/32;
                    }
                    else{
                        finalPrice += thisPrice;       
                        totalVolume += thisVolume;
                    }   
                }
            }
            var totalPrice = (parseInt(finalPrice * 100) / 100);
            return '$' + totalPrice + (' ($' + parseInt(totalPrice * 100/totalVolume)/100 + '/oz)');
        }

        getPictureName(theName){
            var thePathName = ("./images/" + theName.toLowerCase().replaceAll(" ", "_") + ".jpg"); 
            $.get(thePathName)
                .done(function() { 
                    
                }).fail(function() { 
                    thePathName = './images/not_found.jpg';
                })
            return thePathName;
        }
    
        getStrength(theIngredients){
            var theList = theIngredients.split(',');
            
            var totalVolume = 0;
            var alcVolume = 0;

            var finalABV = "";
            for (var i = 0; i < theList.length; i++){
                var nameRegex = /\s(.*)/g;
                var thisName = theList[i].trim().match(nameRegex).toString().trim().toLowerCase();
                var volumeRegex = /^\d*\.?\d*/g
                var thisVolume = parseFloat(theList[i].trim().match(volumeRegex));
                var thisObj = getIngredientObject(thisName);
                //if there was an error, append that for easy readability
                if (thisObj === undefined)
                    finalABV += thisName + ' NOT FOUND';
                else { //otherwise, calculate the %
                    var thisABV = thisObj.abv;
                    var thisAlcVolume = (thisABV/100) * thisVolume;
                    if (thisName.includes('dashes') && thisName.includes('bitters')){
                        totalVolume += thisVolume/32;
                        alcVolume += thisAlcVolume/32;
                    }
                    else{
                        totalVolume += thisVolume;
                        alcVolume += thisAlcVolume;
                    }   
                }
            }
            //calculate ABV if there isn't an error string
            if (finalABV.length == 0)
                finalABV = Math.round((alcVolume/totalVolume) * 100) + "% ABV";
            return finalABV;
        }
    
        getIngredientsList(theIngredients){
            //create readable list of ingredients and their proportions
            return theIngredients;
        }
        
        getBase(theIngredients){
            //find the alcoholic ingredient with the highest proportion
            // return x;
        }
    };

    class Ingredient {
        constructor(name, abv, type, aliases, price) {
            this.name = name;
            this.abv = abv;
            this.type = type;
            this.aliases = aliases; // so you can look up an ingredient by different names
            this.price = price; // price per unit, usually ounces
        }
    }

    function getIngredientObject(ingredientName){
        //get the ingredient from its name
        var db = window.ingredientDatabase.ingredients;
        var foundObj = db.find(item => item.name === ingredientName); 
        //if no ingredient found, find it through its alias
        if (!foundObj){
            var foundObj = db.find(obj => {
                return (obj.aliases).includes(ingredientName);
            })
        }
        return foundObj;
    }

    function getCocktailObject(drinkName){
        //get the ingredient from its name
        var db = window.cocktailDatabase.cocktails;
        var foundObj = db.find(item => item.name === drinkName); 
        //if no ingredient found, find it through its alias
        if (!foundObj){
            foundObj = "COCKTAIL NOT FOUND"
        }
        return foundObj;
    }

    // functions
    $("#sortBy").change(function(){
        displayDrinks();
    });

    $("#displayMode").change(function(){
        window.displayMode = $("#displayMode").val();
        displayDrinks();
    });

    $("#floatSelect").click(function(){
        $(this).css("color", "rgb(41, 41, 41)");
        $("#rowsSelect").css("color", "#c8c8c8");
        
        displayDrinks();
    });
    $("#rowsSelect").click(function(){
        $(this).css("color", "rgb(41, 41, 41)");
        $("#floatSelect").css("color", "#c8c8c8");
        displayDrinks();
    });

    $("#spotifyButton").click(function(){
        $("#spotifyPlaylist").slideToggle();
    });

    $(document.body).on('click', '.pictureContainer' ,function(){
        // var theImg = $(this).find('img');
        // var theText = theImg.next();
        // if (theImg.css("opacity") == 1){
        //     theText.fadeTo( "slow" , 1);
        //     theImg.animate({
        //         opacity: 0.25,
        //         width: "+=10%",
        //         }, 500, function() {});
        // }
        // else {
        //     theText.fadeTo( "slow" , 0);
        //     theImg.animate({
        //         opacity: 1,
        //         width: "-=10%",
        //         }, 500, function() {});
        // }

        // get the name and object of the cocktail that was clicked on
        var drinkName = $(this).parent().find('.drinkName').text();
        var thisDrink = getCocktailObject(drinkName);

        $('#aReview').text(thisDrink.AReview);
        $('#lReview').text(thisDrink.LReview);

        $('#popupSour').text( (thisDrink.ASour + thisDrink.LSour) / 2);
        $('#popupSweet').text( (thisDrink.ASweet + thisDrink.LSweet) / 2);
        $('#popupBitter').text( (thisDrink.ABitter + thisDrink.LBitter) / 2);
        $('#popupStrong').text( (thisDrink.AStrength + thisDrink.LStrength) / 2);

        $('#popupSource').text('This drink is from ' + thisDrink.source);

        var drinkImg = '<img id="popupDrinkPicture" src=' + thisDrink.picture + ' onerror="this.src=\'images/not_found.jpg\';this.onerror=\'\';">' //fallback image if not found
        $('#popupImageContainer').empty(); //remove previous picture
        $('#popupImageContainer').append(drinkImg)

        $('#popup').fadeIn();
        $('#popup-background').fadeIn();

    });


    $('#popup-close').click(function(){
        $('#popup').fadeOut();
        $('#popup-background').fadeOut();
    });

    function createCocktailCard(thisDrink){
        var cardType = "Rows"
        if ($("#floatSelect").css("color") == 'rgb(41, 41, 41)')
            cardType = "Float"

        var newCard = '<div class="drinkCard' 
            + cardType + '">'
            +'<div class="drinkName">' + thisDrink.name + '</div>'
            + formatIngredientsList(thisDrink.ingredientsList)
            +'<div class="drinkCost">' + thisDrink.abv + ' | ' + thisDrink.cost + '</div>'
            + '<div class="pictureContainer">'
                + '<img class="drinkPicture' + cardType + '" src=' + thisDrink.picture + ' onerror="this.src=\'images/not_found.jpg\';this.onerror=\'\';">' //fallback image if not found
            +'</div>';
        +'</div>';

        return newCard;
    }

    function displayDrinks(){

        $('#cardsMenu').empty();
        $('#classicMenu').empty();

        //order list
        var orderOption = $("#sortBy").val();
        var db = window.cocktailDatabase.cocktails;
        if (orderOption == "ABV")
            db.sort((a,b) => (parseFloat(b.abv) - parseFloat(a.abv))); 
        else if (orderOption == "Sour")
            db.sort((a,b) => (parseFloat(b.sour) - parseFloat(a.sour)));
        else if (orderOption == "Sweet")
            db.sort((a,b) => (parseFloat(b.sweet) - parseFloat(a.sweet)));
        else if (orderOption == "Bitter")
            db.sort((a,b) => (parseFloat(b.bitter) - parseFloat(a.bitter))); 
        else if (orderOption == "Strength")
            db.sort((a,b) => (parseFloat(b.strength) - parseFloat(a.strength))); 
        
        for (drink in window.cocktailDatabase.cocktails){
            var thisDrink = window.cocktailDatabase.cocktails[drink];
            var newCard = createCocktailCard(thisDrink)
            $('#cardsMenu').append(newCard)
        }
    
    //   else if (orderOption == "Title"){
    //     window.cocktailDatabase.cocktails.sort((a,b) => (a.title.localeCompare(b.title))); 
    //   }
    //   else if (orderOption == "Key"){
    //     window.cocktailDatabase.cocktails.sort((a,b) => (parseFloat(a.semitone) - parseFloat(b.semitone))); 
    //   }
    //   else if (orderOption == "BPM"){
    //     window.cocktailDatabase.cocktails.sort((a,b) => (parseFloat(a.bpm) - parseFloat(b.bpm))); 
    //   }
    }

    // data
    function createDatabase() {

        // ---- INGREDIENTS FIRST, TO ENSURE COCKTAILS BUILD CORRECTLY ----

        //liquors
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "bourbon", 40, "liquor", ['bourbon'], 1));  
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "rye whiskey", 45, "liquor", ['whiskey'], 1));  
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "barley shochu", 40, "liquor", ['shochu'], 1));
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "singani 63", 40, "liquor", ['singani'], 1.18));
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "gin", 40, "liquor", ["gin", "hendrick's"], 1)); // $25 bottle of gin
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "mezcal", 42, "liquor", ["mezcal"], 1.4));
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "white rum", 41.2, "liquor", ["rum"], 0.67));
            
        //cordials
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "italicus bergamotto", 20, "cordial", ['bergamot liquor'], 1.77));    
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "yellow chartreuse", 40, "cordial", ['chartreuse'], 2.17));    
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "green chartreuse", 55, "cordial", ['chartreuse'], 2.17));   
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "genepy", 45, "cordial", ['genepy'], 1.18));
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "aperol", 11, "cordial", ['aperol'], 0.98));    
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "cointreau", 40, "cordial", ['triple sec'], 1.27));    
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "suze", 20, "cordial", ['suze'], 1.18));   
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "chambord", 16.5, "cordial", ['chambord'], 1.58));           
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "maraschino liqueur", 32, "cordial", ['chambord'], 1.46));     

        //wine
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "lillet blanc", 17, "wine", ['lillet'], 0.87));    
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "dry vermouth", 17, "wine", ['vermouth'], 0.55));    
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "prosecco", 12, "wine", ['prosecco', 'champagne'], 0.71));    
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "port wine", 20, "wine", ['port', 'porto'], 0.78));    

        //bitters
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "orange bitters", 28, "bitters", ['dashes orange bitters', 'dash orange bitters'], 0.25/32)); //28% and $0.25 per oz, but 1 dash is 1/32 oz, so each unit is smaller
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "angostura bitters", 44.7, "bitters", ['dashes angostura bitters', 'dash angostura bitters'], 0.25/32)); //28% and $0.25 per oz, but 1 dash is 1/32 oz, so each unit is smaller
            
        //juices and syrups
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "cardamom", 0, "juice", ['cardamom pods'], 0.25));  
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "grapefruit juice", 0, "juice", ['grapefruit'], 0.75));  
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "yuzu juice", 0, "juice", ['yuzu'], 3.92));  
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "agave nectar", 0, "juice", ['agave'], 0.3));  
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "simple syrup", 0, "juice", ['syrup'], 0.38)); 
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "maple syrup", 0, "juice", ['maple'], 0.55)); 
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "lime juice", 0, "juice", ['lime'], 0.5)); // 4 limes for $1, 1 lime per oz
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "lemon juice", 0, "juice", ['lemon'], 0.75)); // 4 limes for $1, 1 lime per oz
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "pineapple juice", 0, "juice", ['pieces muddled pineapple'], 0.5)); // 4 limes for $1, 1 lime per oz
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "egg white", 0, "juice", ['egg'], 0.05)); // 4 limes for $1, 1 lime per oz
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "soda water", 0, "juice", ['soda'], 0.05)); // 4 limes for $1, 1 lime per oz
        

        // garnishes
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "white peppercorns", 0, "garnish", ['white peppercorn'], 0.05));  
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "basil", 0, "garnish", ['basil'], 0.10));  
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "salt", 0, "garnish", ['salt rim'], 0.01));  
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "shiso leaf", 0, "garnish", ['shiso leaf', 'shiso leaves'], 0.5));  
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "grapefruit peel", 0, "garnish", ['grapefruit peels'], 0.1));  
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "li hing powder", 0, "garnish", ['plum salt'], 0.1));
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "rosemary", 0, "garnish", ['sprig burnt rosemary'], 0.33));
        window.ingredientDatabase.ingredients.push(new Ingredient(
            "luxardo cherry", 0, "garnish", ['maraschino cherries', 'maraschino cherry', 'luxardo cherry', 'luxardo cherries'], 0.44));


        // COCKTAILS
        AReview = "Agree w Lupe, my favorite cocktail of the night. A near-potion. Garnishes help make this like a fruity herbal lemonade. A very light tasting drink that, despite its whiskey content, tastes more like its sweet and sour counterparts. Very balanced and pleasant.";
        LReview = "Super fruity, the whiskey taste is almost nonexistent. Close to a potion.";
        window.cocktailDatabase.cocktails.push(new Cocktail(
            "Lupe's Whiskey Cocktail", "2 Rye Whiskey, 1 Lemon juice, 2 pieces muddled pineapple, 0.25 Agave nectar, 0.25 egg white",
            "1 sprig burnt rosemary",
            "OG",
            6, 6, 3, 6, AReview, 
            6.5, 7.5, 3, 6.5, LReview));

        AReview = "Very good, added 1/2 oz more Lillet to see if it’d be better sweeter but I’d add 1/2 Mezcal next time instead. When garnished with a grapefruit peel rubbed on the rim, creates an amazing aroma. Almost a potion.";
        LReview = "On the bitter side, but also sweet. Would recommend if looking for a sipper. Overall, pretty good.";
        window.cocktailDatabase.cocktails.push(new Cocktail(
            "Mezcal White Negroni", "1 Mezcal, 1 Lillet Blanc, 1 Suze, 2 dashes Orange Bitters",
            "",
            "OG",
            5, 6, 8, 8, AReview, 
            2, 7.5, 7.5, 7.5, LReview));
    
        AReview = "My favorite variation of a margarita.";
        LReview = "N/A";
        window.cocktailDatabase.cocktails.push(new Cocktail(
            "Singani Margarita", "1.5 Singani 63, 0.5 lime juice, 0.5 agave nectar, 0.25 Cointreau",
            "",
            "Singani 63 website",
            0, 0, 0, 0, AReview, 
            0, 0, 0, 0, LReview));

        AReview = "Surprisingly balanced. I prefer it to a classic Negroni: it doesn’t have that pale taste, more smoky (almost like Mezcal) & floral, floral, and citrusy than anything. Great drink, experiment some more with proportions!";
        LReview = "Tastes a bit bitter, but mostly floral, sweet, and a little strong. Would recommend for those who don’t want a bourbon-forward tasting bourbon drink because the flavors blend very well.";
        window.cocktailDatabase.cocktails.push(new Cocktail(
            "Bourbon Negroni", "1.5 Bourbon, 1 Genepy, 0.75 Aperol", 
            "Grapefruit peel",
            "OG",
            4, 7, 6.5, 8, AReview, 
            4, 7.5, 7.5, 7, LReview));
        
        AReview = "Beautiful. I could do with more shochu, but this tastes like a crisp yuzu lemonade. Feel like this could be a favorite for fans of light/herbal cocktails. It’s popular at Angel’s Share, where we got this from.";
        LReview = "A beautiful potion. I would add a bit more shochu and yuzu to make it more bold. As is, it’s very smooth and well-balanced.";
        window.cocktailDatabase.cocktails.push(new Cocktail(
            "Flirtibird", "2 Barley Shochu, 0.5 Yuzu juice, 0.5 Agave nectar, 0 shiso leaf", 
            "Li hing powder, Salt, Shiso leaf",
            "Angel's Share",
            6, 6, 1, 5, AReview, 
            6, 6, 2, 5, LReview));

        AReview = "Imagine an herbal twist between a Margarita and a Martini. Something for those who like herbal, sour, strong-tasting drinks. The Lillet perfectly balances the strong lime and Chartreuse flavors.";
        LReview = "One of my all-time favorite drinks. On the stronger side, but when it dilutes with ice it's milder and more palatable for those who don't like very strong drinks. Would recommend if you like Margaritas and lime in general.";
        window.cocktailDatabase.cocktails.push(new Cocktail(
            "Botanical Elixir", "2 Lillet Blanc, 1 Green Chartreuse, 1 Lime juice, 0.5 Gin, 0.5 Simple syrup", 
            "Lime twist",
            "tastingtable.com",
            8, 7.5, 5, 7.5, AReview, 
            8, 7, 5, 7.5, LReview));

        AReview = "Pleasant, light and floral and sweet limeade. Not too strong, try making this with different proportions. Maybe even leave out the vermouth and try different ingredients for contrast. As is, very harmonious, but maybe it could use a bit of something that doesn’t mesh so cleanly because the lime is the standout ingredient.";
        LReview = "Very smooth, tastes like a lemonade. Next time, try more genepy and less lime (or substitute lime for lemon. Lime is better with chartreuse). But overall, very pleasant.";
        window.cocktailDatabase.cocktails.push(new Cocktail(
            "Singani-Genepy", "1.5 Singani 63, 1.5 Genepy, 1 Dry Vermouth, 1 Lime juice", 
            "Mint, Sage",
            "OG",
            7, 7.5, 3, 5, AReview, 
            7.5, 7.5, 2, 5, LReview));

        AReview = "This was Lupe's invention. I made a similar drink but with Mezcal. Lupe's is by far superior. The rum plays much better with the Chambord. It tastes sweet, but contrasted nicely by the sour lemon. And a strong chocolatey raspberry flavor shines.";
        LReview = "Really good light, fruity drink. On the sweeter side, may add more rum for a stronger drink.";
        window.cocktailDatabase.cocktails.push(new Cocktail(
            "Lupe's Rum Cocktail", "2 White Rum, 1 Chambord, 1 Lemon juice, 0.25 Agave nectar", 
            "1 sprig rosemary",
            "OG",
            6, 7.5, 2, 6, AReview, 
            5.5, 7, 2, 6, LReview));

        AReview = "It was okay. The soda was flat and the Champagne I used was less sweet than the Prosecco that's usually recommended.";
        LReview = "A little too sweet. Next time, go heavier on the wine for more bubbles.";
        window.cocktailDatabase.cocktails.push(new Cocktail(
            "Aperol Spritz", "2 Aperol, 2 Prosecco, 1 soda water", 
            "Grapefruit peel",
            "Classic",
            0, 0, 0, 0, AReview, 
            0, 0, 0, 0, LReview));

        
        AReview = 'Really nice! I would write something more descriptive but Lupe just finished the drink. Nice pale "mature" drink. Sour with a bitter aftertaste.';
        LReview = "Simultaneously sweet and bitter, decently strong but not overwhelming. When left to dilute a few minutes, tastes like a lemonade.";
        window.cocktailDatabase.cocktails.push(new Cocktail(
            "Casino", "1.5 Gin, 0.75 Maraschino Liqueur, 0.5 Lemon juice, 1 dash Orange bitters", 
            "Luxardo Cherry",
            "Difford's Guide",
            7.5, 5.5, 8, 8, AReview, 
            5, 6, 7.5, 7, LReview));

        AReview = 'One of my favorites. Perfect for lovers of fruity wine-like drinks. Could replace syrup w/maple syrup for a deeper flavor.';
        LReview = "";
        window.cocktailDatabase.cocktails.push(new Cocktail(
            "Port Collins", "1.5 Whiskey, 0.75 Port Wine, 0.75 Lemon juice, 0.25 Maple syrup", 
            "Lemon peel",
            "Total Wine Cocktail of the Month",
            8.5, 6, 2, 6, AReview, 
            7.5, 7, 2, 6, LReview));

        AReview = "I like the combo between the Chambord and Bourbon: it gives it a chocolatey taste that a Manhattan doesn't usually have. I like it more after swirling the ice a few minutes in.";
        LReview = "Sweet but heavy on the Bourbon. A very strong drink for my taste buds. Would not be my first choice. Recommend if you like Bourbon only. Tastes more balanced as ice dissolves.";
        window.cocktailDatabase.cocktails.push(new Cocktail(
            "French Manhattan", "1.5 Bourbon, 0.5 Chambord, 2 dashes Angostura bitters", 
            "Luxardo Cherry",
            "Drizly",
            6, 8.5, 6, 8, AReview, 
            6, 8.5, 7, 8, LReview));
        
        AReview = "Boozy but light, really pleasant to drink and look at.";
        LReview = "On the bitter side, but tastes refreshing and light.";
        window.cocktailDatabase.cocktails.push(new Cocktail(
            "Pink Potion", "1 Gin, 0.75 Italicus Bergamotto, 0.5 Yellow Chartreuse, 0.75 Grapefruit juice, 0.75 Lemon juice, 0 Cardamom, 0 Basil", 
            "Grapefruit peel",
            "OG",
            7, 7, 7, 6, AReview, 
            6.5, 7, 8, 6, LReview));
    }

    // on startup
    createDatabase();
    displayDrinks();

    //helper functions

    function formatIngredientsList(ingredientsList) {
        if (window.displayMode == "Classic"){

            var ingredients = ingredientsList.split(',');
            theList = "";
            var regex = /\s(.*)/g;
            //concatenate each ingredient without the quantities. remove the "dashes" in bitters
            for (item in ingredients)
                theList += ingredients[item].toLowerCase().trim().replace("dashes", "").replace("dash", "").replace("pieces muddled", "").match(regex) + ', ';
            //trim off last comma
            theList = theList.slice(0, -2); 
            return '<div class="drinkIngredientsList">' + theList + '</div>';
        }
        else {
            var theList = "<ul class=drinkIngredientsBullets>";
            var ingredients = ingredientsList.split(',');
            // add bullet to list per ingredient
            for (item in ingredients)
                theList += '<li>' + ingredients[item].toLowerCase() + '</li>';
            theList += '</ul>\n';
            return theList;
        }
    }

});
