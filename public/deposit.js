function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  const ctx = React.useContext(UserContext);  

  function handle(){
    console.log(email,amount);
    const url =
    `/account/deposit/${email}/${amount}`;
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
      console.log(data.value.email, data.value.balance);
      console.log('Amount successfully deposited')   
      props.setStatus(`Amount successfully deposited. Your new balance is ${data.value.balance}`);
      props.setShow(false);
      return;      
    })();
    props.setShow(false);      
  }

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>
  </>);
}