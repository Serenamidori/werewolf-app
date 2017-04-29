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
        var currentPlayers = 0;
        $("#numberOfPlayers").change(function() {
            var numberOfPlayers = new Number($("#numberOfPlayers option:selected").val());
            if (numberOfPlayers > 0){
                document.getElementById('rolesDiv').style.display = "block";
            } 
            if (numberOfPlayers > currentPlayers){
                for(i = currentPlayers+1; i <= numberOfPlayers; i++) {
                    document.getElementById('playerSection').innerHTML += '<div class="input-group input-group-lg fix-margin-bottom" id="player' + i + '"><span class="input-group-addon">' + i + '.</span><input type="text" class="form-control" id="player' + i + 'name" placeholder="Enter Player Name"></div>';
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
        
        var currentRoles = 0;
        var pointSum = 0;
        $("#selectedRoles").change(function() {
            if ($(this).children(":selected").attr("id") != undefined){
                var optionId = $(this).children(":selected").attr("id");
                var points = $(this).children(":selected").attr("points");
                var image = $(this).children(":selected").attr("image");
                var name = $(this).children(":selected").attr("name");
                var roleId = $(this).children(":selected").attr("roleId");
                var align = $(this).children(":selected").attr("align");
                var help = $(this).children(":selected").attr("help");
    
                currentRoles += 1;
                
                // Display the selected role
                if(!align.localeCompare("Villager")){
                    document.getElementById('roleSection').innerHTML += '<div help="' + help + '" roleId="' + roleId + '" name="' + name + '" points="' + points + '" optionId="' + optionId + '" id="role' + currentRoles + '" class="alert alert-info " role="alert">' + currentRoles + '. <i class="fa ' + image + ' %> fa-lg"></i> ' + name + ' (' + points + ') ' + ' - <a href="https://ultimate-werewolf-helper-serenamidori.c9users.io/cards/' + roleId + '" target="_blank">Card Page</a><button type="button" class="btn btn-link btn-xs removeButton"><i class="fa fa-times"></i></button></div>'
                } else if (!align.localeCompare("Werewolf")){
                    document.getElementById('roleSection').innerHTML += '<div help="' + help + '" roleId="' + roleId + '" name="' + name + '" points="' + points + '" optionId="' + optionId + '" id="role' + currentRoles + '" class="alert alert-danger " role="alert">' + currentRoles + '. <i class="fa ' + image + ' %> fa-lg"></i> ' + name + ' (' + points + ') ' + ' - <a href="https://ultimate-werewolf-helper-serenamidori.c9users.io/cards/' + roleId + '" target="_blank">Card Page</a><button type="button" class="btn btn-link btn-xs removeButton"><i class="fa fa-times"></i></button></div>'
                } else {
                    document.getElementById('roleSection').innerHTML += '<div help="' + help + '" roleId="' + roleId + '" name="' + name + '" points="' + points + '" optionId="' + optionId + '" id="role' + currentRoles + '" class="alert alert-warning " role="alert">' + currentRoles + '. <i class="fa ' + image + ' %> fa-lg"></i> ' + name + ' (' + points + ') ' + ' - <a href="https://ultimate-werewolf-helper-serenamidori.c9users.io/cards/' + roleId + '" target="_blank">Card Page</a><button type="button" class="btn btn-link btn-xs removeButton"><i class="fa fa-times"></i></button></div>'
                }
                
                // Change the visual for point sum of selected roles
                pointSum += new Number(points);
                pointSumColor(pointSum);
                document.getElementById('pointTotal').innerHTML = pointSum;
                
                // Remove the selected role from the drop down list
                // $("#selectedRoles option:selected").style.display = "none";
                
                $("#selectedRoles option:selected").addClass("hidden");
                
                checkButton();
            }
        });
        
        function pointSumColor(pointSum){
            if (pointSum > 2 || pointSum < -2){
                document.getElementById('pointTotal').style.color = "red";
            } else {
                document.getElementById('pointTotal').style.color = "green";
            }
        }
        
        function checkButton(){
            // check if number of players == number of selected roles
            if(currentPlayers == currentRoles && currentPlayers != 0){
                document.getElementById('shuffle-btn').classList.remove("disabled");
            } else {
                document.getElementById('shuffle-btn').classList.add("disabled");
            }
        }
        
        $(document).on('click','.removeButton',function() {
            var string = $(this).closest("div").html();
            var points = $(this).closest("div").attr("points");
            pointSum -= points;
            document.getElementById('pointTotal').innerHTML = pointSum;
            pointSumColor(pointSum);
            var optionId = $(this).closest("div").attr("optionId");
            document.getElementById(optionId).className = "";
            currentRoles -= 1;
            $(this).closest("div").remove();
            fixNumbers();
            checkButton();
        });
    
        function shuffleAndAssign(){
            shuffle();
            fixNumbers();
            displayPlayers();
        }
        
        // http://jsfiddle.net/bv3MN/1/       
        function shuffle(){
            $("#roleSection").each(function(){ 
                var divs = $(this).find('div');
                for(var i = 0; i < divs.length; i++) $(divs[i]).remove();            
                //the fisher yates algorithm, from http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
                var i = divs.length;
                if ( i == 0 ) return false;
                while ( --i ) {
                   var j = Math.floor( Math.random() * ( i + 1 ) );
                   var tempi = divs[i];
                   var tempj = divs[j];
                   divs[i] = tempj;
                   divs[j] = tempi;
                 }
                for(var i = 0; i < divs.length; i++) $(divs[i]).appendTo(this);
            });                    
        }
        
        // Not needed, but still really cool ok
        function fixNumbers(){
            $("#roleSection").each(function(){ 
                var divs = $(this).find('div');
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
        
        function displayPlayers(){
            document.getElementById('game-play-div').innerHTML = "";
            document.getElementById('modTips').innerHTML = "";
            console.log("Just outside the nightRolesSection");
            $("#nightRoleSection").each(function(){
                var divs = $(this).find('p');
                for (i = 0; i < divs.length; i++){
                    divs[i].classList.add("hidden");
                    console.log("divs[i]: " + divs[i]);
                    console.log("divs[i].classList: " + divs[i].classList);
                }
            })
            
            $("#roleSection").each(function(){ 
                var rolesUsed = [];
                var rolesNum = 0;
                var divs = $(this).find('div');
                for(i = 0; i < divs.length; i++){
                    var help = divs[i].getAttribute("help");
                    var roleName = divs[i].getAttribute("name");
                    var roleId = divs[i].getAttribute("roleId");
                    var number = i + 1;
                    var playerId = "player" + number + "name";
                    var playerName = document.getElementById(playerId).value;
                    document.getElementById('game-play-div').innerHTML += '<div id="rolePlayer' + i + '"><div class="alert alert-success" role="alert"></i> <h4>' + playerName + ' the ' + roleName + '</h4> <div class="input-group" id="copyPlayerRole' + i + '"><input class="form-control" id="copyRole' + i + '" value="' + playerName + ', you are a ' + roleName + ' - https://ultimate-werewolf-helper-serenamidori.c9users.io/cards/' + roleId + '" readonly ><span class="input-group-btn"><button class="btn btn-default copy-button" data-clipboard-target="#copyRole' + i + '"><i class="fa fa-clipboard"></i></button></span></div></div></div>';
                    
                    
                    var dupe = false;
                    for(j = 0; j < rolesUsed.length; j++){
                        if(!rolesUsed[j].localeCompare(roleId)){
                            dupe = true;
                        }
                    }
                    if(!dupe){
                        console.log("This id is " + 'order-' + roleId);
                        if (document.getElementById('order-' + roleId)) {
                            document.getElementById('order-' + roleId).classList.remove("hidden");
                        }
                        
                        document.getElementById('modTips').innerHTML += "Your deck contains a <b>" + roleName + ":</b> " + help + "<br>";
                        rolesUsed[rolesNum] = roleId;
                        rolesNum++;
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

