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
    Sleep  1s 
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[1]/div/div/div/div/div[2]/div/button[1]    
    Sleep    1s
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[3]/div/div/div/div/div[1]/table/tbody/tr[1]/th    
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[3]/div/div/div/div/div[1]/table/tbody/tr[2]/th    
    Sleep    1s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[3]/div/div/div/div/div[2]/div/button[1]    
    Sleep   4s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[5]/div/div/div/div/div[1]/div[1]/div[2]/button  #test?
    Sleep    2s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[5]/div/div/div/div/div[1]/div[2]/button[1]    
    Sleep    1s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[5]/div/div/div/div/div[2]/div/button[1]
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
    Sleep  1s 
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[1]/div/div/div/div/div[2]/div/button[1]    
    Sleep    1s
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[3]/div/div/div/div/div[1]/table/tbody/tr[1]/th    
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[3]/div/div/div/div/div[1]/table/tbody/tr[2]/th    
    Sleep    1s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[3]/div/div/div/div/div[2]/div/button[1]    
    Sleep   4s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[5]/div/div/div/div/div[1]/div[1]/div[2]/button  #test?
    Sleep    2s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[5]/div/div/div/div/div[1]/div[2]/button[1]    
    Sleep    1s
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[1]/div/div/div/div[5]/div/div/div/div/div[2]/div/button[1]
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

Open Web Application for Admin

    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/admin    
    Sleep    2s   
    Click Element    xpath=//*[@id="username"]
    Sleep    1s   
    Input Text    xpath=//*[@id="username"]  administrator
    Sleep    1s   
    Click Element    xpath=//*[@id="root"]/main/div/form/div[2]/div 
    Sleep    1s 
    Input Text    xpath=//*[@id="password"]  administrator
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/main/div/form/label/span[1]/input
    Sleep    1s
     Click Element    xpath=//*[@id="root"]/main/div/form/button
    Sleep    2s
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/div/div/nav/li[1]/a
    Close Browser


Add Barber  Open Chrome
    Go To    https://barbershouseproject-419414.web.app/admin    
    Sleep    2s   
    Click Element    xpath=//*[@id="username"]
    Sleep    1s   
    Input Text    xpath=//*[@id="username"]  administrator
    Sleep    1s   
    Click Element    xpath=//*[@id="root"]/main/div/form/div[2]/div 
    Sleep    1s 
    Input Text    xpath=//*[@id="password"]  administrator
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/main/div/form/label/span[1]/input
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/main/div/form/button
    Sleep    2s
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/div/div/nav/li[1]/a
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/div/div/nav/li[3]/a/div[2]/span
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/main/div/form/div[1]/div  
    Sleep    1s
    Input Text    xpath=//*[@id="name"]  test_barber
    Sleep    1s
    Click Element    xpath=//*[@id="email"]
    Sleep    1s
    Input Text    xpath=//*[@id="email"]  test_barber@test.com
    Sleep    1s
    Click Element    xpath=//*[@id="bio"]
    Sleep    1s
    Input Text    xpath=//*[@id="bio"]  test_bio
    Sleep    1s
    Click Element    xpath=//*[@id="photoUrl"]
    Sleep    1s
    Input Text    xpath=//*[@id="photoUrl"]    https://www.perfectimagebarbershop.com/Images/pricelist/5b2de5e1-efc7-4033-9b2e-0fca2231dbb8/hair-design-2_300x300.jpg
    Sleep    1s
    Click Element  xpath=//*[@id="root"]/div/main/div[2]/main/div/form/button
    Sleep    2s
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/main/div[2]/main/div/div[2]/div[2]
    Close Browser

Add Service to the Barber


    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/admin    
    Sleep    2s   
    Click Element    xpath=//*[@id="username"]
    Sleep    1s   
    Input Text    xpath=//*[@id="username"]  administrator
    Sleep    1s   
    Click Element    xpath=//*[@id="root"]/main/div/form/div[2]/div 
    Sleep    1s 
    Input Text    xpath=//*[@id="password"]  administrator
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/main/div/form/label/span[1]/input
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/main/div/form/button
    Sleep    2s
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/div/div/nav/li[1]/a
    Click Element    xpath=//*[@id="root"]/div/div/div/nav/li[5]/a/div[2]/span
    Sleep    1s
    Click Element    xpath=//*[@id="barber"]
    Sleep    1s
    Click Element    xpath=/html/body/div[3]/div[3]/ul/li[4]
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/main/div/form/div[2]/div
    Sleep    1s
    Input Text    xpath=//*[@id="title"]    test_Title
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/main/div/form/div[3]/div
    Sleep    1s
    Input Text    xpath=//*[@id="description"]    test_description
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/main/div/form/div[4]/div
    Sleep    1s
    Input Text    xpath=//*[@id="duration"]    45
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/main/div/form/div[5]/div
    Sleep    1s
    Input Text    xpath=//*[@id="price"]   150
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/main/div/form/button
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/main/div[2]/main/div/div[2]/div[2]
    Close Browser

