import { BrowserRouter as Router, Routes, Route } from "react-router";
import WalletSetup from "./component/WalletSetup.jsx";
import SecretRecoveryPhrase from "./component/SecretRecoveryPhrase.jsx";
import PasswordSetup from "./component/PasswordSetup.jsx";
import VerifyRecoveryPhrase from "./component/VerifyRecoveryPhrase.jsx";
import Import from './component/import.jsx';
import KeyGenerator from "./component/KeyGenerator.jsx";
import VerifyRecoveryPhrase2 from "./component/VerifyRecoveryPhrase2.jsx";
import WalletDashboard from "./component/WalletDashboard.jsx";
import SendEthereum from "./component/SendEth.jsx";
import SendSolana from "./component/SendSol.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WalletSetup />} />
        <Route path="/login" element={<PasswordSetup />} />
        <Route path="/import" element={<Import />} />
        <Route path="/generatepublickey" element={<KeyGenerator />} />
        <Route path="/secretRecoveryPhrase" element={<SecretRecoveryPhrase />} />
        <Route path="/verify-recovery" element={<VerifyRecoveryPhrase />} />
        <Route path="/verify-recovery-main" element={<VerifyRecoveryPhrase2 />} />
        <Route path="/walletdashboard" element={<WalletDashboard />} />
        <Route path="/send-ethereum" element={<SendEthereum />} />
        <Route path="/send-solana" element={<SendSolana />} />
      </Routes>
    </Router>
  );
}

export default App;