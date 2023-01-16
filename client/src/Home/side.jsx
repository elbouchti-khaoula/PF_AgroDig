import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { follow, unfollow } from '../Login';
import { useUsers } from '../Messages/contexts/userContext';
import { COLORS } from '../utils/colors';

const Side = () => {
  const { suggested, getSuggestedUsers } = useUsers();
  const { user } = useAuth();
  const [users, setUsers] = React.useState([]);
  const {  isDark, following } = useApp()

  const handleSuggested = async () => {
    const users = suggested.filter(use => use._id !== user._id)
    const newusers = users.map(use => {
      return {
        ...use,
        isFollowing: following.find(f => f.user === use._id)
      }
    }).filter(use => use.isFollowing === undefined)
    console.log(newusers);
    setUsers(newusers.slice(0, 5))
  }

  useEffect(() => {
    getSuggestedUsers();
   }, []);

  useEffect(() => {
    handleSuggested()
  }, [suggested, user, following]);

  return (
    <div className={`min-w-[200px] sticky top-0 px-3 xtab:flex flex-col hidden w-1/2 ${isDark && 'text-white'}`}>
      <div className="flex text-sm mt-6 w-full items-center justify-between">
        <Link to={`/profile`} className="flex items-center">
          <div className="flex overflow-hidden w-[50px] h-[50px] rounded-full">
            <img className="min-w-full min-h-full object-cover"
             src={user.profile} alt="" />
          </div>
          <div className="flex flex-col ml-3">
            <p className="font-semibold">{user.fullname}</p>
            <p className="opacity-80 font-light">@{user.username}</p>
          </div>
        </Link>
        <Link to={`/profile`} style={{color:COLORS.myGreen}} className="cursor-pointer">View Profile</Link>
      </div>
      <div className="flex flex-col w-full mt-6 h-[70vh] overflow-auto">
        <div className="flex items-center justify-between w-full">
          <p className="text-md font-semibold text-slate-600" style={{fontSize:12}}>Suggested For You</p>
          <p className="font-semibold text-sm cursor-pointer">See All</p>
        </div>
        {users.map((user, index) => {
          return (
            <Suggested key={index} use={user} />
          )})
          }
      </div>

    </div>
  )
}

export default Side


const Suggested = ({use})=>{
  const [foll, setFoll] = React.useState(false);
  const { user, setUser } = useAuth();

  const handleFollow = () => {
    if (foll) {
      unfollow(use)
      setUser({...user, following: user.following +-1})
      setFoll(false)
    
    }else{
      follow(use)
      setUser({...user, following: user.following +1});
    }
    setFoll(!foll)
  }

  return(
    <div className="w-full mt-3 text-sm flex justify-between items-center">
      <Link to={`/profile/${use._id}`} className="flex items-center">
        <div className="flex overflow-hidden w-[40px] h-[40px] rounded-full">
          <img className="min-w-full min-h-full object-cover"
           src={use.profile} alt="" />
        </div>
        <div className="flex flex-col ml-3">
          <p className="font-semibold" style={{fontSize:12}}>{use.fullname}</p>
          <p className="opacity-80 font-light">@{use.username}</p>
        </div>  
      </Link>
      <p onClick={handleFollow}
    style={{color:COLORS.myGreen}}
      className=" cursor-pointer">{foll?"Following": "Follow"}</p>
    </div>
  )
}