View and Edit Barber

    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/admin    
    Sleep    2s   
    Click Element    xpath=//*[@id="username"]
    Sleep    1s   
    Input Text    xpath=//*[@id="username"]  administrator
    Sleep    1s   
    Click Element    xpath=//*[@id="root"]/main/div/form/div[2]/div 
    Sleep    1s 
    Input Text    xpath=//*[@id="password"]  administrator
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/main/div/form/label/span[1]/input
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/main/div/form/button
    Sleep    2s
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/div/div/nav/li[1]/a
    Click Element    xpath=//*[@id="root"]/div/div/div/nav/li[2]/a/div[2]/span
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/div/div/div/div[2]/div/div[2]/div/div[3]/div[6]/a
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/div/div/div[2]/div/div[1]/div
    Sleep    1s
    Input Text    xpath=/html/body/div[1]/div/main/div[2]/div/div/div[2]/div/div[1]/div/input  update
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/div/div/div[2]/div/div[2]/div
    Sleep    1s
    Input Text    xpath=/html/body/div[1]/div/main/div[2]/div/div/div[2]/div/div[2]/div/input    update
    Sleep    1s
    Click Element  xpath=//*[@id="root"]/div/main/div[2]/div/div/div[2]/div/div[3]/div  
    Sleep    1s
    Input Text    xpath=/html/body/div[1]/div/main/div[2]/div/div/div[2]/div/div[3]/div/textarea[1]    update_Bio
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/div/div/div[2]/div/button
    Sleep    1s
    Wait Until Element Is Visible    //*[@id="root"]/div/main/div[2]/div/div/div[2]/div/div[1]
    Close Browser

View and Edit Service for Barber

    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/admin    
    Sleep    2s   
    Click Element    xpath=//*[@id="username"]
    Sleep    1s   
    Input Text    xpath=//*[@id="username"]  administrator
    Sleep    1s   
    Click Element    xpath=//*[@id="root"]/main/div/form/div[2]/div 
    Sleep    1s 
    Input Text    xpath=//*[@id="password"]  administrator
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/main/div/form/label/span[1]/input
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/main/div/form/button
    Sleep    2s
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/div/div/nav/li[1]/a

    Click Element    xpath=//*[@id="root"]/div/div/div/nav/li[2]/a/div[2]/span
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/div/div/div/div[2]/div/div[2]/div/div[3]/div[6]/a
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/div/div/div[3]/div/div/div/div/div[2]/div/div[2]/div/div[1]/div[7]/a
    Sleep    1s
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/main/div[2]/div/div/div[1]/div/div/a
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/div/div/div[2]/div/button
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/div/div/div[2]/div/div[1]/div[1]/div/div
    Sleep    1s
    Input Text   xpath=/html/body/div[1]/div/main/div[2]/div/div/div[2]/div/div[1]/div[1]/div/div/input    update
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/div/div/div[2]/div/div[1]/div[3]/div/div
    Sleep    1s
    Input Text    xpath=/html/body/div[1]/div/main/div[2]/div/div/div[2]/div/div[1]/div[3]/div/div/input    1
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/div/div/div[2]/div/div[1]/div[2]/div/div
    Sleep    1s
    Input Text    xpath=/html/body/div[1]/div/main/div[2]/div/div/div[2]/div/div[1]/div[2]/div/div/input   1
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/div/div/div[2]/div/div[1]/div[4]/div/div
    Sleep    1s
    Input Text    xpath=/html/body/div[1]/div/main/div[2]/div/div/div[2]/div/div[1]/div[4]/div/div/textarea[1]   update
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/div/div/div[2]/div/div[2]/button[1]
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/main/div[2]/div/div/div[2]/div/div[2]/div[2]
    Close Browser
      
