const mysql = require('mysql2')

const conn = mysql.createConnection({
    host: 'academic-mysql.cc.gatech.edu',
    user: 'cs4400_Group_86',
    password: 'mRNogirU',
    database: 'cs4400_Group_86'
});


var stationManagementData = function(callback) {
    var sql = "SELECT Name, StopID, EnterFare, ClosedStatus FROM Station";
    conn.query(sql, function(err, result, fields) {
        if (err) throw err;
        callback(result);
    });
};

var stationData = function(id, callback) {
    var sql = "SELECT * FROM Station WHERE StopID= ?";
    conn.query(sql, [id], function(err, result, fields) {
        if (err) throw err;
        callback(result[0]);
    });
};

var busData = function(id, callback) {
    var sql = "SELECT * FROM BusStationIntersection WHERE StopID=?";
    conn.query(sql, [id], function(err, result, fields) {
        if (err) throw err;
        callback(result[0]);
    });
};

var createStation = function(stopId, name, fare, closed, train, callback) {
    var sql = "INSERT INTO Station(StopID, Name, EnterFare, ClosedStatus, IsTrain) VALUES (?, ?, ?, ?, ?)";
    conn.query(sql, [stopId, name, fare, closed, train], function(err, result, fields) {
        if (err) {
            console.log('query ran with error'); 
            callback(err.sqlMessage);
        } else {
            console.log('query run successfully'); 
            callback('');
        }
    });
};

var writeBusEntry = function(stopId, intersection) {
    var sql = "INSERT INTO BusStationIntersection(StopID, Intersection) VALUES (?, ?);";
    var arr = [stopId, null]
    if (intersection)
        arr = [stopId, intersection]
    conn.query(sql, arr, function(err, result, fields) {
        if (err) throw err;
    });
};

var updateOpen = function(id, closedStatus) {
    var str = closedStatus ? "1" : "0";
    var sql = "UPDATE Station SET ClosedStatus= ? WHERE StopID=?";
    conn.query(sql, [str, id], function(err, result, fields) {
        if (err) throw err;
    });
};

var updateFare = function(id, fare) {
    var sql = "UPDATE Station SET EnterFare= ? WHERE StopID= ?";
    conn.query(sql, [fare, id], function(err, result, fields) {
        if (err) throw err;
    });
};

var suspendedCardsData = function(callback) {
    var sql = "SELECT * FROM Breezecard NATURAL JOIN Conflict";
    conn.query(sql, function(err, result, fields) {
        //console.log(sql);
        if (err) throw err;
        callback(result);
    });
};

var updateOwner = function(Username, BreezeCardNum, callback) {
    var sql = "UPDATE Breezecard SET BelongsTo= ? WHERE BreezecardNum=?";
    conn.query(sql, [Username, BreezeCardNum], function(err, result, fields) {
        if (err) throw err;
    });
    sql = "DELETE FROM Conflict WHERE Username = ?";
    conn.query(sql, [Username], function(err, result, fields) {
        if (err) throw err;
        callback(result[0]);
    });
};

var loginCheck = function(Username, Password, callback) {
    //Check if User and Pass match in database
    var sql = "SELECT COUNT(*) as count FROM User as a WHERE a.Username = ? AND a.Password = ?;"
    conn.query(sql, [Username, Password], function(err, result, fields) {
        if (err) throw err;
        callback(result[0]);
    });

    //Check if User is an admin
    sql = "SELECT COUNT(*) as count2 FROM User as a WHERE a.Username = ? AND a.IsAdmin = ?";
    conn.query(sql, [Username, 1], function(err, result, fields) {
        if (err) throw err;
        callback(result[0]);
    });
}

var registerUser = function(Username, Password, callback) {
    var sql = "INSERT INTO User(Username, Password, IsAdmin) VALUES (?, ?, ?);";
    conn.query(sql, [Username, Password, 0], function(err, result, fields) {
        if (err) throw err;
        callback(result[0]);
    });
}

var registerPassenger = function(Username, Email, callback) {
    var sql = "INSERT INTO Passenger(Username, Email) VALUES (?, ?);";
    conn.query(sql, [Username, Email], function(err, result, fields) {
        if (err) throw err;
        callback(result[0]);
    });
}

var registerBreezecard = function(BreezecardNum, Username, callback) {
    var sql = "INSERT INTO Breezecard(BreezecardNum, Value, BelongsTo) VALUES (?, ?, ?);";
    conn.query(sql, [BreezecardNum, 0.00, Username], function(err, result, fields) {
        if (err) throw err;
        callback(result[0]);
    });
}

var checkBreezecard = function(BreezecardNum, callback) {
    var sql = "SELECT COUNT(*) as count FROM Breezecard as b WHERE b.BreezecardNum = ?";
    conn.query(sql, [BreezecardNum], function(err, result, fields) {
        if (err) throw err;
        callback(result);
    });
}

var createConflict = function(Username,BreezecardNum, callback) {
    var sql = "INSERT INTO Conflict(Username, BreezecardNum) VALUES (?, ?);";
    conn.query(sql, [Username, BreezecardNum], function(err, result, fields) {
        if (err) throw err;
        callback(result);
    });
}

var test = function() { console.log('test successful'); };

module.exports.test = test;
module.exports.stationManagementData = stationManagementData;
module.exports.createStation = createStation;
module.exports.writeBusEntry = writeBusEntry;
module.exports.stationData = stationData;
module.exports.busData = busData;
module.exports.updateOpen = updateOpen;
module.exports.updateFare = updateFare;
module.exports.suspendedCardsData = suspendedCardsData;
module.exports.updateOwner = updateOwner;
module.exports.registerUser = registerUser;
module.exports.registerPassenger = registerPassenger;
module.exports.registerBreezecard = registerBreezecard;
module.exports.checkBreezecard = checkBreezecard;
module.exports.createConflict = createConflict;
module.exports.loginCheck = loginCheck;