"use client";

import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { SunIcon, MoonIcon, DesktopIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'

function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    return (
        <Tabs defaultValue={theme}>
            <TabsList className="border">
                <TabsTrigger value="light" onClick={() => { setTheme("light") }}>
                    <SunIcon className="h-[1.2rem] w-[1.2rem]" />
                </TabsTrigger>
                <TabsTrigger value="dark" onClick={() => { setTheme("dark") }}>
                    <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 dark:rotate-0" />
                </TabsTrigger>
                <TabsTrigger value="system" onClick={() => { setTheme("system") }}>
                    <DesktopIcon className="h-[1.2rem] w-[1.2rem]" />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default ThemeSwitcher