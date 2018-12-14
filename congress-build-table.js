new Vue({
    el: '#app',
    data: {
        members: [],
        checked: [],
        select: "All"
    },
    mounted() {
        const uri = this.$el.dataset.uri
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
        filteredSenators() {
            return this.members.filter(member => {
                const party = this.checked.length == 0 || this.checked.includes(member.party)
                const state = this.select == "All" || this.select == member.state
                return party && state
            })
        },
        statesList() {
            return this.members.filter(item => item.state)
        }
    },
});