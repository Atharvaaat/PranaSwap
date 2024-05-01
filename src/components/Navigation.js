import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import './Navigation.css';


const Navigation = ({ account, setAccount }) => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            if (account) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const balance = await provider.getBalance(account);
                setBalance(ethers.utils.formatEther(balance));
            }
        };
    
        const updateBalanceOnBlock = async (blockNumber) => {
            if (account) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const balance = await provider.getBalance(account);
                setBalance(ethers.utils.formatEther(balance));
            }
        };
    
        fetchBalance();
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        provider.on('block', updateBalanceOnBlock);
    
        return () => {
            if (account) {
                provider.removeListener('block', updateBalanceOnBlock);
            }
        };
    }, [account]);
    

    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account);
    };

    // Function to truncate the balance
    const truncateBalance = (balance) => {
        if (balance.length > 7) {
            return balance.slice(0, 7) + '...';
        }
        return balance;
    };

    return (
        <nav>
            <div className='nav__brand'>
                <img src="/pranaswap_logo.jpeg" alt="PranaSwap Logo" className="logo" />
                <h1>PranaSwap</h1>
            </div>

            <div className="account-info">
                {account ? (
                    
                        <button type="button" className='nav__connect'>
                            {`${account.slice(0, 6)}...${account.slice(38, 42)}`}
                       
                        <span>| Bal: {truncateBalance(balance)} ETH</span>
                        </button>
                        
                ) : (
                    <button type="button" className='nav__connect' onClick={connectHandler}>
                        Connect
                    </button>
                    
                )}
            </div>

            <ul className='nav__links'>
                <li><a href="#Renewable Energy">Renewable Energy</a></li>
                <li><a href="#Fossil Fuels">Fossil Fuels</a></li>
                <li><a href="#Nuclear Energy">Nuclear Energy</a></li>
                
            </ul>
        </nav>
    );
};

export default Navigation;
