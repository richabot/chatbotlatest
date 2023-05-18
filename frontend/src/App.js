
import './App.css';
import { Route, Routes } from 'react-router-dom';
import CustomizationPage from './component/CustomizationPage';
import ChatbotPage from './component/ChatbotPage';
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import Navbar from './component/Navbar';
import Auth from './component/Auth';
import Homepage from './component/Homepage';

function App() {
  return (
    <div className="App">
        
     
       <Routes>
       <Route
					path="/"
					element={
						<Auth>
							<Homepage/>
						</Auth>
					}
				/>
       <Route
					path="/customisation"
					element={
						<Auth>
							<CustomizationPage/>
						</Auth>
					}
				/>
 <Route path="/:userId" element={<ChatbotPage/>} />
<Route path="/signup"  element={<SignUp/>} />
<Route path="/signin"  element={<SignIn/>} />
   
  
     </Routes>
    </div>
  );
}

export default App;

