// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
//plugin bootstrap minus and plus
//http://jsfiddle.net/laelitenetwork/puJ6G/


var ready;
ready = function() {

    $(document).ready(function () {
        (function(){
            new Clipboard('.copy-button');
        })();
        
        /**
         * Changes the amount of player name boxes according to the selection
         **/
        var currentPlayers = 0;
        $("#numberOfPlayers").change(function() {
            var numberOfPlayers = new Number($("#numberOfPlayers option:selected").val());
            if (numberOfPlayers > 0){
                document.getElementById('rolesDiv').style.display = "block";
            } 
            if (numberOfPlayers > currentPlayers){
                for(i = currentPlayers+1; i <= numberOfPlayers; i++) {
                    document.getElementById('playerSection').innerHTML += '<div class="col-sm-6 col-md-6" id="player' + i + '"><div class="input-group input-group-lg fix-margin-bottom"><span class="input-group-addon">' + i + '.</span><input type="text" class="form-control" id="player' + i + 'name" placeholder="Enter Player Name"></div></div>';
                    currentPlayers = numberOfPlayers;
                }  
            } else if (numberOfPlayers < currentPlayers){
                for(i = currentPlayers; i > numberOfPlayers; i--) {
                    var elem = document.getElementById('player' + i);
                    elem.remove();
                    currentPlayers = numberOfPlayers;
                } 
                currentPlayers = numberOfPlayers;
            } 
            checkButton();
        });
        
        
        /**
         * Adds the given card to the deck and displays on the page
         **/
        var currentRoles = 0;
        var pointSum = 0;
        $(document).on('click','.addRoleCard',function() {
            if ($(this).attr("id") != undefined){
                var optionId = $(this).attr("id");
                var points = $(this).attr("points");
                var image = $(this).attr("image");
                var name = $(this).attr("name");
                var roleId = $(this).attr("roleId");
                var align = $(this).attr("align");
                var help = $(this).attr("help");
                var desc = $(this).attr("desc");
    
                currentRoles += 1;
                
                // Display the selected role
                if(!align.localeCompare("Villager")){
                    document.getElementById('roleSection').innerHTML += '<div class="col-md-6 col-sm-6 remove-me"><div help="' + help + '" desc="' + desc + '" roleId="' + roleId + '" name="' + name + '" points="' + points + '" optionId="' + optionId + '" id="role' + currentRoles + '" class="alert alert-info " role="alert">' + currentRoles + '. <i class="fa ' + image + ' %> fa-lg"></i> ' + name + ' (' + points + ') ' + ' - <a href="https://ultimate-werewolf-helper-serenamidori.c9users.io/cards/' + roleId + '" target="_blank">Card Page</a><button type="button" class="btn btn-link btn-xs removeButton"><i class="fa fa-times"></i></button></div></div>'
                } else if (!align.localeCompare("Werewolf")){
                    document.getElementById('roleSection').innerHTML += '<div class="col-md-6 col-sm-6 remove-me"><div help="' + help + '" desc="' + desc + '" roleId="' + roleId + '" name="' + name + '" points="' + points + '" optionId="' + optionId + '" id="role' + currentRoles + '" class="alert alert-danger " role="alert">' + currentRoles + '. <i class="fa ' + image + ' %> fa-lg"></i> ' + name + ' (' + points + ') ' + ' - <a href="https://ultimate-werewolf-helper-serenamidori.c9users.io/cards/' + roleId + '" target="_blank">Card Page</a><button type="button" class="btn btn-link btn-xs removeButton"><i class="fa fa-times"></i></button></div></div>'
                } else {
                    document.getElementById('roleSection').innerHTML += '<div class="col-md-6 col-sm-6 remove-me"><div help="' + help + '" desc="' + desc + '" roleId="' + roleId + '" name="' + name + '" points="' + points + '" optionId="' + optionId + '" id="role' + currentRoles + '" class="alert alert-warning " role="alert">' + currentRoles + '. <i class="fa ' + image + ' %> fa-lg"></i> ' + name + ' (' + points + ') ' + ' - <a href="https://ultimate-werewolf-helper-serenamidori.c9users.io/cards/' + roleId + '" target="_blank">Card Page</a><button type="button" class="btn btn-link btn-xs removeButton"><i class="fa fa-times"></i></button></div></div>'
                }
                
                // Change the visual for point sum of selected roles
                pointSum += new Number(points);
                pointSumColor(pointSum);
                document.getElementById('pointTotal').innerHTML = pointSum;
                
                $(this).addClass("disabled");
                $(this)[0].innerHTML = "Added to deck!";

                checkButton();
            }
        });
        
        /**
         * Recolors the point sum on the page according to the current total
         **/
        function pointSumColor(pointSum){
            if (pointSum > 2 || pointSum < -2){
                document.getElementById('pointTotal').style.color = "red";
            } else {
                document.getElementById('pointTotal').style.color = "green";
            }
        }
        
        /**
         * Checks to see if we can enable the shuffle button
         **/
        function checkButton(){
            // check if number of players == number of selected roles
            if(currentPlayers == currentRoles && currentPlayers != 0){
                document.getElementById('shuffle-btn').classList.remove("disabled");
            } else {
                document.getElementById('shuffle-btn').classList.add("disabled");
            }
        }
        
        /**
         * Removes a selected card from the deck and put it back in the selection box
         **/
        $(document).on('click','.removeButton',function() {
            var points = $(this).closest("div").attr("points");
            pointSum -= points;
            document.getElementById('pointTotal').innerHTML = pointSum;
            pointSumColor(pointSum);
            var optionId = $(this).closest("div").attr("optionId");
            document.getElementById(optionId).classList = "addRoleCard btn btn-success btn-xs";
            document.getElementById(optionId).innerHTML = "Add to deck";
            
            currentRoles -= 1;
            $(this).closest("div").parent().remove();
            fixNumbers();
            checkButton();
        });
        
        /**
         * Take in the roles selected and shuffles them, assigning them out to each named player on the page
         **/
        function shuffleAndAssign(){
            // collapse other divs
            document.getElementById('player-collapse').classList.remove("in");
            document.getElementById('role-collapse').classList.remove("in");
 
            var divs;
            $("#roleSection").each(function(){ 
                divs = $(this).find('div').children('div');
                // Shuffle the roles using the fisher yates algorithm, from http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
                var i = divs.length;
                if ( i == 0 ) return false;
                while ( --i ) {
                  var j = Math.floor( Math.random() * ( i + 1 ) );
                  var tempi = divs[i];
                  var tempj = divs[j];
                  divs[i] = tempj;
                  divs[j] = tempi;
                 }
            }); 

            // Reset the Night Roles section to be all hidden
            document.getElementById('game-play-div').innerHTML = "";
            document.getElementById('modTips').innerHTML = "";
            $("#nightRoleSection").each(function(){
                var divs = $(this).find('p');
                for (i = 0; i < divs.length; i++){
                    divs[i].classList.add("hidden");
                }
            })
            
            // Added shuffled and assigned roles to the third div
            var rolesUsed = [];
            var rolesNum = 0;
            for(i = 0; i < divs.length; i++){
                var help = divs[i].getAttribute("help");
                var roleName = divs[i].getAttribute("name");
                var roleId = divs[i].getAttribute("roleId");
                var number = i + 1;
                var playerId = "player" + number + "name";
                var playerName = document.getElementById(playerId).value;
                if(document.getElementById(playerId).value == "") {
                    playerName = "Player #" + number;
                }
                document.getElementById('game-play-div').innerHTML += '<div id="rolePlayer' + i + '"><div class="alert alert-success" role="alert"></i> <h4>' + playerName + ' the ' + roleName + '</h4> <div class="input-group" id="copyPlayerRole' + i + '"><input class="form-control" id="copyRole' + i + '" value="' + playerName + ', you are a ' + roleName + ' - https://ultimate-werewolf-helper-serenamidori.c9users.io/cards/' + roleId + '" readonly ><span class="input-group-btn"><button class="btn btn-default copy-button" data-clipboard-target="#copyRole' + i + '"><i class="fa fa-clipboard"></i></button></span></div></div></div>';
                
                var dupe = false;
                for(j = 0; j < rolesUsed.length; j++){
                    if(!rolesUsed[j].localeCompare(roleId)){
                        dupe = true;
                    }
                }
                if(!dupe){
                    if (document.getElementById('order-' + roleId)) {
                        document.getElementById('order-' + roleId).classList.remove("hidden");
                    }
                    
                    document.getElementById('modTips').innerHTML += "Your deck contains a <b>" + roleName + ":</b> " + help + "<br><br>";
                    rolesUsed[rolesNum] = roleId;
                    rolesNum++;
                }
            }
            
            // after shuffle is done, scroll to the new div
            document.getElementById('shuffleCardsDiv').scrollIntoView();
        }
        
         
         /**
         * Fixes the visual numbering of selected role cards after removing or shuffling them
         **/
        function fixNumbers(){
            $("#roleSection").each(function(){ 
                var divs = $(this).find('div').children('div');
                var number = 1;
                var offset = 1;
                for (i = 0; i < divs.length; i++){
                    if(divs[i].innerHTML.length != 0){
                        if(!divs[i].innerHTML.substring(2,3).localeCompare(".")){ //if  double digits
                            offset = 2;
                        } else {
                            offset = 1;
                        }
                        var html = divs[i].innerHTML.substring(offset, divs[i].innerHTML.length);
                        divs[i].innerHTML = number + html;
                        number++;
                    }
                }
            }); 
        }
        
        $("#shuffle-btn").click(function() {
            // Disables everything else
            document.getElementById('shuffle-btn').classList.add("disabled");
            document.getElementById('shuffle-btn').innerHTML = '<i class="fa fa-refresh fa-spin fa-2x fa-fw"></i>';
            document.getElementById('rolesDiv').style.display = "none";
            document.getElementById('playersDiv').style.display = "none";
    
            // Shuffles the roles and fixes the numbering
            shuffleAndAssign();
            
            // Enables everything again
            setTimeout(function myFunction() { 
            document.getElementById('shuffle-btn').classList.remove("disabled");
            document.getElementById('shuffle-btn').innerHTML = 'Shuffle and Assign';
            document.getElementById('rolesDiv').style.display = "block";
            document.getElementById('playersDiv').style.display = "block";
            }, 300)
        });
    });

};

$(document).ready(ready);
$(document).on('page:load', ready);

