"use client"
import CardSkeleton from '@/app/components/CardSkeleton';
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import React from 'react'

import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const Page = ({params}) => {
    const { data, isLoading } = useSWR(
        `/api/classifications/${params?.slug}`,
        fetcher,
        {
          keepPreviousData: true,
        }
      );
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
  return (
    <Card className='mx-5'>
        <CardHeader className='font-bold'>Classification Details</CardHeader>
        <hr className='my-3 mx-2'/>
        <CardBody className='gap-5'>
            {isLoading? <CardSkeleton/> : 
            <>
            <div className='grid grid-cols-2 mx-5 gap-2'>

            <div>
                <p className='text-sm capitalize'>Eye Side</p>
                <p className='text-stone-500 text-sm'>{data?.eyeSide}</p>
            </div>
            <div>
                <p className='text-sm capitalize'>Severity</p>
                <p className='text-stone-500 text-sm'>{data?.severity}</p>
            </div>
            <div>
                <p className='text-sm capitalize'>Description</p>
                <p className='text-stone-500 text-sm'>{data?.description}</p>
            </div>
            {/* <div>
                <p className='text-sm'>Email</p>
                <p className='text-stone-500 text-sm'>{data?.email}</p>
            </div> */}
            
            </div>
            <div className='flex justify-end items-center gap-3 mb-5'>
            <div>
                <p className='text-stone-500 text-xs'>Physician: {data?.physician?.firstName+" "+data?.physician?.lastName}</p>
                <span className='text-stone-500 text-xs'>
            {new Date(data?.updatedAt)?.toLocaleString("en-us", options)}</span>

            </div>
            </div>
            </>
            }
        </CardBody>
    </Card>
  )
}

export default Page