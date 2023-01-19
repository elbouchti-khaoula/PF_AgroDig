import React, { useContext, useState, useEffect } from "react";
import { getUserById, useAuth } from "../../contexts/AuthContext";
import { getCookie } from "../../contexts/RequireAuth";
import configData from "../../Config.json";
import profilePic from '../../Home/Images/profileIcon.png';

const UsersContext = React.createContext();

export function useUsers() {
	return useContext(UsersContext);
}

export function UserProvider({ children }) {
	const [users, setUsers] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [suggested, setSuggested] = useState([]);
	const [mobile, setMobile] = useState(false);

	const mobileHandler = () => {
		setMobile(true);
	};

	const getUsers = async () => {
		const endpoint = configData.USER_SERVICE_URL;

		const res = await fetch(`${endpoint}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						authorization: "Bearer " + getCookie("token"),
					},
				});
		const data = await res.json();
		data.map((user) => user.profile = profilePic )
		setUsers(data);

	}



	//for now it just gets users until we implement a suggestion algo
	const getSuggestedUsers = async () => {
		const endpoint = configData.USER_SERVICE_URL;

		const res = await fetch(`${endpoint}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						authorization: "Bearer " + getCookie("token"),
					},
				});
		const data = await res.json();
		setSuggested(data);
	};

	const updatePhoto = async (datas) => {
		console.log(datas);
		const res = await fetch(
			"https://photocorner33.onrender.com/user/updateProfilePicture",
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + getCookie("token"),
				},
				body: JSON.stringify({ imageStr: datas.imageStr }),
			}
		);
		const data = await res.json();
		const user = await getUserById(datas.user);
		return { done: true, user: user };
	};
	const updateCoverPhoto = async (datas) => {
		console.log(datas);
		const res = await fetch(
			"https://photocorner33.onrender.com/user/updateCover",
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + getCookie("token"),
				},
				body: JSON.stringify({ imageStr: datas.imageStr }),
			}
		);
		const data = await res.json();
		console.log(data);
		const user = await getUserById(datas.user);
		return { done: true, user: user };
	};

	useEffect(() => {
		getUsers();
	}, []);

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<UsersContext.Provider
			value={{
				users,
				setUsers,
				mobile,
				setMobile,
				getSuggestedUsers,
				isLoggedIn,
				setIsLoggedIn,
				suggested,
				updatePhoto,
				mobileHandler,
				updateCoverPhoto,
			}}
		>
			{children}
		</UsersContext.Provider>
	);
}
