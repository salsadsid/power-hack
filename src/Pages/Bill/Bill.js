import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';
import BillModal from './BillModal';
import BillRow from './BillRow';

const Bill = () => {
    const { data, isLoading, refetch } = useQuery('bills', () => fetch(`http://localhost:5000/api/billing-list`).then(res => res.json())
    )
  if(isLoading){
    return <Loading></Loading>
  }
    const{data:bills}=data
    return (
        <div> 
            <label htmlFor="billing-modal" className="btn">open modal</label>
            <BillModal></BillModal>
        <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              
              <th>Billing ID</th> 
              <th>Full Name</th> 
              <th>Email</th> 
              <th>Phone</th> 
              <th>Paid Amount</th> 
              <th>Action</th>
            </tr>
          </thead> 
          <tbody>
            {
              bills?.map((bill,index)=><BillRow
              key={bill._id}
              bill={bill}
              index={index}
              refetch={refetch}
              ></BillRow>)
            }
    
          </tbody> 
          <tfoot>
            <tr>
              
       
              <th>Billing ID</th> 
              <th>Full Name</th> 
              <th>Email</th> 
              <th>Phone</th> 
              <th>Paid Amount</th> 
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
        <div className="btn-group mx-auto">
  <button className="btn">1</button>
  <button className="btn btn-active">2</button>
  <button className="btn">3</button>
  <button className="btn">4</button>
</div>
      </div>
      </div>
    );
};

export default Bill;