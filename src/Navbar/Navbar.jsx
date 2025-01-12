import hamburger from "../images/hamburger.png";
import logo from "../images/Consumer_Wordmark.svg";
import shield from "../images/shield-3.svg";
import easyToUse from "../images/easyToUse-2.svg";
import fiat from "../images/fiat-2.svg";
import crypto from "../images/crypto101-3.svg";
import global from "../images/globalConnections-3.svg";
import coinBaseOne from "../images/coinbaseOneLogo-3.svg";
import privateClient from "../images/privateClientNavigation-4.svg"
import earn from "../images/earnNavigation-5.svg"
import decentralized from "../images/decentralizedWeb3-3.svg"
import learningRewards from "../images/learningRewardsNavigation-4.svg"
import card from "../images/cardNavigation-4.svg"
import walletLogo from "../images/walletLogoNavigation.svg"
import icon from "../images/coin-icon.svg"
import blackIcon from "../images/coin-black.svg"
import individualsUpsell from "../images/individuals_upsell.png"
import institutional from "../images/institutional.svg"
import prime from "../images/prime.svg"
import assets from "../images/asset.svg"
import commerce from "../images/commerce.svg"
import exchange from "../images/exchange.svg"
import internationalExchanges from "../images/internationalExchange.svg"
import derivativesExchanges from "../images/derivativesExchanges.svg"
import staking from "../images/staking.svg"
import bussinesUpsell from "../images/businesses_upsell.png"
import DeveloperPlat from "../images/developerPlat.svg"
import Base from "../images/Base.svg"
import Wallets from "../images/Wallets.svg"
import OnRamp from "../images/OnRamp.svg"
import OnChainKit from "../images/OnChainKit.svg"
import staking2 from "../images/StakingProd.svg"
import developerUpsell from "../images/developers_upsell.png"
import companyUpsell from "../images/company_upsell.png"
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends, faNewspaper, faShieldAlt, faComments, faInfoCircle, faSuitcase, faSun, faMoon, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import learnUpsel from "../images/learn_upsell.png"
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function Navbar() {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  // Initialize Firebase Authentication
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserAvatar(currentUser.uid); // Fetch avatar from Firestore
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Fetch avatar from Firestore
  const fetchUserAvatar = async (uid) => {
    try {
      const db = getFirestore();
      const userDoc = doc(db, 'users', uid); // Adjust collection name as needed
      const userSnap = await getDoc(userDoc);

      if (userSnap.exists()) {
        setAvatar(userSnap.data().avatar || null); // 'avatar' should be the field name in Firestore
      }
    } catch (error) {
      console.error('Error fetching user avatar:', error);
    }
  };
  return (
    <>
      <nav className="navbar">
        <Link className="rightmrg" to="/"><img className="title" src={logo} alt="Logo" /></Link>

        <ul className=" currencies none">
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </ul>

        <ul className=" learn none">
          <Link to="/learn">Learn</Link>
          <div className="dropdown">
            <div className="drop-1">

              <div className="drop-flex">
                <img className="drop-img" src={easyToUse} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Tip and tutorials</div>
                  <p className="drop-desc">Guides for getting started</p>
                </div>
              </div>
              
              <div className="drop-flex">
                <img className="drop-img" src={fiat} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Update the system</div>
                  <p className="drop-desc">It's time to break the cycle</p>
                </div>
              </div>
              
              <div className="drop-flex">
                <img className="drop-img" src={shield} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Crypto policy</div>
                  <p className="drop-desc">Crypto moves America forward</p>
                </div>
              </div>
              
            </div>

            <div className="drop-2">

            <div className="drop-flex">
                <img className="drop-img" src={crypto} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Crypto basics</div>
                  <p className="drop-desc">Explaining the fundamentals</p>
                </div>
              </div>

              <div className="drop-flex">
                <img className="drop-img" src={global} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Explore onchain</div>
                  <p className="drop-desc">Go deeper in crypto</p>
                </div>
              </div>

            </div>
            
            <div className="drop-3">
              <img className="drop-big-img" src={learnUpsel} alt="" />
              <div>
                <div className="drop-title">Crypto basics explained</div>
                <p className="drop-desc">Start your crypto journey with our guide</p>
              </div> 
              <div className="drop-blue">Start here <span><FontAwesomeIcon icon={faChevronRight} /></span></div>
            </div>
          </div>
        </ul>

        <ul className="flexs company none">
          <a>Individuals</a>
          <div className="dropdown">
            <div className="drop-1">

              <div className="drop-flex">
                <img className="drop-img" src={icon} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Buy and sell</div>
                  <p className="drop-desc">Buy, sell, and use crypto</p>
                </div>
              </div>
              
              <div className="drop-flex">
                <img className="drop-img" src={walletLogo} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Wallet</div>
                  <p className="drop-desc">The best self-hosted crypto wallet</p>
                </div>
              </div>
              
              <div className="drop-flex">
                <img className="drop-img" src={card} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Card</div>
                  <p className="drop-desc">Spend crypto, get crypto back</p>
                </div>
              </div>
              
              <div className="drop-flex">
                <img className="drop-img" src={learningRewards} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Learning rewards</div>
                  <p className="drop-desc">Receive crypto for completing tasks</p>
                </div>
              </div>

              <div className="drop-flex">
                <img className="drop-img" src={decentralized} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Onchain</div>
                  <p className="drop-desc">Dive into the world of onchain apps</p>
                </div>
              </div>

            </div>

            <div className="drop-2">

            <div className="drop-flex">
                <img className="drop-img" src={blackIcon} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Advanced</div>
                  <p className="drop-desc">Professional-grade trading tools</p>
                </div>
              </div>

              <div className="drop-flex">
                <img className="drop-img" src={earn} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Earn</div>
                  <p className="drop-desc">Stake your crypto and earn rewards</p>
                </div>
              </div>

              <div className="drop-flex">
                <img className="drop-img" src={privateClient} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Private Client</div>
                  <p className="drop-desc">For trusts, family offices, UHNWIs</p>
                </div>
              </div>

              <div className="drop-flex">
                <img className="drop-img" src={coinBaseOne} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Coinbase One</div>
                  <p className="drop-desc">Get zero trading fees and more</p>
                </div>
              </div>

            </div>
            
            <div className="drop-3">
              <img className="drop-big-img" src={individualsUpsell} alt="" />
              <div>
                <div className="drop-title">Wallet is now on web</div>
                <p className="drop-desc">Buy, swap, send, stake, and mint easily</p>
              </div> 
              <div className="drop-blue">Launch Wallet web app <span><FontAwesomeIcon icon={faChevronRight} /></span> </div>
            </div>
          </div>
        </ul>

        <ul className="flexs businesses none">
          <a>Businesses</a>
        <div className="dropdown">
            <div className="drop-1">

              <div className="drop-flex">
                <img className="drop-img" src={institutional} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Institutional</div>
                  <p className="drop-desc">Solutions for institutional investors</p>
                </div>
              </div>
              
              <div className="drop-flex">
                <img className="drop-img" src={prime} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Prime</div>
                  <p className="drop-desc">Integrated trading, finance, and custody</p>
                </div>
              </div>
              
              <div className="drop-flex">
                <img className="drop-img" src={assets} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Assets listings</div>
                  <p className="drop-desc">List your asset on Coinbase</p>
                </div>
              </div>

              <div className="drop-flex">
                <img className="drop-img" src={commerce} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Commerce</div>
                  <p className="drop-desc">Accept crypto from anyone</p>
                </div>
              </div>
              
            </div>

            <div className="drop-2">

            <div className="drop-flex">
                <img className="drop-img" src={exchange} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Exchange</div>
                  <p className="drop-desc">Spot markets for high-frequency trading</p>
                </div>
              </div>

              <div className="drop-flex">
                <img className="drop-img" src={internationalExchanges} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">International Exchange</div>
                  <p className="drop-desc">Access perpetual futures markets</p>
                </div>
              </div>

              <div className="drop-flex">
                <img className="drop-img" src={derivativesExchanges} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Derivatives Exchange</div>
                  <p className="drop-desc">Trade an accessible futures market</p>
                </div>
              </div>

              <div className="drop-flex">
                <img className="drop-img" src={staking} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Staking</div>
                  <p className="drop-desc">Explore staking across our products</p>
                </div>
              </div>

            </div>
            
            <div className="drop-3">
              <img className="drop-big-img" src={bussinesUpsell} alt="" />
              <div>
                <div className="drop-title">Onchain payment protocol</div>
                <p className="drop-desc">A new standard for onchain payments.</p>
              </div> 
              <div className="drop-blue">Go to Commerce <span><FontAwesomeIcon icon={faChevronRight} /></span> </div>
            </div>
          </div>
        </ul>

        <ul className="flexs developers none">
          <a>Developers</a>
        <div className="dropdown">
            <div className="drop-1">

              <div className="drop-flex">
                <img className="drop-img" src={DeveloperPlat} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Developer platform</div>
                  <p className="drop-desc">Developer tools and APIs</p>
                </div>
              </div>
              
              <div className="drop-flex">
                <img className="drop-img" src={Base} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Base</div>
                  <p className="drop-desc">An Etherum L2 to build onchain apps</p>
                </div>
              </div>
              
              <div className="drop-flex">
                <img className="drop-img" src={Wallets} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Wallets</div>
                  <p className="drop-desc">Enable the best wallet experience for any user</p>
                </div>
              </div>
              
            </div>

            <div className="drop-2">

            <div className="drop-flex">
                <img className="drop-img" src={OnRamp} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Onramp</div>
                  <p className="drop-desc">A secure fiat-to-crypto solution</p>
                </div>
              </div>

              <div className="drop-flex">
                <img className="drop-img" src={staking2} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">Staking</div>
                  <p className="drop-desc">Staking validators and tooling</p>
                </div>
              </div>

              <div className="drop-flex">
                <img className="drop-img" src={OnChainKit} alt="" />
                <div className="drop-subflex">
                  <div className="drop-title">OnchainKit</div>
                  <p className="drop-desc">Components for building onchain apps</p>
                </div>
              </div>

            </div>
            
            <div className="drop-3">
              <img className="drop-big-img" src={developerUpsell} alt="" />
              <div>
                <div className="drop-title">Build with OnchainKit</div>
                <p className="drop-desc">Making building onchain easy for everyone</p>
              </div> 
              <div className="drop-blue">Go to OnchainKit <span><FontAwesomeIcon icon={faChevronRight} /></span></div>
            </div>
          </div>
        </ul>

        <ul className="flexs company none">
          <a>Company</a>
          <div className="dropdown">
            <div className="drop-1">

              <div className="drop-flex">
              <FontAwesomeIcon icon={faInfoCircle} style={{fontSize:"16px", color: 'black', marginRight: '8px' }} />
                <div className="drop-subflex">
                  <div className="drop-title">About</div>
                  <p className="drop-desc">Powering the crypto economy</p>
                </div>
              </div>
              
              <div className="drop-flex">
              <FontAwesomeIcon icon={faUserFriends} style={{fontSize:"16px", color: 'black', marginRight: '8px' }} />
                <div className="drop-subflex">
                  <div className="drop-title">Affiliates</div>
                  <p className="drop-desc">Help introduce the wrold to crypto</p>
                </div>
              </div>
              
              <div className="drop-flex">
              <FontAwesomeIcon icon={faNewspaper} style={{fontSize:"16px", color: 'black', marginRight: '8px' }} />
                <div className="drop-subflex">
                  <div className="drop-title">Blog</div>
                  <p className="drop-desc">Read the latest from Coinbase</p>
                </div>
              </div>
              
            </div>

            <div className="drop-2">

            <div className="drop-flex">
            <FontAwesomeIcon icon={faSuitcase} style={{fontSize:"16px", color: 'black', marginRight: '8px' }} />
                <div className="drop-subflex">
                  <div className="drop-title">Careers</div>
                  <p className="drop-desc">Work with us</p>
                </div>
              </div>

              <div className="drop-flex">
              <FontAwesomeIcon icon={faComments} style={{fontSize:"16px", color: 'black', marginRight: '8px' }} />
                <div className="drop-subflex">
                  <div className="drop-title">Support</div>
                  <p className="drop-desc">Find answers to your questions</p>
                </div>
              </div>

              <div className="drop-flex">
              <FontAwesomeIcon icon={faShieldAlt} style={{fontSize:"16px", color: 'black', marginRight: '8px' }} />
                <div className="drop-subflex">
                  <div className="drop-title">Security</div>
                  <p className="drop-desc">The most trusted & secure</p>
                </div>
              </div>

            </div>
            
            <div className="drop-3">
              <img className="drop-big-img" src={companyUpsell} alt="" />
              <div>
                <div className="drop-title">Learn all about Coinbase</div>
                <p className="drop-desc">We're building the open financial system</p>
              </div> 
              <div className="drop-blue">Create your account <span><FontAwesomeIcon icon={faChevronRight} /></span></div>
            </div>
          </div>
        </ul>
        
          
        
        <div className="buttons">
          <div className="dark-mode-div" >
            <FontAwesomeIcon icon={faMoon} style={{fontSize:"16px", color: 'black', marginRight: '8px' }} />
          </div>
          
          <div>
          {user ? (
            <div
                onClick={() => navigate('/profile')}
                
              >
                <img
                  src={avatar || "test"}
                  alt="User Avatar"
                  className="navbar-avatar"
                />
              </div>
            ) : (
              <div>
                <button
                  onClick={() => navigate('/auth')}
                  className="signup "
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
          
        </div>
        
        <img className="hamburger" src={hamburger} alt="Hamburger Menu" />
      </nav>
    </>
  );
}

export default Navbar;
