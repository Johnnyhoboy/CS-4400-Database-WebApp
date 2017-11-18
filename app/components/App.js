import ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import "react-table/react-table.css";

//
// The following variables define the entire screen components
// Any subcomponents meant to be reused should be defined at the specified section below
//

var LogIn = React.createClass({
    render : function() { return (
    	<div class="LogIn">
	    	<p>Log In</p>
	    	<button onClick={this.nRegistration}>Go To Registration</button>
	    	<button onClick={this.nPassengerFunctionality}>Go To Passenger Functionality</button>
	    	<button onClick={this.nAdminFunctionality}>Go To Admin Functionality</button>
    	</div>
    	); 
	},
    nRegistration : function() { showRegistration(); },
    nPassengerFunctionality : function() { showPassengerFunctionality(); },
    nAdminFunctionality : function() { showAdminFunctionality(); }
});

var Registration = React.createClass({
    render : function() { return (
    	<div class="Registration">
	    	<p>Registration</p>
	    	<button onClick={this.nLogin}>Back</button>
    	</div>
    	); 
	},
	nLogin : function() { showLogIn(); }
});

var PassengerFunctionality = React.createClass({
    render : function() { return (
    	<div class="PassengerFunctionality">
	    	<p>Passenger Functionality</p>
	    	<button onClick={this.nTripHistory}>Go To Trip History</button>
	    	<button onClick={this.nManageCards}>Go To Manage Cards</button>
	    	<button onClick={this.nLogin}>Back</button>
    	</div>
    	); 
	},
	nTripHistory : function() { showTripHistory(); },
	nManageCards : function() { showManageCards(); },
	nLogin : function() { showLogIn(); }
});

var ManageCards = React.createClass({
    render : function() { return (
    	<div class="ManageCards">
	    	<p>Manage Cards</p>
	    	<button onClick={this.nPassengerFunctionality}>Back</button>
    	</div>
    	); 
	},
	nPassengerFunctionality : function() { showPassengerFunctionality(); }
});

var TripHistory = React.createClass({
    render : function() { return (
    	<div class="TripHistory">
	    	<p>Trip History</p>
	    	<button onClick={this.nPassengerFunctionality}>Back</button>
    	</div>
    	); 
	},
	nPassengerFunctionality : function() { showPassengerFunctionality(); }
});

var AdminFunctionality = React.createClass({
    render : function() { return (
    	<div class="AdminFunctionality">
	    	<p>Admin Functionality</p>
	    	<button onClick={this.nBreezecardManagement}>Go To Breezecard Management</button>
	    	<button onClick={this.nStationManagement}>Go To Station Management</button>
	    	<button onClick={this.nPassengerFlowReport}>Go To PassengerFlowReport</button>
	    	<button onClick={this.nSuspendedCards}>Go To Suspended Cards</button>
	    	<button onClick={this.nLogin}>Back</button>
    	</div>
    	);
	},
	nBreezecardManagement : function() { showBreezecardManagement(); },
	nStationManagement : function() { showStationManagement(); },
	nPassengerFlowReport : function() { showPassengerFlowReport(); },
	nSuspendedCards : function() { showSuspendedCards(); },
	nLogin : function() { showLogIn(); }
});

var BreezecardManagement = React.createClass({
    render : function() { return (
    	<div class="BreezecardManagement">
	    	<p>Breezecard Management</p>
	    	<button onClick={this.nAdminFunctionality}>Back</button>
    	</div>
    	); 
	},
	nAdminFunctionality : function() { showAdminFunctionality(); }
});

var SuspendedCards = React.createClass({
    render : function() { return (
    	<div class="SuspendedCards">
	    	<p>Suspended Cards</p>
	    	<button onClick={this.nAdminFunctionality}>Back</button>
    	</div>
    	); 
	},
	nAdminFunctionality : function() { showAdminFunctionality(); }
});

var PassengerFlowReport = React.createClass({
    render : function() { return (
    	<div class="PassengerFlowReport">
	    	<p>Passenger Flow Report</p>
	    	<button onClick={this.nAdminFunctionality}>Back</button>
    	</div>
    	); 
	},
	nAdminFunctionality : function() { showAdminFunctionality(); }
});

var StationManagement = React.createClass({
	getInitialState : function() {
		var oColumns = [
			{ Header: 'Station Name', accessor: 'name' },
			{ Header: 'Stop ID', accessor: 'id' },
			{ Header: 'Fare', accessor: 'fare' },
			{ Header: 'Status', accessor: 'status'}
		];
		var oData = [
			{ name: 'Sam AA', id: '1', fare: '123', status: 'open' }, 
			{ name: 'Ryan AB', id: '2', fare: '10', status: 'closed' }
		];
		return { columns: oColumns, data: oData };
	},
  	render : function() { 
  		return (
	    	<div class="StationManagement">
		    	<h1>Station Listing</h1>
		    	<ReactTable
				    data={this.state.data}
				    columns={this.state.columns}
				    defaultPageSize={10}
				  />	
		    	<button onClick={this.nViewStation}>View Station</button>
		    	<button onClick={this.nCreateStation}>Create Station</button>
		    	<br />
		    	<button onClick={this.nAdminFunctionality}>Back To Admin Functionality</button>
	    	</div>
    	); 
	},
	nViewStation : function() { showViewStation(); },
	nCreateStation : function() { showCreateStation(); },
	nAdminFunctionality : function() { showAdminFunctionality(); }
});

var ViewStation = React.createClass({
    render : function() { return (
    	<div class="ViewStation">
	    	<p>View Station</p>
	    	<button onClick={this.nStationManagement}>Back</button>
    	</div>
    	); 
	},
	nStationManagement : function() { showStationManagement(); }
});

var CreateStation = React.createClass({
	render : function() { return (
    	<div class="CreateStation">
	    	<p>Create Station</p>
	    	<button onClick={this.nStationManagement}>Back</button>
    	</div>
    	); 
	},
	nStationManagement : function() { showStationManagement(); }
});

//
// Any components meant to be reused among the screens should be defined below
//



//
// Rendering functions for each screen called in onclicks
//

function showLogIn() {
	ReactDOM.render(<LogIn />, document.getElementById('root'));
}

function showRegistration() {
	ReactDOM.render(<Registration />, document.getElementById('root'));
}

function showPassengerFunctionality() {
	ReactDOM.render(<PassengerFunctionality />, document.getElementById('root'));
}

function showManageCards() {
	ReactDOM.render(<ManageCards />, document.getElementById('root'));
}

function showTripHistory() {
	ReactDOM.render(<TripHistory />, document.getElementById('root'));
}

function showViewStation() {
	ReactDOM.render(<ViewStation />, document.getElementById('root'));
}

function showCreateStation() {
	ReactDOM.render(<CreateStation />, document.getElementById('root'));
}

function showAdminFunctionality() {
	ReactDOM.render(<AdminFunctionality />, document.getElementById('root'));
}

function showPassengerFlowReport() {
	ReactDOM.render(<PassengerFlowReport />, document.getElementById('root'));
}

function showSuspendedCards() {
	ReactDOM.render(<SuspendedCards />, document.getElementById('root'));
}

function showBreezecardManagement() {
	ReactDOM.render(<BreezecardManagement />, document.getElementById('root'));
}

function showStationManagement() {
	ReactDOM.render(<StationManagement />, document.getElementById('root'));
}

showLogIn();