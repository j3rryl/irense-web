"use client"
import CardSkeleton from '@/app/components/CardSkeleton';
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Avatar } from '@nextui-org/avatar';
import React from 'react'

import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const PatientDetails = ({patient}) => {
    const { data, isLoading } = useSWR(
        `/api/patients/${patient}`,
        fetcher,
        {
          keepPreviousData: true,
        }
      );
  return (
    <Card className='mx-5'>
        <CardHeader className='font-bold'>Patient Details</CardHeader>
        <hr className='my-3 mx-2'/>
        <CardBody className='mx-5'>
            {isLoading? <CardSkeleton/> :<>
            <div className='flex justify-center items-center mb-5'>
            <Avatar isBordered color="primary" src={data?.image} size='lg' radius='lg'/>
            </div>
            <div className='gap-5 grid grid-cols-2 '>

            
            <div>
                <p className='text-sm'>First Name</p>
                <p className='text-stone-500 text-sm'>{data?.firstName}</p>
            </div>
            <div>
                <p className='text-sm'>Last Name</p>
                <p className='text-stone-500 text-sm'>{data?.lastName}</p>
            </div>
            <div>
                <p className='text-sm'>Phone Number</p>
                <p className='text-stone-500 text-sm'>{data?.phone}</p>
            </div>
            <div>
                <p className='text-sm'>Email</p>
                <p className='text-stone-500 text-sm'>{data?.email}</p>
            </div>
            </div>
            </>}
        </CardBody>
    </Card>
  )
}

export default PatientDetails