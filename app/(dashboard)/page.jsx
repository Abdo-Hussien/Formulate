"use client";

//React
import { useUser } from "@clerk/nextjs"
import React, { Suspense, useEffect, useState } from 'react'
import { LuView } from "react-icons/lu"
import { FaWpforms } from "react-icons/fa"
import { HiCursorClick } from "react-icons/hi"
import { TbArrowBounce } from "react-icons/tb"


//Custom
import { getFormStats } from '@/actions/form'

//Clerk
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import CreateFormBtn from "@/components/CreateFormBtn";


export default function Home() {
    return (
        <div className="p-4">
            <Suspense fallback={<StatsCards loading={true} />}>
                <CardStatsWrapper />
            </Suspense>
            <h2 className="col-span-2 my-4 py-4 font-bold text-2xl border-y">Your Forms</h2>
            <CreateFormBtn />
        </div>

    )
}
async function CardStatsWrapper() {
    const { user } = useUser();
    const [stats, setStats] = useState({});

    useEffect(() => {
        async function fetchStats() {
            if (user) {
                console.log(user)
                const stats = await getFormStats(user.id);
                setStats(stats);
            }
        }

        fetchStats();
    }, [user]);

    return <StatsCards loading={false} data={stats} />;
};

const StatsCards = (props) => {
    const { data, loading } = props
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
                title="Total Visits"
                icon={<LuView className="text-blue-600" />}
                helperText="All time form visits"
                value={data?.visits || 0}
                loading={loading}
                className="shadow-md shadow-blue-600"
            />
            <StatsCard
                title="Total Submissions"
                icon={<FaWpforms className="text-yellow-600" />}
                helperText="All time form submissions"
                value={data?.submissions || 0}
                loading={loading}
                className="shadow-md shadow-yellow-600"
            />
            <StatsCard
                title="Submission Rate"
                icon={<HiCursorClick className="text-green-600" />}
                helperText="All time form rate"
                value={(data?.submissionRate || 0) + "%"}
                loading={loading}
                className="shadow-md shadow-green-600"
            />
            <StatsCard
                title="Bounce Rate"
                icon={<TbArrowBounce className="text-red-600" />}
                helperText="All time form bounce rate"
                value={(data?.bounceRate || 0) + "%"}
                loading={loading}
                className="shadow-md shadow-red-600"
            />
        </div>
    )
}

const StatsCard = ({ title, value, icon = <LuView className="text-blue-400" />, helperText, loading, className }) => {
    return (
        <Card className="">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle >{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {!loading && value}
                    {loading && <Skeleton><span className="opacity-0">0</span></Skeleton>}
                </div>
                <p className="pt-1 text-muted-foreground">{helperText}</p>
            </CardContent>
        </Card>
    )
}