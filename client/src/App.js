import React, { Component, useEffect } from "react"; // eslint-disable-line no-unused-vars
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import "./App.css";


class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    projectLength: 0,
    projects: [],
    Lotto: [],
    projectName: "",
    projectDesc: "",
    projectMoney: "0",
    lottoname: ""
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      console.log("instance", instance);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.init);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  init = async () => {
    this.getValue();
    this.getProjectLength();
  };

  getValue = async () => {
    const { accounts, contract } = this.state; // eslint-disable-line no-unused-vars

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.

    this.setState({ storageValue: response });
  };

  setValue = async () => {
    const { accounts, contract } = this.state;
    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });
    await this.getValue();
  };

  addProject = async () => {
    const { accounts, contract } = this.state;

    const name = this.state.projectName;
    const desc = this.state.projectDesc;
    const money = parseInt(this.state.projectMoney);

    await contract.methods
      .addProject(name, desc, money)
      .send({ from: accounts[0] });
    await this.getProjectLength();
  };

  addLotto = async () => {
    const { accounts, contract } = this.state; // eslint-disable-line no-unused-vars

    const lottoName = this.state.lottoName1; // eslint-disable-line no-unused-vars
    

    await contract.methods
      .addLotto(lottoName)
      .send({ from: accounts[0] });
      await this.getProjectLength();
      };

  getProjectLength = async () => {
    const { accounts, contract } = this.state; // eslint-disable-line no-unused-vars

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getProjectLength().call();

    // Update state with the result.
    this.setState({ projectLength: response }, this.displayProjects);
  };

  displayProjects = async () => {
    const { accounts, contract } = this.state; // eslint-disable-line no-unused-vars

    let projects = [];
    for (let i = 0; i < this.state.projectLength; i++) {
      let project = await contract.methods.projects(i).call();
      console.log(project);
      projects.push(project);
    }

    this.setState({ projects });
  };''

    render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
        <div
          onClick={() => {
            this.setValue();
          }}
        >
          Click to set 5
        </div>
        <div
          onClick={() => {
            this.addProject();
          }}
        >
          Add Project
        </div>
        <div>Project Length : {this.state.projectLength}</div>
        <input
          type="text"
          value={this.state.projectName}
          onChange={(event) => {
            this.setState({ projectName: event.target.value });
          }}
        />
        <input
          type="text"
          value={this.state.projectDesc}
          onChange={(event) => {
            this.setState({ projectDesc: event.target.value });
          }}
        />
        <input
          type="text"
          value={this.state.projectMoney}
          onChange={(event) => {
            this.setState({ projectMoney: event.target.value });
          }}
        />
        <table>
          {this.state.projects.map((project, idx) => {
            return (
              <tr key={idx}>
                <td>{project.name}</td>
                <td>{project.desc}</td>
                <td>{project.targetMoney}</td>
              </tr>
            );
          })}
        </table>
        <div
          onClick={() => {
             this.addLotto();
          }}
        >
          ADD LOTTO
        </div>
        <input
          type="text"
          value={this.state.lottoName1}
          onChange={(event) => {
            this.setState({ lottoName1: event.target.value });
          }}
        />
         <table>
          {this.state.projects.map((Lotto, idx) => {
            return (
              <tr key={idx}>
                <td>{Lotto.lottoName1}</td>
              </tr>
            );
          })}
        </table>
        <div
          onClick={() => {
            this.lotto();
          }}
        >
          lotto
        </div>
      </div>
    );
  }
}





export default App;