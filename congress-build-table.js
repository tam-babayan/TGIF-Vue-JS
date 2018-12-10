const instance = axios.create({
    baseURL: 'https://api.propublica.org/congress/v1/',
    timeout: 5000,
    headers: {
        'X-API-Key': 'N1JQgCXPBQCq7lYC6bTApOnHARZZ8yEKol1jfSqt'
    }
});

new Vue({
    el: '#app',
    data: {
        senators: null
    },
    mounted() {
        instance
            .get('113/senate/members.json')
            .then(response => {
                this.senators = response.data.results[0].members
            })
            .catch(error => console.log(error))
    }
});



// var app = new Vue({
//     el: '#app',
//     data: {
//         senators: {
//             first_name : "tamara",
//             middle_name: "babayan",
//             last_name: "hrayri",
//             party: "democrat",
//             state:"washington",
//             seniority:"5",
//             votes_with_party_pct: 10
//         }
//     },
//     mounted() {
//         axios
//         .get('https://api.propublica.org/congress/v1/113/senate/members.json?X-API-Key=N1JQgCXPBQCq7lYC6bTApOnHARZZ8yEKol1jfSqt')
//         .then(response => {this.senators = response.data.results})
//         .catch(error => console.log(error))
//     }

// })    










// function buildTable(data) {
//     var myTable = document.querySelector('#tbody')
//     var stateValue = document.querySelector('#stateSelect').value

//     //mapping the values checked
//     var checkboxesCheckedValue = Array.from(document.querySelectorAll('input[name=party]:checked')).map(function (input) {
//         return input.value
//     })

//     //Array witn only the members that accomplish the values inside the filter method
//     var filteredMembersArray = data.results[0].members.filter(member => {
//         var stateFilterValue = stateValue == "All" || stateValue == member.state
//         var genderFilterValue = checkboxesCheckedValue.length == 0 || checkboxesCheckedValue.includes(member.party)
//         //If both vars return true, the member is included in this array.
//         return stateFilterValue && genderFilterValue
//     })

//     myTable.innerHTML = ''
//     //For every member in the filteredMembers array. Create a row and all cells
//     filteredMembersArray.forEach(member => {
//         var newRow = document.createElement('tr')
//         var middle_name = (member.middle_name) ? member.middle_name + " " : ""
//         newRow.insertCell().innerHTML = member.first_name + " " + middle_name + member.last_name
//         newRow.insertCell().innerHTML = member.party
//         newRow.insertCell().innerHTML = member.state
//         newRow.insertCell().innerHTML = member.seniority
//         newRow.insertCell().innerHTML = member.votes_with_party_pct + "%"
//         myTable.append(newRow);
//     })
// }

// function activateEventListeners() {
//     document.getElementById('Republican').addEventListener('change', buildTable)
//     document.getElementById('Democrat').addEventListener('change', buildTable)
//     document.getElementById('Independent').addEventListener('change', buildTable)
//     document.getElementById('stateSelect').addEventListener('change', buildTable)
// }

// function render(url) {
//     fetch(url, {
//         method: "GET",
//         headers: new Headers({
//             "X-API-Key": "N1JQgCXPBQCq7lYC6bTApOnHARZZ8yEKol1jfSqt"
//         })
//     }).then(function (response) {
//         if (response.ok) {
//             return response.json();
//         }
//         throw new Error(response.statusText);
//     }).then(function (data) {
//         buildTable(data)

//     }).catch(function (error) {
//         console.log(error)
//     });
// }