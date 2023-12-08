import React from 'react';
import pet2 from '../../../../assets/pet3.jpg'
const Inspiration = () => {
    return (
        <div className=' flex justify-center flex-col mx-auto items-center w-8/12'>
           <div className='flex  flex-col-reverse lg:flex-row items-center '>
           <div className=' p-7 '>
            <p className='text-xl '><span className='text-3xl '>Find Your Perfect Companion: Adopt, Don't Shop</span></p>
<p>Welcome to a World of Unconditional Love</p>
<p>At FourPow, we believe in the transformative power of pet adoption. Each day, countless animals are patiently waiting for their forever homes, and we invite you to be a part of their incredible journey.</p>
            </div>
            <div>
<img src={pet2} alt="" className='' />
            </div>
           </div>
<p className='text-3xl font-bold my-10'>Why Adopt?</p>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <div className='bg-pink-200 p-5 rounded-md'>
           <span className='font-bold '> Change a Life, Save a Life:</span>
<p>Every adoption is a life-changing experience. By choosing to adopt, you not only provide a loving home for a pet in need but also save them from the uncertainties of life in a shelter.</p>
            </div>
            <div className='bg-pink-200 p-5 rounded-md '>
            <span className='font-bold'>Unconditional Love:</span>
<p>There's nothing quite like the love and companionship of a pet. Adopted animals often develop an unparalleled bond with their new families, offering a level of loyalty and gratitude that goes beyond words.</p>
            </div>
            <div className=' bg-pink-200 p-5 rounded-md'>
            <span className='font-bold'>Endless Variety:</span>
<p>Whether you're looking for a playful pup, a sophisticated senior, or a charming cat, our diverse range of adoptable pets ensures that there's a perfect companion for everyone.</p>
            </div>
        </div>
        </div>
    );
};

export default Inspiration;