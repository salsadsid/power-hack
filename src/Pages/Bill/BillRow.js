import React from 'react';

const BillRow = ({bill,refetch,index}) => {
    const{fullName,email,phone,paidAmount,_id}=bill
    return (
        <tr>
              <th>{_id}</th> 
              <td>{fullName}</td> 
              <td>{email}</td> 
              <td>{phone}</td> 
              <td>{paidAmount}</td> 
              <td>12/5/2020</td> 
            </tr>
    );
};

export default BillRow;