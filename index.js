const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) 

    return payable
}

const createEmployeeRecord = (ele) => {
    return {
        firstName: ele[0],
        familyName: ele[1],
        title: ele[2],
        payPerHour: ele[3],
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