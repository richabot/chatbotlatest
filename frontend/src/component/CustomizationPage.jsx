

import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import axios from 'axios';

import { useParams } from 'react-router-dom'
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from 'styled-components';
import {Segment} from "semantic-ui-react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Navbar from './Navbar';
import { SHA256 } from 'crypto-js';
// import messageicon from "../messageicon.png"
const CustomizationPage = () => {
  const [headerColor, setHeaderColor] = useState("#DCA3DC");
  const [bubbleColor, setBubbleColor] = useState("#7EDC7E");
 
  const [headerBackColor, setHeaderBackColor] = useState("#EFEBEB");
  const [botfontcolor,setBotfontcolor]=useState("#EFEBEB")
  
  
  const [message1,setMessage]=useState("Hello Welcome")
  const [firstmessgae,setFirstMessage]=useState("How can?")


  const userIdfull = localStorage.getItem("userid");
  
 
  function generateUserId(email) {
    const hashedEmail = SHA256(email).toString();
    const userId = hashedEmail.slice(0, 8); // Take the first 8 characters as the user ID
    return userId;
  }

  const userId = generateUserId(userIdfull);
console.log(userId,"userId"); // Output: "7f35c71d"
  // handleUserInput
  const code = `<script src="http://localhost:3000/${userId}"></script>`;
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
       
        setFirstMessage(customization.startmessage)
      
      } catch (error) {
        console.error('Error fetching customization:', error);
      }
    };

    fetchCustomization();
  }, []);




  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
  
    console.log(headerColor, headerBackColor,bubbleColor, userId,botfontcolor, 'data to be sent');
    try {
      const response = await axios.post('http://localhost:8080/customizations', {
        userId,
        headerColor,
        headerBackColor,
        bubbleColor,
        message1,
        firstmessgae,
        botfontcolor
      });
      console.log(response,headerBackColor, bubbleColor,userId,botfontcolor,'success');
    
      window.location.href = `http://localhost:3000/${userId}`;
    } catch (error) {
      console.error('Error saving customization:', error);
    }
  };

  const handleHeaderColorChange = (e) => {
    console.log(e.target.value,"value")
    setHeaderColor(e.target.value)
  };
  const handleBotfontColorChange = (e) => {
    console.log(e.target.value,"value")
    setBotfontcolor(e.target.value)
  };

  

  const handleHeaderBackColorChange = (e) => {
    console.log(e.target.value,"value")
    setHeaderBackColor(e.target.value);
  };
  const handleBubbleColorChange = (e) => {
    setBubbleColor(e.target.value);
  };


  
 



  //chatbot display

  const steps = [

    {

      id: "Greet",

      message: "how are can we assist ? ",

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
    botBubbleColor: bubbleColor,
    botFontColor:botfontcolor,
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
    
  };


  
  return (

<>
<Navbar/>
<div className="container">
  <SyntaxHighlighter language="html" style={solarizedlight}>

{`<script src="http://localhost:3000/${userId}"></script>`}
</SyntaxHighlighter>
<CopyToClipboard text={code}>
 <button className='btnposition'>Copy</button>
</CopyToClipboard>
  <div className="row">
    <div className="col-md-6 border1">
    
  


<form onSubmit={handleSubmit} className="form-horizontal" style={{ marginTop: '80px'}}>
<div className="form-group">
    <div className="header-container">
      <label className="control-label col-sm-2" htmlFor="email">
        Heading
      </label>
      <input value={message1} onChange={(e)=>setMessage(e.target.value)}/>
    </div>
    <div className="col-sm-10  colorbox">
   
    </div>
  </div>

  <br/>
  <div className="form-group">
    <div className="header-container">
      <label className="control-label col-sm-2" htmlFor="email">
        First message
      </label>
      <input value={firstmessgae} onChange={(e)=>setFirstMessage(e.target.value)}/>
    </div>
    <div className="col-sm-10  colorbox">
   
    </div>
  </div>
  <br/>
  {/* <div className="form-group">
    <div className="header-container">
      <label className="control-label col-sm-2" htmlFor="email">
      Header Color
      </label>
     
    </div>
    <div className="col-sm-10  colorbox">
     
<input  type="color" value={headerColor} onChange={handleHeaderColorChange} />
    </div>
  </div> */}

<div className="form-group">
  <div className="header-container">
    
    {/* <div onClick={handlebubbleclick} className="colordisplay" style={{ backgroundColor: bubbleColor }}></div> */}
  </div>
  <div className="col-sm-10  colorbox">
    <div className="inline-elements">
      <label className="input-label" htmlFor="bubbleColor">Header Color</label>
      <input className="input-field boxfit" type="color" value={headerColor} onChange={handleHeaderColorChange} />
    </div>
  </div>
</div>

  <br/>
 
<div className="form-group">
  <div className="header-container">
    
    {/* <div onClick={handlebubbleclick} className="colordisplay" style={{ backgroundColor: bubbleColor }}></div> */}
  </div>
  <div className="col-sm-10  colorbox">
    <div className="inline-elements">
      <label className="input-label" htmlFor="bubbleColor">Bot font color</label>
      <input className="input-field boxfit" type="color" value={botfontcolor} onChange={handleBotfontColorChange} />
    </div>
  </div>
</div>

<br/>

<div className="form-group">
  <div className="header-container">
    
    {/* <div onClick={handlebubbleclick} className="colordisplay" style={{ backgroundColor: bubbleColor }}></div> */}
  </div>
  <div className="col-sm-10  colorbox">
    <div className="inline-elements">
      <label className="input-label" htmlFor="bubbleColor">Bubble Color</label>
      <input className="input-field boxfit" type="color" value={bubbleColor} onChange={handleBubbleColorChange} />
    </div>
  </div>
</div>

  <br/>
  {/* <div className="form-group" >
    <div className="header-container">
   
     
    </div>
    <div className="col-sm-10 colorbox" >
      <div className="inline-elements"></div>
      <label className="input-label" htmlFor="bubbleColor">Background</label>
      <input type="color" value={headerBackColor} onChange={handleHeaderBackColorChange} />
    </div>
  </div> */}

<div className="form-group">
  <div className="header-container">
    
    {/* <div onClick={handlebubbleclick} className="colordisplay" style={{ backgroundColor: bubbleColor }}></div> */}
  </div>
  <div className="col-sm-10  colorbox">
    <div className="inline-elements">
      <label className="input-label" htmlFor="bubbleColor">Background Color</label>
      <input className="input-field" type="color" value={headerBackColor} onChange={handleHeaderBackColorChange} />
    </div>
  </div>
</div>


  <button className="positionbtn btn btn-primary"  type="submit">Customize</button>
</form>

    </div>

 <div  className="col-md-6 border1 ">
 <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
    
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      <div style={{color:`${botfontcolor}`,fontFamily: 'Helvetica Neue',backgroundColor:`${bubbleColor}`}} className='headertext'>{firstmessgae}</div>
   <Segment  style={{ position:"relative" ,width: "400px", zIndex: "1" }}>
       <ThemeProvider theme={theme}>
   <ChatBot headerTitle={message1} style={theme}  steps={steps}   />
  </ThemeProvider>
  </Segment>
   </div>
   </div>


 </div>
  </div>
 
</div>
</>
   


 
  );
};

export default CustomizationPage;



