import { Card, CardBody, CardHeader } from '@nextui-org/card'
import React from 'react'

const PhysicianDetails = () => {
  return (
    <Card className='mx-5'>
        <CardHeader>Physician Details</CardHeader>
        <CardBody className='gap-5 grid grid-cols-2 mx-5'>
            <div>
                <p className='text-sm'>First Name</p>
                <p className='text-stone-500 text-sm'>Jeremy</p>
            </div>
            <div>
                <p className='text-sm'>Last Name</p>
                <p className='text-stone-500 text-sm'>Munroe</p>
            </div>
            <div>
                <p className='text-sm'>Phone Number</p>
                <p className='text-stone-500 text-sm'>0712345678</p>
            </div>
            <div>
                <p className='text-sm'>Email</p>
                <p className='text-stone-500 text-sm'>jeremymunroe0@gmail.com</p>
            </div>
        </CardBody>
    </Card>
  )
}

export default PhysicianDetails