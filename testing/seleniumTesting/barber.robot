*** Settings ***

Library    SeleniumLibrary


*** Variables ***
${chrome_driver_path}    C:/Users/stanf/Desktop/chromedriver.exe   


*** Keywords ***
Open Chrome
    ${device metrics}=    Create Dictionary    width=${1366}    height=${768}    pixelRatio=${1.0}
    ${chrome options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Call Method    ${chrome options}    add_argument    --start-maximized
    Create Webdriver    Chrome    chrome_options=${chrome options}    executable_path=${chrome_driver_path}

*** Test Cases ***

Open Web Application

    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/    
    Sleep    2s   
    Close Browser

About_Us_H  #FROM HEADER
   Open Chrome
    Go To    https://barbershouseproject-419414.web.app/    
    Sleep    2s    
    Click Element    xpath= //*[@id="root"]/div/div[2]/nav/ul/li[1]/button/span  
    Sleep    1s
    Wait Until Element Is Visible    xpath=//*[@id="about-us"]/h2
    Close Browser


About_Us_F  #FROM FOOTER
   Open Chrome
    Go To    https://barbershouseproject-419414.web.app/    
    Sleep    2s    
    Scroll Element Into View    xpath = //*[@id="root"]/div/footer/div/ul[1]/li[1]
    Sleep    1s
    Click Element    xpath= //*[@id="root"]/div/footer/div/ul[1]/li[1]  
    Sleep    1s
    Wait Until Element Is Visible    xpath=//*[@id="about-us"]/h2
    Close Browser    



Services_H    #FROM HEADER

    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/    
    Sleep    2s    
    Click Element    xpath= //*[@id="root"]/div/div[2]/nav/ul/li[2]/button/span  
    Sleep    1s
    Wait Until Element Is Visible    xpath=//*[@id="services"]/div/h2
    Close Browser

Services_F    #FROM FOOTER

    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/    
    Sleep    2s    
    Scroll Element Into View    xpath = //*[@id="root"]/div/footer/div/ul[1]/li[2]
    Sleep    1s
    Click Element    xpath= //*[@id="root"]/div/footer/div/ul[1]/li[2] 
    Sleep    1s
    Wait Until Element Is Visible    xpath=//*[@id="services"]/div/h2
    Close Browser    

Team_H   #FROM HEADER

    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/    
    Sleep    2s    
    Click Element    xpath= //*[@id="root"]/div/div[2]/nav/ul/li[3]/button/span  
    Sleep    1s
    Wait Until Element Is Visible    xpath=//*[@id="team"]/div/h2
    Close Browser

Team_F    #FROM FOOTER
    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/    
    Sleep    2s    
    Scroll Element Into View    xpath = //*[@id="root"]/div/footer/div/ul[1]/li[3]
    Sleep    1s
    Click Element    xpath= //*[@id="root"]/div/footer/div/ul[1]/li[3]  
    Sleep    1s
    Wait Until Element Is Visible    xpath=//*[@id="team"]/div/h2
    Close Browser    

FAQ_H   #FROM HEADER

    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/    
    Sleep    2s    
    Click Element    xpath= //*[@id="root"]/div/div[2]/nav/ul/li[4]/button/span  
    Sleep    1s
    Wait Until Element Is Visible    xpath=//*[@id="faq"]/div/h2
    Close Browser

FAQ_F    #FROM FOOTER

    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/    
    Sleep    2s    
    Scroll Element Into View    xpath = //*[@id="root"]/div/footer/div/ul[1]/li[4]
    Sleep    1s
    Click Element    xpath= //*[@id="root"]/div/footer/div/ul[1]/li[4]  
    Sleep    1s
    Wait Until Element Is Visible    xpath=//*[@id="faq"]/div/h2
    Close Browser    

FAQ_Drop_Down
    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/    
    Sleep    2s    
    Click Element    xpath= //*[@id="root"]/div/div[2]/nav/ul/li[4]/button/span  
    Wait Until Element Is Visible    xpath=//*[@id="faq"]/div/h2
    Sleep    1s
    Click Element    xpath=//*[@id="faq"]/div/div/div/span[3]
    Sleep    1s
    Wait Until Element Is Visible    xpath=//*[@id="faq"]/div/div/div[2]/p/a
    Sleep    1s
    Close Browser



Translate_DK
   Open Chrome
    Go To    https://barbershouseproject-419414.web.app/    
    Sleep    2s    
    Scroll Element Into View    xpath = //*[@id="root"]/div/footer/div/ul[1]/li[4]
    Sleep    2s 
    Scroll Element Into View    xpath = //*[@id="root"]/div/div[1]/div[1]/div[2]/h1
    Sleep    2s 
    Click Element    xpath= //*[@id="root"]/div/div[1]/div[2]/button[2]/img
    Sleep    2s 
    Scroll Element Into View    xpath = //*[@id="root"]/div/footer/div/ul[1]/li[4]
    Sleep    2s 
    Scroll Element Into View    xpath = //*[@id="root"]/div/div[1]/div[1]/div[2]/h1
    Sleep    1s
    Close Browser  

Translate_UK
   Open Chrome
    Go To    https://barbershouseproject-419414.web.app/    
    Sleep    2s    
    Click Element    xpath= //*[@id="root"]/div/div[1]/div[2]/button[2]/img
    Sleep    2s    
    Scroll Element Into View    xpath = //*[@id="root"]/div/footer/div/ul[1]/li[4]
    Sleep    2s 
    Scroll Element Into View    xpath = //*[@id="root"]/div/div[1]/div[1]/div[2]/h1
    Sleep    2s 
    Click Element    xpath= //*[@id="root"]/div/div[1]/div[2]/button[1]/img
    Sleep    2s 
    Scroll Element Into View    xpath = //*[@id="root"]/div/footer/div/ul[1]/li[4]
    Sleep    2s 
    Scroll Element Into View    xpath = //*[@id="root"]/div/div[1]/div[1]/div[2]/h1
    Sleep    1s
    Close Browser  

Book a reservation using the floating button

    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/    
    Sleep    2s   
    Click Element    xpath=//*[@id="root"]/div/div[1]/button/span    
    Sleep    1s
    Wait Until Element Is Visible    xpath=//*[@id=":r0:"]    
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[1]/div/div/div/div/div[1]/div/div[2]/img    
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[1]/div/div/div/div/div[2]/div/button[1]    
    Sleep    1s
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[3]/div/div/div/div/div[1]/table/tbody/tr[1]/th    
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[3]/div/div/div/div/div[1]/table/tbody/tr[2]/th    
    Sleep    1s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[3]/div/div/div/div/div[2]/div/button[1]    
    Sleep   3s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[5]/div/div/div/div/div[1]/div[2]/button[1]
    Sleep    1s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[5]/div/div/div/div/div[2]/div/button[1]    
    Sleep    1s
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[7]/div/div/div/div/div[1]
    Sleep    1s
    Input Text    xpath=//*[@id=":r2:"]    test_name
    Sleep    1s
    Input Text    xpath=//*[@id=":r3:"]   test@test.com
    Sleep    1s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[7]/div/div/div/div/div[1]/button  
    Sleep    1s
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div[2]/p[1] 
    Sleep    1s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[2]/button
    Sleep    1s
    Close Browser


Go back to previous step in booking a reservation

    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/    
    Sleep    2s    
    Click Element    xpath=//*[@id="root"]/div/div[1]/button/span    
    Sleep    1s
    Wait Until Element Is Visible    xpath=//*[@id=":r0:"]    
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[1]/div/div/div/div/div[1]/div/div[2]/img    
    Sleep    1s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[1]/div/div/div/div/div[2]/div/button[1]    
    Sleep    1s
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[3]/div/div/div/div/div[1]/table/tbody/tr[1]/th    
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[3]/div/div/div/div/div[1]/table/tbody/tr[2]/th   
    Sleep    1s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[3]/div/div/div/div/div[2]/div/button[1]   
    Sleep   3s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[5]/div/div/div/div/div[1]/div[2]/button[1]
    Sleep    1s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[5]/div/div/div/div/div[2]/div/button[1]    
    Sleep    1s
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[7]/div/div/div/div/div[1]
    Sleep    1s
    Input Text    xpath=//*[@id=":r2:"]    test_name
    Sleep    1s
    Input Text    xpath=//*[@id=":r3:"]   test@test.com
    Sleep    1s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[7]/div/div/div/div/div[2]/div/button
    Sleep    3s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[5]/div/div/div/div/div[2]/div/button[2]
    Sleep    1s
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[3]/div/div/div/div/div[1]/table/tbody/tr[2]/th
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[3]/div/div/div/div/div[2]/div/button[2]
    Sleep    1s
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[1]/div/div/div/div/div[1]/div/div[2]
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[2]/button
    Sleep    1s
    Close Browser
