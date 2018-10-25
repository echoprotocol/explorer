import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const containerStyle = {
	zIndex: 1999,
};

const Toast = () => (
	<ToastContainer position="top-right" autoClose={10000} style={containerStyle} />
);

export default Toast;
