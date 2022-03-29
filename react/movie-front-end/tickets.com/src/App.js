const GitUser = ({login, name, bio}) => {
  return (
    <div className="App">
      <img
        src={`https://github.com/${login}.png`}
        width={200}
        height={200}
        alt="git profile user icon"
      />
      <h2>{name}</h2>
      <small>@{login}</small>
      <h3>{bio}</h3>
    </div>
  );
}


const Users = ()=>{
  const users = [
    {
      name: "Tarcísio Prates",
      login :"t4rcisio",
      bio :"Computer engineer",
    }, 
   {
    name:"Linus Torvalds",
    login:"torvalds",
    bio:"linux",
   }
  ]

return users
}

const App = ()=> {

  const users = Users()

  return (
   
    <>
      {users.map(({name,login,bio})=> <GitUser
        key={login}
        name = {name}
        login = {login}
        bio = {bio}
        />
      )}
    </>
  );
}

export default App;
