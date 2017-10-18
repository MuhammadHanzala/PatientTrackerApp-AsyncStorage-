export default function (state = {patients: null}, action){
    switch(action.type){
        case 'AllPatients':
            return { patients: action.data }
        default:
         return state; 
    }
}