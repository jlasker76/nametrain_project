// Wait for the DOM to be ready
$(document).ready(function(){
  
    var myObj
    var formArray = []
    var xmlhttp = new XMLHttpRequest();
    var round=0;
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
        //console.log(myObj);
        //document.getElementById("demo").innerHTML = myObj.name;
        makeStarters();
        
      }
    };
    xmlhttp.open("GET", "names_separated_032121.json", true);
    xmlhttp.send();

    var accolades = [];
    accolades.push("Nice Job!");
    accolades.push("Choo Choo!");
    accolades.push("Name Train!");
    accolades.push("Come on ride that train!");
    accolades.push("I hear the train a comin'!");
    accolades.push("Ding Ding Ding!");
    accolades.push("Arancia, Coca, Birra!");

    /*
    var nameObject;
    $.getJSON("names_separated.json", callbackFuncWithData);
        function callbackFuncWithData(data){
            nameObject = data;
            //nameObject = jQuery.parseJSON(data);
    }
    */
    
    
    
    function setInitialArray(first_name, last_name){
        
        var item = ["guess_first", "",""];
        formArray.push(item);
        var item = ["original_first", first_name, "readonly"];
        formArray.push(item);
        var item = ["original_last", last_name, "readonly"];
        formArray.push(item);
        var item = ["guess_last", "",""];
        formArray.push(item);
        makeForm();
    }

    function makeForm(){
        //todo get a starter name
        //all games start with 4 positions: 0,1,2,3
        //update as user progresses
        if(round !=0 ){
            submitToDatabase();
        }
        console.log('make form');
        fLen = formArray.length;
        $("#form").html('');
        $("#form").append("<form name='nametrain'>")
        for (i = 0; i < fLen; i++) {
            $("#form").append("<input type='text' class='col-md-3' id='"+formArray[i][0]+"' name='"+formArray[i][0]+"' value='"+formArray[i][1]+"'>")    
        }
        $("#form").append("</form>")

        //$("#form").append("<form name='nametrain'><input type='text' id='first' name='fname' value=''><input type='text' id='fname' name='fname' value='Tracy' readonly><input type='text' id='lname' name='lname' value='Morgan' readonly><input type='text' id='last' name='fname' value=''></input>");
        $("#guess_first").on("keyup", function() {
            //alert($(this).val()); 
            if($(this).val() != ''){   
                checkSubmission('first', $(this).val());
            }
            //check submission
        });
        $("#guess_last").on("keyup", function() {
            if($(this).val() != ''){
                checkSubmission('last', $(this).val());
            }
            //check submission 
        });
        //$('#form input').attr('readonly', 'readonly');
        $('#form input').prop("readonly",true);
        $('#form #guess_first').prop("readonly",false);
        $('#form #guess_last').prop("readonly",false);
        //$('#form #guess_first').attr('readonly', '');
        //$('#form #guess_last').attr('readonly', '');

        $("#results").html('');
        resetTimer();
        round++;
      
    }

    function checkSubmission(arg1, arg2){
        //first gets added to the front
        //last gets added to the back
        //needs to be passed the connector value (the one before or after respectively)
        if(arg1 == 'first'){
            //alert('first check ' + arg2 + ' for ' + formArray[1][1]);
            if(nameCheck(arg2,formArray[1][1])){
                connectorType = connectorCheck(arg1, arg2);
                if(connectorType=='connector'){
                    guess_count = formArray.length - 3;
                    var item = ["correct_"+guess_count, arg2,"readonly"];
                    formArray.splice(1, 0, item)
                    console.log(formArray)
                    makeForm();
                    $("#results").html('');
                    $("#results").append("That's a name and it's a Connector, keeping going!")
                }else{
                    //engine
                    guess_count = formArray.length - 3;
                    var item = ["correct_"+guess_count, arg2,"readonly"];
                    formArray.splice(1, 0, item)
                    formArray.shift();
                    console.log(formArray)
                    makeForm();
                    $("#results").html('');
                    $("#results").append("That's a name and it's the engine, choo choo!")
                }
            }
        }else{
            //alert('last check ' + arg2 + ' for ' + formArray[formArray.length-2][1]);
            if(nameCheck(formArray[formArray.length-2][1],arg2)){
                connectorType = connectorCheck(arg1, arg2);
                if(connectorType=='connector'){
                    guess_count = formArray.length - 3;
                    var item = ["correct_"+guess_count, arg2,"readonly"];
                    formArray.splice(formArray.length-1, 0, item)
                    console.log(formArray)
                    makeForm();
                    $("#results").html('');
                    $("#results").append("That's a name and it's a Connector, keeping going!")
                }else{
                    //caboose
                    guess_count = formArray.length - 3;
                    var item = ["correct_"+guess_count, arg2,"readonly"];
                    formArray.splice(formArray.length-1, 0, item)
                    formArray.pop();
                    console.log(formArray)
                    makeForm();
                    $("#results").html('');
                    $("#results").append("That's a name and it's the caboose, choo choo!")    
                }
            }
        }
        
        //for (i = 0; i < nameObject.length; i++) {
            //console.log(nameObject[i].first);
            //$("#form").append("<input type='text' id='"+formArray[i][0]+"' name='"+formArray[i][0]+"' value='"+formArray[i][1]+"'></input>")    
        //}
        
      
        //check if it's a name
        //check if it's a connector
    }
    function makeStarters(){
        //make an array of starter names, real name, first is a last, last is a first
        
        for (x in myObj) {
            
        }
        min = 0
        max = x;
        random = Math.floor((Math.random()*max) + min); 
        //console.log(random);
        setInitialArray(myObj[random]["first"],myObj[random]["last"]);
        /*
        for (x in myObj) {
            for (y in myObj){
                if(myObj[x]["first"] == myObj[y]["last"]){
                    console.log('this is a first name '+myObj[x]["first"]);  
                }
            
            }
        }
        */
        /*
        for (x in myObj) {
            for (y in myObj){
                if(myObj[x]["first"] == myObj[y]["last"] && myObj[x]["last"] == myObj[y]["first"]){
                    //console.log('this is a first name '+myObj[x]["first"]+' , '+ myObj[x]["last"]);
                }
                
            }
        }
        */
        /*
        lastNameFound = false;
        for (x in myObj) {
            for (y in myObj){
                if(!lastNameFound){
                    if(myObj[x]["last"] == myObj[y]["first"]){
                        console.log('this is a last name '+myObj[x]["last"]);
                        lastName = myObj[x]["first"];
                        lastNameFound = true;   
                    }
                }
            }
        }
        return lastName;
        */
    }
    
    function nameCheck(first,last){
        //does the value before it + this value match a name?
        console.log(first+','+last)
        nameFound = false;
        $("#results").html('not a match');
        if(!nameFound){
            for (x in myObj) {
                if(first == myObj[x]["first"] && last == myObj[x]["last"]){
                    console.log('this is a name'+myObj[x]["id"]);
                    nameFound = true;
                    
                }else{
                    //console.log('not a name'+myObj[x]["id"]);
                }
            }
        }
        return nameFound;
 
    }

    function connectorCheck(arg1, arg2){
        //does the value added match a first or last name respectively
        //connector, engine, caboose
        console.log('cc received= '+arg1,arg2);
        connectorDetermined = false;
        
        if(arg1 == 'first'){
            //is this first name a last name
            connector = 'engine';
            if(!connectorDetermined){
                for (x in myObj) {
                    if(arg2 == myObj[x]["last"]){
                        connectorDetermined = true;
                        connector = 'connector';
                    }
                }
            }
        }else{
            //is this last name a first name
            connector = 'caboose'
            if(!connectorDetermined){
                for (x in myObj) {
                    if(arg2 == myObj[x]["first"]){
                        connector = 'connector';
                    }
                }
            }
        }
        return connector;
        
    }
    $("#reset").on("click", function() {
         reset();
    });

    function reset(){
        console.log(formArray);
        formArray = [];
        round=0;
        makeStarters();
        //check submission
    }
    
    var timeLeft = 30;
    var elem = document.getElementById('timer');
    var timerId = setInterval(countdown, 1000);


    function countdown() {
        if (timeLeft == -1) {
            clearTimeout(timerId);
            timesUp();
        } else {
            elem.innerHTML = timeLeft + ' seconds remaining';
            timeLeft--;
        }
    }
    function timesUp() {
        //reset();
        if(alert('Game over! Click okay to play again')){}
        else    window.location.reload(); 
        console.log(formArray);
        
    }
    function resetTimer(){

        timeLeft = 30;
    }

    function submitToDatabase(){
        //var dataString = 'names='+ formArray;
        min = 0
        max = accolades.length;
        random = Math.floor((Math.random()*max) + min);
        
        $.ajax({
            type: "POST",
            url: "process.php",
            //data: dataString,
            data: {names:formArray},
            success: function(data) {
                alert(accolades[random]);
            }
        });
    }
    
});
