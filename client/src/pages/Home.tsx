import { useEffect, useState } from "react";
import AuthDataService from "../service/AuthDataService";
import { IUser } from "../types/auth.type";

const Home = (props: {name: string}) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    AuthDataService.getUser().then((response: any) => setUser(response.data)).catch(e => {
      console.error(e)
    })
  })

  return (
    <>
      <p>Home ({typeof user !== 'undefined' ? "loggedIn" : "notLoggedIn"})</p>
      {typeof user !== 'undefined' ? <>
        <p>{user.name} {user.id}</p>
      </> : <>
        <p>Please log in</p>
      </>}
    </>
  );
}

export default Home;