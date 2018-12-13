new Vue({
    el: '#app',
    data: {
        members: [],
    },
    mounted() {
        let uri = this.$el.dataset.uri
        axios
            .create({
                baseURL: 'https://api.propublica.org/congress/v1/',
                headers: {
                    'X-API-Key': 'N1JQgCXPBQCq7lYC6bTApOnHARZZ8yEKol1jfSqt'
                }
            })
            .get(uri)
            .then(response => {
                this.members = response.data.results[0].members
            })
            .catch(error => console.log(error))
    },
    computed: {
        senateAtGlance() {
            return [{
                "party": "Republican",
                "count": this.membersCountByParty('R'),
                "average_voted_with_party": this.membersAvgCountByParty('R') + "%"
            }, {
                "party": "Democrat",
                "count": this.membersCountByParty('D'),
                "average_voted_with_party": this.membersAvgCountByParty('D') + "%"
            }, {
                "party": "Independent",
                "count": this.membersCountByParty('I'),
                "average_voted_with_party": this.membersAvgCountByParty('I') + "%"
            }];
        },
        leastEngaged() {
            return this.getStatistics("missed_votes_pct", "engaged", true)
        },
        mostEngaged() {
            return this.getStatistics("missed_votes_pct", "engaged", false)
        },
        leastLoyal() {
            return this.getStatistics("votes_with_party_pct", "loyal", true)
        },
        mostLoyal() {
            return this.getStatistics("votes_with_party_pct", "loyal", false)
        }
    },
    methods: {
        membersCountByParty: function (party) {
            return this.members.filter(member => member.party === party).length
        },
        membersAvgCountByParty: function (party) {
            let arr = this.members
                .filter(member => member.party === party)
                .map(member => member.votes_with_party_pct)
            let avg = arr.reduce((a, b) => a + b, 0) / arr.length
            return (avg.toFixed(2));
        },
        getMembersBasedOnType: function (type, percentage) {
            return this.members.map(member => ({
                first: member.first_name + ' ' + member.last_name,
                second: parseInt(member.missed_votes * ((type === "loyal") ? member[percentage] / 100 : 1)),
                third: member[percentage] + "%",
                url: member.url
            }));
        },
        getStatistics: function (percentage, type, decending) {
            let arr = this.getMembersBasedOnType(type, percentage)
            arr.sort((lower, higher) => ((decending) ? higher.second - lower.second : lower.second - higher.second));
            let lastValue = arr[Math.round(arr.length * 10 / 100) - 1]
            arr = arr.filter(value => (decending) ? value.second >= lastValue.second : value.second <= lastValue.second)
            return arr
        }
    }
});