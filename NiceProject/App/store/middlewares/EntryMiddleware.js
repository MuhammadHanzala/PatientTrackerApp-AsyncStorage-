
import { AsyncStorage } from 'react-native';
import { patients } from '../actions/actions';

export function createEntry(details, navigate) {
    return async dispatch => {
        await AsyncStorage.getItem('entries', (err, result) => {
            let entries = JSON.parse(result);
            if (entries === null || entries.length === 0) {
                AsyncStorage.setItem('entries', JSON.stringify([details]))
            } else {
                AsyncStorage.setItem('entries', JSON.stringify([...entries, details]))
            }
            console.log(entries, details)
            navigate('HomePage');
        })
    }
}
export function getAllEntries() {
    return async dispatch => {
        await AsyncStorage.getItem('entries', (err, result) => {
            let entries = JSON.parse(result);
            dispatch(patients(entries));
        })
    }
}


export function editEntry(newDetails, index, callback) {
    return async dispatch => {
        await AsyncStorage.getItem('entries', async (err, result) => {
            let entries = JSON.parse(result);
            entries[index] = newDetails;
            await AsyncStorage.setItem('entries', JSON.stringify(entries));
            callback();
        })
    }
}
export function deleteEntry(entryIndex, callback) {
    return async dispatch => {
        await AsyncStorage.getItem('entries', async (err, result) => {
            let entries = JSON.parse(result);
            entries.splice(entryIndex, 1);
            await AsyncStorage.setItem('entries', JSON.stringify(entries));
        })
        callback();
    }
}

