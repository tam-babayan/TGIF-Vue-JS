(function manin() {
    render('https://api.propublica.org/congress/v1/113/house/members.json')
    buildTable(data)
    activateEventListeners()
})()