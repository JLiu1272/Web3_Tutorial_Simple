import { useEffect, useState } from "react";
import Web3 from "web3";
import * as TruffleContract from "truffle-contract";

import { IContactCoin } from "./contract-interfaces/IContactCoin";

const ContactsContract = TruffleContract(require("./contracts/Contacts.json"));

function App(): JSX.Element {
  const [account, setAccount] = useState<string>(); // state variable to set account.
  const [contacts, setContacts] = useState([]);
  const [,setContract] = useState<IContactCoin>();

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.requestAccounts();
      ContactsContract.setProvider("http://localhost:7545");

      setAccount(accounts[0]);
      const contract = await ContactsContract.deployed();
      setContract(contract);

      const counter = await contract.count();

      for (var i = 1; i <= counter.toNumber(); i++) {
        const contact = await contract.contacts(i);
        setContacts((contacts) => [...contacts, contact]);
      }
    }

    load();
  }, []);

  return (
    <div>
      Your account is: {account}
      <h1>Contacts</h1>
      <ul>
        {Object.keys(contacts).map((contact, index) => (
          <li key={`${contacts[index].name}-${index}`}>
            <h4>{contacts[index].name}</h4>
            <span>
              <b>Phone: </b>
              {contacts[index].phone}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
