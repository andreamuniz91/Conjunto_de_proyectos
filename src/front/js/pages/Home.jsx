import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

import { Edit } from "./Edit.jsx";
import { ContactListHome } from "./ContactListHome.jsx";
import { NewContact } from "./NewContact.jsx";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		
		<div className="container">
		
			
		</div>

	);
};
