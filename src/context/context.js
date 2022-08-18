import React, { useReducer, createContext} from 'react';

import contextReducer from './contextReducer';

const initialState =JSON.parse(localStorage.getItem('transactions'))||[[{"0":"I","1":"n","2":"c","3":"o","4":"m","5":"e","type":"Income","amount":50,"category":"Business","date":"2021-03-15","id":"9bf16f82-3d50-4eba-a701-4d309c5fdb57"},{"0":"E","1":"x","2":"p","3":"e","4":"n","5":"s","6":"e","type":"Expense","amount":400,"category":"House","date":"2021-03-16","id":"bf2cee73-20cc-43c9-9a14-f093516a4d76"},{"0":"E","1":"x","2":"p","3":"e","4":"n","5":"s","6":"e","type":"Income","amount":100,"category":"Salary","date":"2021-03-16","id":"7ffb98eb-ceeb-46cb-a642-b9885312b9bf"}]]; 

export const ExpenseTrackerContext= createContext(initialState);

export const Provider= ( { children}) =>{
    const [transactions, dispatch] = useReducer(contextReducer, initialState);
    
    const deleteTransaction =(id) =>{dispatch({ type: 'DELETE_TRANSACTION', payload: id});}
    const addTransaction =( transaction) =>{ dispatch({ type: 'ADD_TRANSACTION', payload: transaction});}
    
    const balance= transactions.reduce((acc, currVal) => currVal.type ==='Expense'? acc- currVal.amount : acc+currVal.amount,0);

    return (
        <ExpenseTrackerContext.Provider value={{ 
            deleteTransaction,
            addTransaction,
            transactions,
            balance
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    );
}