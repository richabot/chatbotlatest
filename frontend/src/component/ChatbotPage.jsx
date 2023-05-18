import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from 'styled-components';
import {Segment} from "semantic-ui-react"
import messageicon from "../messageicon.png"

import close from "../close.png"


//copy 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const ChatbotPage = () => {
    const { userId } = useParams();
    console.log(userId,"custo,isatio")
const [headerColor,setHeaderColor]=useState("purple")
const [headerBackColor,setHeaderBackColor]=useState("white")
const [BubbleColor,setBubbleColor]=useState("green")
const [botfontcolor,setBotfontcolor]=useState("red")
const [message,setMessage]=useState("Chat")
const [startmessage,setStartMessage]=useState("Hello Welcome")

    useEffect(() => {
        const fetchCustomization = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/customizations/${userId}`);
            const customization = response.data;
            console.log(customization,"customisation")
            setHeaderColor(customization.headerColor);
            setHeaderBackColor(customization.headerBackColor)
            setBubbleColor(customization.bubbleColor)
            setMessage(customization.heading)
           
            setStartMessage(customization.startmessage)
            setBotfontcolor(customization.botfontcolor)
          
          } catch (error) {
            console.error('Error fetching customization:', error);
          }
        };
    
        fetchCustomization();
      }, [userId]);



      ///chatbot
      const [chatVisible, setChatVisible] = useState(false);

      const handleImageClick = () => {
        setChatVisible(!chatVisible);
        console.log(chatVisible)
      };
      const steps = [
    
        {
    
          id: "Greet",
    
          message: startmessage,
    
          trigger: "Done",
    
        },
    
        {
    
          id: "Done",
    
          message: "Please enter your name!",
    
          trigger: "waiting1",
    
        },
    
        {
    
          id: "waiting1",
    
          user: true,
    
          trigger: "Name",
    
        },
    
        {
    
          id: "Name",
    
          message: "Hi {previousValue}, Please select your issue",
    
          trigger: "issues",
    
        },
    
        {
    
          id: "issues",
    
          options: [
    
            {
    
              value: "React",
    
              label: "React",
    
              trigger: "React",
    
            },
    
            { value: "Angular", label: "Angular", trigger: "Angular" },
    
          ],
    
        },
    
        {
    
          id: "React",
    
          message:
    
            "Thanks for letting your React issue, Our team will resolve your issue ASAP",
    
          // end: true,
    
        },
    
        {
    
          id: "Angular",
    
          message:
    
            "Thanks for letting your Angular issue, Our team will resolve your issue ASAP",
    
          // end: true,
    
        },
    
      ]; 
     
      const theme = {
        background: headerBackColor,
        fontFamily: 'Helvetica Neue',
        headerBgColor: headerColor,
        headerFontColor: '#fff',
        headerFontSize: '15px',
        botBubbleColor: BubbleColor,
        botFontColor: botfontcolor,
        userBubbleColor: '#fff',
        userFontColor: '#4a4a4a',
      };
    
      const code = `<iframe src="https://chatbot1122.netlify.app/${userId}"></iframe>`;
   
  return (
    <div>


     <div>
  { !chatVisible &&<img
   style={{ position: "fixed", bottom: "20px", right: "20px" ,cursor: "pointer"}}
     src={messageicon}
     alt="Chat Icon"
     onClick={handleImageClick}

   />} 
   {chatVisible && (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
     <img 
     src={close}
      alt="Close Icon"
      style={{
       position: "absolute",
   top: "-504px",
   right:" 65px",
   cursor: "pointer",

   height: "30px",
       zIndex: 1,
     }}
      onClick={handleImageClick}/>
     <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
       <Segment  style={{ width: "400px" }}>
       <ThemeProvider theme={theme}>
         <ChatBot headerTitle={message} style={theme} color="yellow"steps={steps} />
        </ThemeProvider>
       </Segment>
     </div></div>
   )}
 </div>
    </div>
  )
}

export default ChatbotPage


