import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Web3 from 'web3';
import ItemManagerContract from "./ItemManager.json"
import ItemContract from "./Items.json";
import './Login.css'
class Logic extends Component {
    state = { loaded: false, itemName: "example_1", itemCost: "0" }

    componentDidMount = async () => {
        this.web3 = new Web3(Web3.givenProvider || "ws://localhost:9545"); const web3 = new Web3(Web3.givenProvider || "ws://localhost:9545")
        this.accounts = await this.web3.eth.getAccounts()
        this.networkId = await this.web3.eth.net.getId()
        this.itemManager = new this.web3.eth.Contract(
            ItemManagerContract.abi,
            ItemManagerContract.networks[this.networkId] && ItemManagerContract.networks[this.networkId].address,
        )
        this.item = new this.web3.eth.Contract(
            ItemContract.abi,
            ItemContract.networks[this.networkId] && ItemContract.networks[this.networkId].address,
        )
        this.listenToPaymentEvent()
        this.setState({ loaded: true })

    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async () => {
        const { itemName, itemCost } = this.state
        let result;
        this.itemManager.methods.createItem(itemName, itemCost).send({ from: '0x616a475b4ebc8563c1e51cfdd23c24d7fc0d8348' }).then((res) => {
            result = res;
            alert('pay ' + Web3.utils.fromWei(itemCost,'ether') + 'in Wei to ' + result.events.SupplyChain.returnValues.itemAddress)
            console.log('pay ' + Web3.utils.fromWei(itemCost,'ether') + 'in Wei to ' + result.events.SupplyChain.returnValues.itemAddress)

        }
        )

    }

    
    listenToPaymentEvent = () => {
        let self =this;
        this.itemManager.events.SupplyChain().on("data", async function (e) {
            console.log(e);
            let itemObj = await self.itemManager.methods.mapper(e.returnValues.itemIndex).call()
            if(itemObj.state==0){
            console.log(itemObj.identifier + 'was created successfully')
            }
            else if(itemObj.state==1){
            console.log(itemObj.identifier + 'was paid successfully!. Deliver it now');
            }
        })    
    }
    


    render() {
        if (!this.state.loaded)
            return (<div>
                <h1>Loading Contract</h1>
            </div>)
        else
            return (
                <div className='main-div'>
                    <div className='createDiv'>
                        <div className='subDiv'>
                            <h2>Create a Item</h2>
                        </div>
                        <div className='subDiv'>
                            <input type="text" name="itemName" id="itemName" placeholder="Item-Name" onChange={this.handleInputChange} />
                        </div>
                        <div className='subDiv'>
                            <input type="text" name="itemCost" id="itemCost" placeholder='Price in Wei' onChange={this.handleInputChange} />
                        </div>
                        <div className='subDiv'>
                            <Button variant="primary" size="lg" onClick={this.handleSubmit} active>Create</Button>{' '}
                        </div>
                    </div>
                </div>
            );
    }
}

export default Logic;