/***************************************************************************
 *  Here you can change some settings of the application "loweryourfrequency2relax". 
 * You can change the audio-file, 
 * you can change the range from seconds to minutes,
 * you can change the background-image or set a background-color and 
 * you can change the color of the slider and the text.
***************************************************************************/

// false hides the two option-select with the timerange to set where sound could be muted/paused
window.loweryourfrequency2relax.timerangeToAvoid = true;  


// Name of the sound file from the diretory ./mvc/view/sound/ e.g "make-sound.mp3"
// NOTE: The length of the sound-file has to be shorter, than the repeating-time-range!
window.loweryourfrequency2relax.soundFile = "tock-02-2sec.m4a"; 

// Unit-option can be "sec" ("seconds") or "min" ("minutes")
// NOTE: There is one exception at what time the sound is played. 
// If you have choosen minutes and you set the maximum range to 60, 
// the audio-file (e.g. might be a gong like in early grandpa-times) 
// will be played on the full hours, at the retrieved time from your PC. 
window.loweryourfrequency2relax.unit = "sec";

// Backgroundolor can be set by using wordings of internet-colors like: 
// "white", "silver", "cadetblue", "darkcyan", "darkorange", "deepskyblue"
// or with CSS-hex-code like: "#335577", "#336699", "#007700", ,"#007777", "#004477", "#774000"
// NOTE: "backgroundImage" needs to be set to false
window.loweryourfrequency2relax.backgroundColor = "#336699"; 

// false, deactivates the background-image and makes the background-color visible
window.loweryourfrequency2relax.backgroundImage = true; 

// Name of the image file from the diretory ./mvc/view/img/
window.loweryourfrequency2relax.backgroundImageName = "03.jpg"; 

// Color of the slider and the text
window.loweryourfrequency2relax.backgroundColorSliderAndText = "white"; 

// The value that is set on initial load for the repeating interval 
window.loweryourfrequency2relax.sliderSetValue = 3.1; 


//The complete list of settings as they were set by default:
// window.loweryourfrequency2relax.timerangeToAvoid = true;  
// window.loweryourfrequency2relax.soundFile = "tock-02-2sec.m4a";
// window.loweryourfrequency2relax.unit = "sec";
// window.loweryourfrequency2relax.backgroundColor = "#336699"; 
// window.loweryourfrequency2relax.backgroundImage = true; 
// window.loweryourfrequency2relax.backgroundImageName = "03.jpg"; 
// window.loweryourfrequency2relax.backgroundColorSliderAndText = "white"; 
// window.loweryourfrequency2relax.backgroundColorSliderAndText = "white"; 
// window.loweryourfrequency2relax.sliderSetValue = 3.1; 




