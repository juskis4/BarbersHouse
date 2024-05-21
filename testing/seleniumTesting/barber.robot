*** Settings ***

Library    SeleniumLibrary


*** Variables ***
${chrome_driver_path}    C:/Users/stanf/Desktop/chromedriver.exe    #THIS PATH NEEDS TO BE ADAPTED DEPENDING ON WHO IS RUNNING THE TESTS


*** Keywords ***
Open Chrome
    ${device metrics}=    Create Dictionary    width=${1366}    height=${768}    pixelRatio=${1.0}
    ${chrome options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Call Method    ${chrome options}    add_argument    --start-maximized
    Create Webdriver    Chrome    chrome_options=${chrome options}    executable_path=${chrome_driver_path}

*** Test Cases ***

Open Web Application

    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/    #THIS CAN BE CHANGED TO ANY OTHER URL (DEPENDING IF THE WEB APP IS HOSTED SOMEWHERE)
    Sleep    2s    #WAIT TO SEE IF THE TEST OPENED THE CORRECT PAGE
    Close Browser

