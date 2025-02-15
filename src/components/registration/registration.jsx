import axios from 'axios';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const emp = { id, name, email };

  const navigate = useNavigate();
  const submitt = (e) => {
    e.preventDefault();
    console.log(emp);
    axios.post("http://localhost:9091/investor/registerInvestor", emp).then(
      resp => console.log(resp.data)
    )
    navigate("/")
  }
  return (
    <div>
      Register
      <form onSubmit={submitt} className='naik'>
        Id:  <input type='number' name='id' value={id} onChange={(e) => setId(e.target.value)}></input><br />
        Name: <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)}></input><br />
        Email:  <input type='text' name='salary' value={email} onChange={(e) => setEmail(e.target.value)}></input><br />
        <input type='submit'></input>
      </form>
    </div>
  )
}

export default Registration