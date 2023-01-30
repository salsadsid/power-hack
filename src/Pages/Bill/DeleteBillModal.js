import React from 'react';

const DeleteBillModal = ({ deleteBill, setDeleteBill, refetch }) => {
    const { fullName, email, _id } = deleteBill
    console.log(_id);
    const handleDelete = () => {
        fetch(`https://power-hack-server-abjy.onrender.com/api/delete-billing/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount) {
                    setDeleteBill(null)
                    refetch()
                }
            })
    }
    return (
        <div>

            <input type="checkbox" id="delete-bill-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{deleteBill.fullName}</h3>
                    <p className="py-4">Are You Sure?</p>
                    <div className="modal-action">
                        <button onClick={() => handleDelete(email)} className='btn btn-xs bg-red-500'>REMOVE</button>
                        <label htmlFor="delete-order-modal" className="btn btn-xs">cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DeleteBillModal;