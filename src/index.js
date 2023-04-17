import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './components/CSS/GlobalStyle';
import AuthContextProvider from './context/AuthContext';
import ProductContextProvider from './context/ProductContext';
import MessageContextProvider from './context/MessageContext';
import DetailContextProvider from './context/DetailContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ProductContextProvider>
      <DetailContextProvider>
        <MessageContextProvider>
          <GlobalStyle>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </GlobalStyle>
        </MessageContextProvider>
      </DetailContextProvider>
    </ProductContextProvider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
