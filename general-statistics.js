function membersCountByParty(item, party) {
    return item.members.filter(member => member.party === party).length
}

function membersAvgCountByParty(item, party) {
    var arr = item.members
        .filter(member => member.party === party)
        .map(member => member.votes_with_party_pct)
    var avg = arr.reduce((a, b) => a + b, 0) / arr.length
    return (avg.toFixed(2));
}

function getStatistics(item, percentage, type, decending) {
    var arr = getlMembersBasedOnType(item, type, percentage)
    arr.sort((lower, higher) => ((decending) ? higher.second - lower.second : lower.second - higher.second));
    var x = Math.round(arr.length * 10 / 100)
    var lastValue = arr[x - 1]

    arr = arr.filter(value => (decending) ? value.second >= lastValue.second : value.second <= lastValue.second)

    return arr
}

function getlMembersBasedOnType(item, type, percentage) {
    return item.map(member => ({
        first: member.first_name + ' ' + member.last_name,
        second: parseInt(member.missed_votes * ((type === "loyal") ? member[percentage] / 100 : 1)),
        third: member[percentage]
    }));
}

function buildCounterTable(partyName, value1, value2) {
    var myTable = document.querySelector('#tbody1')
    var newRow = document.createElement('tr')
    newRow.insertCell(0).innerHTML = partyName;
    newRow.insertCell(1).innerHTML = value1;
    newRow.insertCell(2).innerHTML = value2 + "%";
    myTable.append(newRow);
}

function buildStatisticsTable(body, item) {
    var myTable = document.querySelector(body)
    if (myTable == null) {
        return
    }
    for (var i = 0; i < item.length; i++) {
        var newRow = document.createElement('tr')
        newRow.insertCell(0).innerHTML = item[i].first;
        newRow.insertCell(1).innerHTML = item[i].second;
        newRow.insertCell(2).innerHTML = item[i].third + "%";
        myTable.append(newRow);
    }
}

function buildTables(data) {
    var statistics = {
        "Republicants": membersCountByParty(data.results[0], "R"),
        "Democrats": membersCountByParty(data.results[0], "D"),
        "Independents": membersCountByParty(data.results[0], "I"),

        "Republicants_Voted_With_Party": membersAvgCountByParty(data.results[0], "R"),
        "Democrats_Voted_With_Party": membersAvgCountByParty(data.results[0], "D"),
        "Independents_Voted_With_Party": membersAvgCountByParty(data.results[0], "I"),

        "leastEngaged": getStatistics(data.results[0].members, "missed_votes_pct", "engaged", true),
        "mostEngaged": getStatistics(data.results[0].members, "missed_votes_pct", "engaged", false),

        "leastLoyal": getStatistics(data.results[0].members, "votes_with_party_pct", "loyal", true),
        "mostLoyal": getStatistics(data.results[0].members, "votes_with_party_pct", "loyal", false),
    }


    buildCounterTable("Republicants", statistics.Republicants, statistics.Republicants_Voted_With_Party);
    buildCounterTable("Democrats", statistics.Democrats, statistics.Democrats_Voted_With_Party);
    buildCounterTable("Independents", statistics.Independents, statistics.Independents_Voted_With_Party);
    buildStatisticsTable('#tbody5', statistics.leastLoyal);
    buildStatisticsTable('#tbody4', statistics.mostLoyal);
    buildStatisticsTable('#tbody2', statistics.leastEngaged);
    buildStatisticsTable('#tbody3', statistics.mostEngaged);
}

function render(url) {
    fetch(url, {
        method: "GET",
        headers: new Headers({
            "X-API-Key": "N1JQgCXPBQCq7lYC6bTApOnHARZZ8yEKol1jfSqt"
        })
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    }).then(function (data) {
        buildTables(data)
        
    }).catch(function (error) {
        console.log(error)
    });
}