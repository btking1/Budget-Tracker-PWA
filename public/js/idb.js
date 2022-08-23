let db

const request = indexedDB.open('budget', 1)

request.onupgradeneeded = function (event) {
    const db = event.target.result
    db.createObjectStore('transaction', { autoIncrement: true })
}

request.onsuccess = function (event) {
    db = event.target.result

    if (navigator.onLine) {
        uploadTransaction()
    }
}

request.onerror = function (event) {
    console.log('IndexedDB Error' + event.target.errorCode)
}

function saveRecord(record) {
    const transaction = db.transaction(['transaction'], 'readwrite')

    const transactionObjectStore = transaction.objectStore('transaction')

    transactionObjectStore.add(record)
}

function uploadTransaction() {
    const transaction = db.transaction(['transaction'], 'readwrite')

    const transactionObjectStore = transaction.objectStore('transaction')

    const getAll = transactionObjectStore.getAll()

    getAll.onsuccess = function () {
        // if there was data in indexedDb's store, let's send it to the api server
        if (getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((serverResponse) => {
                    if (serverResponse.message) {
                        throw new Error(serverResponse)
                    }
                    // open one more transaction
                    const transaction = db.transaction(
                        ['transaction'],
                        'readwrite'
                    )
                    // access the new_pizza object store
                    const transactionObjectStore =
                        transaction.objectStore('transaction')
                    // clear all items in your store
                    transactionObjectStore.clear()

                    alert('All saved transactions have been submitted!')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
}

window.addEventListener('online', uploadTransaction)
