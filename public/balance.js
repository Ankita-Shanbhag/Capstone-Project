function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  
  const ctx = React.useContext(UserContext);  

  function handle(){
    console.log(email);
    const url =
    `/account/balance/${email}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.text()
      if (!data) {
        console.log('User does not exist')      
        props.setStatus('Error: User does not exist!')      
        return;      
      }
      data = JSON.parse(data);
      console.log(data);
      console.log(data.balance);
      props.setStatus(`Your balance is ${data.balance}`);
      props.setShow(false);
      return;      
    })();
    props.setShow(false);      
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}