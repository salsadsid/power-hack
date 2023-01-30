import React from 'react';

const BillRow = ({bill,refetch,index,setDeleteBill,setUpdateBill}) => {
    const{fullName,email,phone,paidAmount,_id}=bill
    return (
        <tr>
              <th>{_id}</th> 
              <td>{fullName}</td> 
              <td>{email}</td> 
              <td>{phone}</td> 
              <td>{paidAmount}</td> 
              <td><label onClick={() => setDeleteBill(bill)} htmlFor="delete-bill-modal" className="btn modal-button btn-xs btn-error">DELETE</label></td> 
              <td><label onClick={() => setUpdateBill(bill)} htmlFor="billing-modal" className="btn modal-button btn-xs btn-error">Update</label></td> 
            </tr>
    );
};

export default BillRow;