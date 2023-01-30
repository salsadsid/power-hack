import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';
import BillModal from './BillModal';
import BillRow from './BillRow';
import DeleteBillModal from './DeleteBillModal';
import UpdateBillModal from './UpdateBillModal';

const Bill = () => {
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [updateBill,setUpdateBill]=useState(null)
    const [deleteBill,setDeleteBill]=useState(null)
    const { data, isLoading, refetch } = useQuery(['bills',page], () => fetch(`https://power-hack-server-abjy.onrender.com/api/billing-list?page=${page}&size=10`).then(res => res.json())
    )
    useEffect(() => {
          fetch('https://power-hack-server-abjy.onrender.com/api/billing-list')
              .then(res => res.json())
              .then(data => {
                console.log(data)
                  const count = data?.data?.length;
                  const pages = Math.ceil(count / 10);
                  setPageCount(pages);
              })
      }, [])
      console.log(pageCount)
  if(isLoading){
    return <Loading></Loading>
  }
  console.log(data)
  const{data:bills}=data
    return (
        <div> 
           <div className='flex justify-between'>
            <div>
            <input type="text" placeholder="Type here" className="input input-bordered input-xs w-full max-w-xs" />
            </div>
           <div>
           <label htmlFor="billing-modal" className="btn">Add New Bill</label>
            <BillModal></BillModal>
           </div>
           </div>
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
              setDeleteBill={setDeleteBill}
              setUpdateBill={setUpdateBill}
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
        <div className='flex justify-center my-5'>
                    {
                        [...Array(pageCount)?.keys()]?.map(number => <button className={page === number ? 'selected btn' : 'btn'} onClick={() => setPage(number)}>{number + 1}</button>)
                    }
                </div>
      </div>
      {deleteBill && <DeleteBillModal
                deleteBill={deleteBill}
                refetch={refetch}
                setDeleteBill={setDeleteBill}
            ></DeleteBillModal>}
      {updateBill && <UpdateBillModal
                updateBill={updateBill}
                refetch={refetch}
                setUpdateBill={setUpdateBill}
            ></UpdateBillModal>}
      </div>
    );
};

export default Bill;