Add a Booking         #Valid for administrator inteface

    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/admin    
    Sleep    2s   
    Click Element    xpath=//*[@id="username"]
    Sleep    1s   
    Input Text    xpath=//*[@id="username"]  administrator
    Sleep    1s   
    Click Element    xpath=//*[@id="root"]/main/div/form/div[2]/div 
    Sleep    1s 
    Input Text    xpath=//*[@id="password"]  administrator
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/main/div/form/label/span[1]/input
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/main/div/form/button
    Sleep    2s
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/div/div/nav/li[1]/a
    Click Element    xpath=//*[@id="root"]/div/div/div/nav/li[7]/a/div[2]/span
    Sleep    1s
    Click Element    xpath=/html/body/div[1]/div/main/div[2]/main/div/form/div[1]/div/div
    Sleep    1s
    Click Element    xpath=/html/body/div[3]/div[3]/ul/li[2]
    Sleep    1s
    Click Element    xpath=/html/body/div[1]/div/main/div[2]/main/div/form/div[2]/div/div
    Sleep    1s
    Click Element    xpath=/html/body/div[3]/div[3]/ul/li[4]
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/main/div/form/div[3]/div  
    Sleep    1s
    Input Text    xpath=/html/body/div[1]/div/main/div[2]/main/div/form/div[3]/div/input    Test_name
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/main/div/form/div[4]/div
    Sleep    1s
    Input Text    xpath=/html/body/div[1]/div/main/div[2]/main/div/form/div[4]/div/input    customer@test.com
    Sleep    1s
    Click Element    xpath=/html/body/div[1]/div/main/div[2]/main/div/form/div[5]/div/div
    Sleep    1s
    Click Element    xpath=/html/body/div[3]/div[3]/ul/li[2]
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/main/div/form/button
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/main/div[2]/main/div/div[2]/div[2]

    Close Browser

Delete a Booking

    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/admin    
    Sleep    2s   
    Click Element    xpath=//*[@id="username"]
    Sleep    1s   
    Input Text    xpath=//*[@id="username"]  administrator
    Sleep    1s   
    Click Element    xpath=//*[@id="root"]/main/div/form/div[2]/div 
    Sleep    1s 
    Input Text    xpath=//*[@id="password"]  administrator
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/main/div/form/label/span[1]/input
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/main/div/form/button
    Sleep    2s
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/div/div/nav/li[1]/a
    Click Element    xpath=//*[@id="root"]/div/div/div/nav/li[6]/a/div[2]/span
    Sleep    1s
    Scroll Element Into View    xpath = //*[@id="root"]/div/main/div[2]/div/div/div/div[2]/div/div[2]/div/div[52]/div[9]/a
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/div/div/div/div[2]/div/div[2]/div/div[52]/div[10]/button
    Sleep    1s
    Click Element    xpath=/html/body/div[3]/div[3]/div/div[2]/button[2]

    Close Browser
Delete a Service
    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/admin    
    Sleep    2s   
    Click Element    xpath=//*[@id="username"]
    Sleep    1s   
    Input Text    xpath=//*[@id="username"]  administrator
    Sleep    1s   
    Click Element    xpath=//*[@id="root"]/main/div/form/div[2]/div 
    Sleep    1s 
    Input Text    xpath=//*[@id="password"]  administrator
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/main/div/form/label/span[1]/input
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/main/div/form/button
    Sleep    2s
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/div/div/nav/li[1]/a
    Click Element    xpath=//*[@id="root"]/div/div/div/nav/li[4]/a/div[2]/span
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/div/div/div/div[2]/div/div[2]/div/div[6]/div[9]/button
    Sleep    1s
    Click Element    xpath=/html/body/div[3]/div[3]/div/div[2]/button[2]

    Close Browser

Delete a Barber

    Open Chrome
    Go To    https://barbershouseproject-419414.web.app/admin    
    Sleep    2s   
    Click Element    xpath=//*[@id="username"]
    Sleep    1s   
    Input Text    xpath=//*[@id="username"]  administrator
    Sleep    1s   
    Click Element    xpath=//*[@id="root"]/main/div/form/div[2]/div 
    Sleep    1s 
    Input Text    xpath=//*[@id="password"]  administrator
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/main/div/form/label/span[1]/input
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/main/div/form/button
    Sleep    2s
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/div/div/nav/li[1]/a
    Click Element    xpath=//*[@id="root"]/div/div/div/nav/li[2]/a/div[2]/span
    Sleep    1s
    Click Element    xpath=//*[@id="root"]/div/main/div[2]/div/div/div/div[2]/div/div[2]/div/div[3]/div[7]/button
    Sleep    1s
    Click Element    xpath=/html/body/div[3]/div[3]/div/div[2]/button[2]
    
    Close Browser
