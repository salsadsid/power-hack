import React from 'react';

const handleBill=(event)=>{
    event.preventDefault();
        const bill = {
            fullName:event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            paidAmount:event.target.payable.value
        }
        console.log(bill)
        fetch('http://localhost:5000/api/add-billing', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bill)
        })
            .then(res => res.json())
            .then(data =>console.log(data))
}

const BillModal = () => {
    return (
        <div>
           <div>
            <input type="checkbox" id="billing-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="billing-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg text-secondary">Add Bill</h3>
                    <form onSubmit={handleBill} className='grid grid-cols-1 gap-3 justify-items-center mt-2'>
                        
    
                        <input type="text" name="name" placeholder='Full Name'  className="input input-bordered w-full max-w-xs" />
                        <input type="email" name="email" placeholder='Email' className="input input-bordered w-full max-w-xs" />
                        <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
                        <input type="text" name="payable" placeholder="Payable Amount" className="input input-bordered w-full max-w-xs" />
                        <input type="submit" value="Submit" className="btn btn-secondary w-full max-w-xs" />
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default BillModal;