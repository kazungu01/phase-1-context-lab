
/* Your Code Here */

/*
We're giving you this function. Take a look at it, you might see some usage
that's new and different. That's because we're avoiding a well-known, but
sneaky bug that we'll cover in the next few lessons!
 As a result, the lessons for this function will pass *and* it will be available
for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const createEmployeeRecord = (ele) => {
    return {
        firstName: ele[0],
        familyName: ele[1],
        title: ele[2],
        payPerHour: ele[3],
        // intializing an empty array
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (nestedArray) => {
    const arrayOfObjects = []
    for (let rec of nestedArray) {
        let newRec = createEmployeeRecord(rec)
        arrayOfObjects.push(newRec)
    }
    return arrayOfObjects
}

const createTimeInEvent = function (stamp) {
    // const [date, hour] = stamp.split(' ')
    // const splitedDate = date.split(' ')
    // const splitedHour = hour.split(' ')
    const [date, hour] = stamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return this
}

const createTimeOutEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    return this
}

const hoursWorkedOnDate = function (dateStamp) {
    // let timeInEvent = this.timeInEvents.fint()
    // timeInEvent.find(function(e) {
    //     return e.date === soughtDate
    // })
    const timeInEvent = this.timeInEvents.find((e) => {
        return e.date === dateStamp
    })
    const timeOutEvent = this.timeOutEvents.find((e) => {
        return e.date === dateStamp
    })
    const oursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100
    return oursWorked
}

const wagesEarnedOnDate = function (dateSought) {
    let payOwed = hoursWorkedOnDate.call(this, dateSought)
        * this.payPerHour
    return parseFloat(payOwed.toString())
}

const findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find((rec) => { return rec.firstName === firstName })
}

let calculatePayroll = (arr) => {
    let sum = 0;
    for (let employee of arr) {
        sum += allWagesFor.call(employee);
    }
    return sum;
}