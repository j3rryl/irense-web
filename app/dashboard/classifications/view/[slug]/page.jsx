"use client"
import CardSkeleton from '@/app/components/CardSkeleton';
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Image } from '@nextui-org/image';
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
      console.log(data);
  return (
    <Card className='mx-5'>
        <CardHeader className='font-bold'>Classification Details</CardHeader>
        <hr className='my-3 mx-2'/>
        <CardBody className=''>
            {isLoading? <CardSkeleton/> : 
            <>
            
            <div className='grid grid-cols-2 gap-2 mb-5'>
            <div>
                <p className='text-sm capitalize'>Eye Side</p>
                <p className='text-stone-500 text-sm capitalize'>{data?.eyeSide}</p>
            </div>
            <div>
                <p className='text-sm capitalize'>Severity</p>
                <p className='text-stone-500 text-sm capitalize'>{data?.severity}</p>
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
            <div className='flex justify-center items-center !overflow-hidden mb-5 w-5/6'>
                <Image
                    isBlurred
                    // width={240}
                    // width={250}
                    src={data?.image?.imagePath}
                    alt="NextUI Album Cover"
                    classNames="m-5"
                    />
            </div>
            <div className='flex justify-end items-center mb-5'>
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