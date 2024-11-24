// src/frontend/routes.js

// Import the components
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import IssuerDashboard from './pages/IssuerDashboard';
import Holders from './pages/Holders';
import Verify from './pages/Verify';
import IssueManual from './pages/IssueManual';
import BulkIssue from './pages/BulkIssue';

const routes = [
  { path: '/', component: Login }, 
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard },
  { path: '/issuer-dashboard', component: IssuerDashboard },
  { path: '/holders', component: Holders },
  { path: '/verify', component: Verify },
  { path: '/issue-manual', component: IssueManual },
  { path: '/bulk-issue', component: BulkIssue },
];

export default routes;
