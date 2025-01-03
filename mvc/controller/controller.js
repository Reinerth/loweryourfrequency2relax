'use strict'; /* Used traditional syntax and ES5, except "let". No arrow-functions, backticks and other useless confusing syntax */ 

/** loweryourfrequency2relax ******************************************************* 
 * 
 * About the application: 
 * ---------------------------------------------------------------------------------
 * This browser-app is a metronome. It can play and repeat a sound, 
 * that is put in the folder loweryourfrequency2relax\mvc\view\sound 
 * and its name was configured in the file usersettings.js in line 15 
 * (window.loweryourfrequency2relax.soundFile)
 * 
 * Meant to be used for meditation to calm down when feeling stressed, 
 * by playing a sound with a lower repeated frequency then seconds.
 * Yet, tested only with edge-browser Version 92.0.902.67 (Official build) (64-bit).
 * 
 * With the slider the repeating-time is adjustable,
 * in a timerange between 1 second and 60 seconds 
 * or one minute and 60 minutes. 
 * usersetttings.js in line 22 (window.loweryourfrequency2relax.unit)
 * 
 * 
 * About the structure: 
 * ---------------------------------------------------------------------------------
 * Constructing a class "controller" with private and public functions 
 * wherein we could use (call) the public functions from other classes 
 * even if they are not instantiated at that time, 
 * because our container (the reserved namespace) "timeline" is global (in the window-scope). 
 * Means, we hoisted our container to window, 
 * so the functions are going to be executed 
 * only after the window is loaded with the complete scripts. 
 * Similar like the compiled files e.g. in C or JAVA. 
 * In this way JavaScript is kind of precompiled for the browser. 
 * 
 * 
 * About the code:
 * ---------------------------------------------------------------------------------
 * An interval gets started at slider-time * 1000 for seconds 
 * or slider-time * 60 * 1000 for minutes. 
 * And inside the interval verify if gong has to play (if not in pause time-range).
 * 
*/ 
window.loweryourfrequency2relax.controller = function (){ 

    // Settings needed inside this class 
    let internalSettings = { 
        myURLGetSomething          :"../../some.json", 
        myIntervalWithPause        :"", 
        myIntervalIsActive         :false, 
        anEmptyArray               :[], 
        myRange                    :null, 
        mainContainer              :document.getElementById("mainContainer"), 
        timerangeToAvoidContainer  :document.getElementById("timerangeToAvoidContainer"), 
        avoidFromSelect            :document.getElementById("avoidFromSelect"), 
        avoidToSelect              :document.getElementById("avoidToSelect"), 
        invalidTimerangeMessage    :document.getElementById("invalidTimerangeMessage"), 
        pauseRangeSet              :false, 
        slider                     :document.getElementById("slider"), 
        rangeValue                 :document.getElementById("rangeValue"), 
        rangeValueUnit             :document.getElementById("rangeValueUnit"), 
        rangeValueHasChanged       :document.getElementById("rangeValueHasChanged"), 
        pressAllRight              :document.getElementById("pressAllRight"), 
        myBody                     :document.getElementsByTagName("body")[0] 
    }; 



    // Initializes the repeating-time set from user. 
    let getSliderTime = function(){ 

        internalSettings.myRange = Number(internalSettings.slider.value); // e.g 7 sec or 7 min

        // "Minutes" were set from the user
        if (window.loweryourfrequency2relax.unit == "min" || window.loweryourfrequency2relax.unit == "minute" || window.loweryourfrequency2relax.unit == "minutes" || window.loweryourfrequency2relax.unit == "minute(s)"){ 
            internalSettings.countingSeconds = internalSettings.myRange*60; // Convert from Minutes to Seconds
            internalSettings.myRange = internalSettings.myRange*60*1000; // Convert from Minutes to milliseconds
        } else { // "Seconds" were  from the user
            internalSettings.countingSeconds = internalSettings.myRange; // Keep Seconds
            internalSettings.myRange = internalSettings.myRange*1000; // Convert from Seconds to Milliseconds 
        } 
    }; 




    let setMyInterval = function(){ 

            getSliderTime(); // Before starting interval we retrieve the time from slider set by user.

            let from = parseInt(internalSettings.avoidFromSelect.value); 
            let to = parseInt(internalSettings.avoidToSelect.value); 

            // We play the sound once on beginning, before interval is triggered.
            internalSettings.sound.play(); 
            internalSettings.sound.loop = false; 

            // Begin interval
            internalSettings.myIntervalWithPause = setInterval(function(){ 

                // Get current system-time to verify if play sound or not if pausing-time-range was set.
                let currentTime = new Date(); 
                let stunden = currentTime.getHours(); 

                if (internalSettings.pauseRangeSet == true){ // timerange to pause was set/changed 

                    if (from < to){ // e.g. from 17-19
                        if(stunden < from || stunden >= to){ // time to play 
                            internalSettings.sound.play(); 
                            internalSettings.sound.loop = false; 
                        } 
                    } 
                    
                    if (from > to){ // e.g from 19-17
                        if(stunden < from && stunden >= to){ // time to play 
                            internalSettings.sound.play(); 
                            internalSettings.sound.loop = false; 
                        } 
                    } 

                } else { 
                    // if no timerange to avoid was set, play sound 
                    internalSettings.sound.play(); 
                    internalSettings.sound.loop = false; 
                } 


            }, internalSettings.myRange);

    }; 


    // User has changed a setting, we need to reset all.
    let resetApp = function(){

        internalSettings.pauseRangeSet = false;
        internalSettings.myIntervalIsActive = false;
        internalSettings.rangeValueHasChanged.innerText = 'Press "All Right"'; // display the hint to press "all right" 
        internalSettings.pressAllRight.className = "mySwitch active"; 

        clearInterval(internalSettings.myIntervalWithPause); // we clear the interval ... 
        // internalSettings.sound.pause(); // pause sound-play

        if (internalSettings.avoidFromSelect.value != "00" || internalSettings.avoidToSelect.value != "00"){ // timerange was set/changed 
            if (internalSettings.avoidFromSelect.value == internalSettings.avoidToSelect.value){ // timerange-begin is the same with timerange-end 
                internalSettings.invalidTimerangeMessage.innerText = "Invalid timerange!"; 
                return;
            } 
            internalSettings.invalidTimerangeMessage.innerText = "";
            internalSettings.pauseRangeSet = true;
        }
    };


    // The events from user on changing settings 
    let handleEvents = function(){ 

        // When user is moving the slider we display the currently selected value below 
        internalSettings.slider.oninput = function(){ 
            internalSettings.rangeValue.innerText = this.value; // e.g. 12.5 
            resetApp();
        } 

        // If user changes setting we interrupt the intervals 
        internalSettings.avoidFromSelect.onchange = function(){ 
            resetApp();
        } 

        // If user changes setting we interrupt the intervals 
        internalSettings.avoidToSelect.onchange = function(){ 
            resetApp();
        } 


        // When user has pressed "All Right" 
        internalSettings.pressAllRight.onclick = function(){ 

            if(internalSettings.myIntervalIsActive == true || internalSettings.invalidTimerangeMessage.innerText != ""){ // if already triggered
                return;
            }

            internalSettings.rangeValueHasChanged.innerText = ""; // remove the note to: Press "All Right" 
            internalSettings.invalidTimerangeMessage.innerText = ""; // remove the note: Invalid timerange! 

            internalSettings.pressAllRight.className = "mySwitch inactive"; 

            internalSettings.myIntervalIsActive = true;
            setMyInterval(); 

        } 
    }; 




    // Public 
    this.init = function(){ 

        handleEvents(); 

        // On loading the app we set the configured visibility of options to set timerange to mute 
        if (window.loweryourfrequency2relax.timerangeToAvoid == true || window.loweryourfrequency2relax.timerangeToAvoid == "true"){ 
            internalSettings.timerangeToAvoidContainer.style.visibility = "visible"; 
        } else { 
            internalSettings.timerangeToAvoidContainer.style.visibility = "hidden"; 
        } 



        // On loading the app, we set the value of the slider as configured in usersettings.js. E.g. "7" 
        internalSettings.slider.value = window.loweryourfrequency2relax.sliderSetValue; 

        // Display on loading the app, the value of the slider below as configured in usersettings.js E.g. "7" 
       internalSettings.rangeValue.innerText = window.loweryourfrequency2relax.sliderSetValue; 

        // Get the sound-settings configured from the user in the usersettings.js E.g. "myGong.mp3" 
        let mySound = window.loweryourfrequency2relax.soundFilePath + window.loweryourfrequency2relax.soundFile; 
        internalSettings.sound = new Audio(mySound); 

        // Set backgroundimage if configured in usersettings.js E.g "03.PNG" 
        if (window.loweryourfrequency2relax.backgroundImage == true || window.loweryourfrequency2relax.backgroundImage == "true"){ 

            internalSettings.bgimg = window.loweryourfrequency2relax.backgroundImagePath + window.loweryourfrequency2relax.backgroundImageName; 
            internalSettings.myBody.style.backgroundImage = "url("+internalSettings.bgimg+")"; 

        } else { 
            internalSettings.myBody.style.backgroundImage = ""; 
        } 

        // Set background-color as configured in usersettings.js E.g. "white" or "#ffffff" 
        if (window.loweryourfrequency2relax.backgroundImage == false || window.loweryourfrequency2relax.backgroundImage == "false"){ 
            internalSettings.myBody.style.backgroundColor = window.loweryourfrequency2relax.backgroundColor; 
        } 

        // Get the color-settings of the slider and the text, configured from user in the usersettings.js E.g. "white" or "#ffffff" 
        internalSettings.slider.style.backgroundColor = window.loweryourfrequency2relax.backgroundColorSliderAndText; 
        internalSettings.myBody.style.color = window.loweryourfrequency2relax.backgroundColorSliderAndText; 

        // Get the unit range to be used, configured in usersettings.js E.g "sec","seconds","min" or "minutes" 
        internalSettings.rangeValueUnit.innerText = window.loweryourfrequency2relax.unit; 







        // NOT NEEDED IN THIS APP 
        // Get the model-content (file) with "makeAJAXRequest" 
        // and when load is finished, do something with the retrieved content 
        // by using callback-functions ("callMeWhenReady") 
        // window.timeline.makeAJAXRequest(function(responseContent) { 

            // Here we are in the callback-part of the request, 
            // means content-load is finished 

        // }, internalSettings.myURLGetSomething, param1); 
    }; 
}; 

/****************************************************************************** 
 * INSTANTIATE (new) a variable (e.g. "loweryourfrequency2relax")                   * 
 * with the class from this file ("controller.js")                            * 
 * to make the class available to be invoked (in the "loweryourfrequency2relax.htm")* 
******************************************************************************/ 
let loweryourfrequency2relax = new window.loweryourfrequency2relax.controller(); 